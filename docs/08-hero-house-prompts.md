# 08 · Хиро «Дом с выключателями» — промпты и сборка кадров

> **Статус: готово.** Готовые слои уже лежат в `src/assets/hero/` — переносить их в Astro как есть, ничего не генерировать заново:
> - `base.jpg` (всё работает), `dark.jpg` (свет выключен) — полные кадры 1448×650;
> - `gas-l.webp` / `gas-d.webp`, `water-l.webp` / `water-d.webp`, `frost-l.webp` / `frost-d.webp` — прозрачные PNG-слои того же размера (суффикс `-l` для светлого дома, `-d` для тёмного).
> Логику показа слоёв смотри в CSS прототипа `prototypes/hero-variants.html` (блок `.house[data-…]`) — перенести один в один. Исходники кадров — `src/assets/ai/house-1floor/`.


## Зачем 8 кадров
Выключатели комбинируются (можно выключить свет и воду одновременно). Чтобы любая комбинация выглядела без багов, свет — единственное **общее** изменение кадра, а газ, вода и отопление — **точечные**. Каждую точечную правку делаем дважды: на светлом и на тёмном кадре. В коде: подложка = светлый или тёмный кадр, поверх — маленькие вырезки из нужного набора. Никаких подкрашиваний фильтрами.

| Файл | Из чего | Что меняется |
|---|---|---|
| `01-base.png` | генерация | всё работает |
| `02-dark.png` | правка 01 | свет выключен везде |
| `03-gas-off.png` | правка 01 | пламя на плите и дисплей котла |
| `04-water-off.png` | правка 01 | струя душа |
| `05-heat-off.png` | правка 01 | иней на стёклах окон |
| `06-dark-gas-off.png` | правка 02 | то же, что 03 |
| `07-dark-water-off.png` | правка 02 | то же, что 04 |
| `08-dark-heat-off.png` | правка 02 | то же, что 05 |

Положить в `src/assets/ai/house-1floor/`.

## Жёсткие правила для правок (иначе будут баги)
1. Все правки — **inpainting одной и той же картинки** (выделение области кистью + промпт): Photoshop Generative Fill, Midjourney Vary Region, Nano Banana / Gemini edit, ChatGPT image edit. **Не генерировать заново** — сдвинется кадр.
2. Выделять **только то, что меняется**, с запасом 10–20 px. Не задевать соседние предметы.
3. Размер всех файлов — **одинаковый** с основой. Не апскейлить по отдельности. Если апскейл нужен — сначала всем 8 одинаково.
4. Если правка испортила что-то вне выделения — откатить и повторить, а не «подправить сверху».
5. В каждом промпте правки повторять фразу: *keep everything else exactly the same, same camera, same lighting, same colors*.

## 01 · Основа (генерация)
Формат **21:9** (например 2688×1152) — дом низкий и широкий, целиком влезает в хиро.
```
photorealistic architectural cutaway of a single-storey modern private house in southern Russia, front wall removed, perfectly straight-on frontal view at eye level, symmetrical composition, the whole house fully visible with even empty margin of sky and lawn on all sides, wide low house with a dark metal hip roof, light beige facing brick, grey stone plinth, five rooms side by side from left to right: bathroom with a glass walk-in shower with a large round ceiling rain shower head and water falling straight down; kitchen with a built-in gas hob with clearly visible blue flames on two burners; narrow boiler room with a white wall-mounted gas boiler with a small glowing blue display, neat copper pipes and a yellow gas pipe; living room with a large window and a white radiator under it; bedroom with a window and two warm bedside lamps; warm interior light in every room from ceiling spotlights, yellow gas pipe and white gas meter on the right side facade, blue hour evening, calm overcast sky, autumn lawn, dark metal fence far behind, minimalist calm interiors in warm grey and beige, no people, no text, no logos, high detail, documentary architectural photography, 35mm, sharp focus
```
Негатив: `second floor, attic windows, people, text, logo, watermark, cartoon, 3d render look, fisheye, perspective distortion, tilted camera, snow, frost, christmas, neon, purple`

Проверить перед правками: видны **пламя на плите**, **дисплей котла**, **струя душа** (лейка целиком в кадре), **стёкла окон** в гостиной и спальне, газовая труба и счётчик. Если чего-то не видно — перегенерировать основу, а не исправлять правками.

## 02 · Тёмный (правка 01, выделить ВСЕ комнаты целиком, без стен снаружи и неба)
```
all interior lights turned off in every room, rooms dark, lit only by dim blue evening light from outside, lamps and spotlights off, no glow, the gas hob flames and the boiler display still on, shower water still running, keep everything else exactly the same, same camera, same lighting outside, same colors
```
Проверить: пламя на плите, дисплей котла и струя душа **остались**, а лампы погасли.

## 03 / 06 · Газ выключен (правка 01 → 03, правка 02 → 06)
Выделить **только конфорки плиты** и **только дисплей котла** (не трогать сам котёл и трубы).
```
gas hob burners turned off, no flame, clean dark burner caps; boiler display turned off and black, keep everything else exactly the same, same camera, same lighting, same colors
```

## 04 / 07 · Вода выключена (правка 01 → 04, правка 02 → 07)
Выделить **только струю воды под лейкой**, начиная на 10 px ниже лейки. **Лейку не выделять.**
```
shower turned off, no water falling, clear air under the shower head, dry glass, keep the shower head exactly the same, keep everything else exactly the same, same camera, same lighting, same colors
```
Проверить: лейка на 04 и 07 **пиксель в пиксель** как на 01/02.

## 05 / 08 · Отопление выключено (правка 01 → 05, правка 02 → 08)
Выделить **только стёкла окон внутри дома** (без рам, штор, стен и улицы за окном не трогать за пределами стекла).
```
frost patterns on the window glass, icy white frost crystals on the glass only, keep window frames, curtains and room lighting exactly the same, keep everything else exactly the same, same camera, same colors
```
Не просить «cold house» / «cold light» — это меняет цвет всей комнаты и даёт «зиму». Холод в комнате добавляется в коде лёгким голубым оверлеем.

## Как собирается в коде
- Подложка: `01-base` (свет вкл) или `02-dark` (свет выкл), переход opacity .9s.
- Поверх — вырезки по маскам из `03/04/05` (светлый набор) или `06/07/08` (тёмный набор). Маски считаются автоматически скриптом: разница пикселей с основой > порога, расширение 6 px, растушёвка 4 px — так в вырезку попадает только то, что реально изменилось.
- Отопление выкл: вырезка инея + полупрозрачный голубой оверлей `rgba(120,170,230,.12)` на область комнат (mix-blend: soft-light).
- Мобилка: тот же кадр 21:9, обрезка по центру до 4:3 (`object-fit: cover`, `object-position` по центру дома).

## Доработка (12.11): кадры, которые были собраны синтетически и дают баги
Сейчас `water-d`, `frost-d` и `gas-l` синтезированы из других кадров. `water-d` выглядит как светлое пятно в тёмной ванной, `water-l` с каплями на стекле. Заменить на настоящие правки:
- **07 dark-water-off** — правка 02, выделить только струю (без лейки): `shower turned off, no water falling, no droplets, dry clear glass, dark bathroom lit only by dim blue evening light from outside, same darkness as the rest of the room, keep the shower head exactly the same, keep everything else exactly the same, same camera, same lighting, same colors`
- **04 water-off (переделать)** — правка 01, струя и стекло душа: `shower turned off, no water falling, no droplets on the glass, dry clear glass and dry tiles, warm interior light exactly as before, keep the shower head exactly the same, keep everything else exactly the same, same camera, same lighting, same colors`
- **08 dark-heat-off** — правка 02, только стёкла окон: `frost patterns on the window glass, icy white frost crystals on the glass only, dim blue evening light, room stays dark, keep window frames and curtains exactly the same, keep everything else exactly the same, same camera, same colors`
После получения — пересобрать слои `water-l`, `water-d`, `frost-d` (маска = разница с основой в зоне душа / окон).
