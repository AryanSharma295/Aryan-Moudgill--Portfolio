import { mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_DIR = path.join(PUBLIC_DIR, 'optimized');

const VIDEO_EXTS = new Set(['.mp4', '.mov', '.m4v']);

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit' });
    p.on('error', reject);
    p.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}

function listTopLevelVideos() {
  const only = process.env.MEDIA_ONLY?.trim();
  const files = readdirSync(PUBLIC_DIR)
    .filter((name) => VIDEO_EXTS.has(path.extname(name).toLowerCase()))
    .map((name) => path.join(PUBLIC_DIR, name));

  if (!only) return files;

  const wanted = new Set(
    only
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((n) => (n.toLowerCase().endsWith('.mp4') ? n : `${n}.mp4`))
  );

  return files.filter((p) => wanted.has(path.basename(p).toLowerCase()));
}

function outNames(inFile) {
  const base = path.basename(inFile, path.extname(inFile));
  return {
    webm: path.join(OUT_DIR, `${base}.webm`),
    mp4: path.join(OUT_DIR, `${base}.mp4`),
    poster: path.join(OUT_DIR, `${base}.jpg`),
  };
}

function fileSizeMB(p) {
  return (statSync(p).size / (1024 * 1024)).toFixed(2);
}

function shouldSkipBecauseCorrupt(outFile) {
  if (!existsSync(outFile)) return false;
  // If a previous run got killed mid-encode, we might have a tiny broken file.
  // Re-encode in that case.
  return statSync(outFile).size < 1024 * 1024;
}

async function main() {
  if (!ffmpegPath) {
    throw new Error('ffmpeg-static did not provide a binary for this platform.');
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const inputs = listTopLevelVideos();
  if (inputs.length === 0) {
    console.log('No videos found in public/. Nothing to do.');
    return;
  }

  console.log(`Found ${inputs.length} video(s) in public/:`);
  for (const f of inputs) console.log(`- ${path.basename(f)} (${fileSizeMB(f)} MB)`);

  for (const inFile of inputs) {
    const { webm, mp4, poster } = outNames(inFile);

    // Poster (frame at 0s)
    if (!existsSync(poster)) {
      await run(ffmpegPath, [
        '-y',
        '-ss',
        '0',
        '-i',
        inFile,
        '-frames:v',
        '1',
        '-update',
        '1',
        '-q:v',
        '2',
        poster,
      ]);
    }

    // MP4 (H.264) – high quality, faststart, no audio (these are background videos)
    if (!existsSync(mp4) || shouldSkipBecauseCorrupt(mp4)) {
      await run(ffmpegPath, [
        '-y',
        '-i',
        inFile,
        '-an',
        '-c:v',
        'libx264',
        '-preset',
        'slow',
        '-crf',
        '18',
        '-bf',
        '0',
        '-avoid_negative_ts',
        'make_zero',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        mp4,
      ]);
    }

    // WebM (VP9) – high quality, no target bitrate (CRF mode)
    if (!existsSync(webm) || shouldSkipBecauseCorrupt(webm)) {
      await run(ffmpegPath, [
        '-y',
        '-i',
        inFile,
        '-an',
        '-c:v',
        'libvpx-vp9',
        '-b:v',
        '0',
        '-crf',
        '30',
        '-deadline',
        'good',
        '-cpu-used',
        '2',
        '-row-mt',
        '1',
        '-avoid_negative_ts',
        'make_zero',
        '-pix_fmt',
        'yuv420p',
        webm,
      ]);
    }

    console.log(`\nOptimized ${path.basename(inFile)} →`);
    console.log(`- ${path.relative(PUBLIC_DIR, mp4)} (${fileSizeMB(mp4)} MB)`);
    console.log(`- ${path.relative(PUBLIC_DIR, webm)} (${fileSizeMB(webm)} MB)`);
    console.log(`- ${path.relative(PUBLIC_DIR, poster)} (${fileSizeMB(poster)} MB)`);
  }

  console.log('\nDone. Next: update code to use /optimized/* assets.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

