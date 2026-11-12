// Скачивает исходные фото НевГаз из 2ГИС в src/assets (Astro сам оптимизирует их в AVIF/WebP при сборке).
// Запуск: npm run assets   (нужен доступ в интернет; при ошибках — отключить VPN, 2ГИС режет зарубежные IP)
import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const G = (id) => `https://i0.photo.2gis.com/photo-gallery/${id}.jpg`;

// name — семантическое имя файла, которым пользуемся в коде. Роли и описание — docs/04-assets.md
const ASSETS = [
  // Фото работ из галереи 2ГИС (оригиналы, до 1440×1920)
  ['photos/01-grp-yellow-fence.jpg', G('76258937-826b-4d19-add9-66980485be6d')],
  ['photos/02-kitchen-gas-hob.jpg', G('9e781ec1-31df-4368-bdac-76dd6e1dfd3c')],
  ['photos/03-facade-gas-pipe.jpg', G('bc96d156-1e90-44d3-8670-baf9f2a80d1a')],
  ['photos/04-chimney-brick-wall.jpg', G('49def019-9d92-4a75-ae52-e495a7030d56')],
  ['photos/05-chimney-steel.jpg', G('505a12e8-812c-4b54-92f3-00c63526138e')],
  ['photos/06-gas-pipe-warning-box.jpg', G('4efcd3ea-692f-4f53-9205-dd33fb8f645e')],
  ['photos/07-equipment-boxes.jpg', G('b396e1b5-0ccb-4d0e-8403-aee523634b8e')],
  ['photos/08-gas-pipe-meter-facade.jpg', G('f6153f86-7c0f-4691-a960-3edcc8c451f8')],
  ['photos/09-gas-meter-brick.jpg', G('2d53a363-fe39-4ab2-9e47-01955f0f3509')],
  ['photos/10-boiler-wall-1.jpg', G('7b924075-a82f-4f45-994d-f46727e8e047')],
  ['photos/11-boiler-wall-2.jpg', G('d818be98-857d-45e1-902b-c3b61a108457')],
  ['photos/12-boiler-room.jpg', G('f2c23f33-aa01-4733-a847-5008bb4527bc')],
  ['photos/13-boiler-rough-finish.jpg', G('8a0a3964-022b-46f4-8b5b-2a95303e899c')],
  ['photos/14-radiator.jpg', G('0f0f79ee-c2a6-46ad-8a90-7b5a09dd656b')],
  ['photos/15-convector.jpg', G('5bf81d82-59fd-4ee6-8ad1-aebbd68c971f')],
  ['photos/16-apartment-building.jpg', G('c7531d5e-5029-4408-9b0a-e9d8a2459f2f')],
  // Обложки сторис и рекламные карточки (референс фирменного стиля — визитка клиента)
  ['brand-ref/story-works-cover.jpg', 'https://disk.2gis.com/storyteller-2026/11/f832948aed1b404a890239835d35eabc.jpeg'],
  ['brand-ref/story-business-card.jpg', 'https://disk.2gis.com/storyteller-2026/11/53ac7398fbce4c5e8c594a599e9d5a54.jpeg'],
  ['brand-ref/story-services.jpg', 'https://disk.2gis.com/storyteller-2026/11/555206ba9ac44d5ea850cdf18d9937e7.jpeg'],
  ['brand-ref/market-card-1.jpg', 'https://cachizer2.2gis.com/market/f9ff4437-9a2a-4dd3-9d06-fe75967408d9.jpg'],
  ['brand-ref/market-card-2.jpg', 'https://cachizer2.2gis.com/market/cc00722b-493f-43a4-bb75-b5ecbfd424a5.jpg'],
  ['brand-ref/market-card-3.jpg', 'https://cachizer2.2gis.com/market/299187ba-a24f-4ddf-b595-162c6771d099.jpg'],
  // Исходный логотип (растровый, только как референс — в вёрстке используем SVG из public/brand)
  ['brand-ref/logo-original-125.png', 'https://ams2-cdn.2gis.com/previews/1258976175787606016/73843187-1667-4c27-9cb4-24c0cd484925/1/ru/image_125x125.png?api-version=2.0'],
];

const root = new URL('../src/assets/', import.meta.url).pathname;
let ok = 0, skip = 0, fail = 0;
for (const [name, url] of ASSETS) {
  const out = join(root, name);
  const stem = name.replace(/\.[a-z]+$/, '').split('/').pop();
  const existing = await readdir(dirname(out)).catch(() => []);
  if (existing.some((f) => f.replace(/\.[a-z]+$/, '') === stem)) { skip++; continue; }
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://2gis.ru/' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, Buffer.from(await res.arrayBuffer()));
    ok++; console.log('✓', name);
  } catch (e) { fail++; console.warn('✗', name, e.message); }
}
console.log(`\nГотово: скачано ${ok}, уже было ${skip}, ошибок ${fail}`);
if (fail) process.exitCode = 1;
