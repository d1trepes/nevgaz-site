// Размытое превью картинки (16px, ~200 байт) — фон <img>, пока грузится сам файл.
// Вместо пустого поля сразу видно «мягкое» фото, потом проявляется чёткое.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import type { ImageMetadata } from 'astro';

const root = path.resolve(process.cwd(), 'src/assets');
const byStem = new Map<string, string[]>();
const walk = (dir: string) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp|avif)$/i.test(e.name)) {
      const stem = e.name.split('.')[0];
      byStem.set(stem, [...(byStem.get(stem) ?? []), p]);
    }
  }
};
if (fs.existsSync(root)) walk(root);

const cache = new Map<string, string | null>();
export async function lqip(meta: ImageMetadata): Promise<string | null> {
  const stem = path.basename(String(meta?.src ?? '').split('?')[0]).split('.')[0];
  if (cache.has(stem)) return cache.get(stem)!;
  const files = byStem.get(stem);
  let out: string | null = null;
  if (files?.length === 1) {
    const buf = await sharp(files[0]).resize(16).webp({ quality: 45 }).toBuffer();
    out = `data:image/webp;base64,${buf.toString('base64')}`;
  }
  cache.set(stem, out);
  return out;
}
