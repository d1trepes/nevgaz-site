# 05 · Промпты для AI-картинок (единая стилистика)

Все картинки — одна серия: одна камера, один свет, одна цветокоррекция, один регион (частные дома юга России). Генерировать в одном сервисе.
**Midjourney:** сначала сделать №1, выбрать лучший вариант и дальше добавлять к каждому промпту `--sref <ссылка на него>` — так вся серия будет в одном цвете и свете. Параметры: `--style raw --v 7`.
**Flux / другие:** вставлять блок STYLE в конец каждого промпта и NEGATIVE в негатив.

STYLE (добавлять ко всем):
```
photorealistic documentary photo, shot on Sony A7 IV, 35mm lens, f/2.8, soft natural daylight, calm muted color grade with warm neutral whites, deep navy-blue shadows, small warm orange accents, subtle film grain, clean composition with negative space, realistic private house in southern Russia, high detail, no text, no logos, no watermark
```
NEGATIVE:
```
text, letters, logo, watermark, signage, cartoon, 3d render, CGI look, plastic, oversaturated, HDR, neon, purple, lens flare, stock photo smile, thumbs up, hard hat, american suburban house, wooden american siding, extra fingers, distorted hands, bent impossible pipes, messy wires, dirt, rust, people looking at camera
```

| № | Файл (`src/assets/ai/`) | Формат | Где на сайте | Важность |
|---|---|---|---|---|
| 1 | wall-brick-16x9.jpg / wall-brick-9x16.jpg | 16:9 и 9:16 | Хиро «Труба» — фон | ★★★ |
| 2 | power-panel.jpg | 4:3 | Карточка «Свет» в хиро, направление «Электромонтаж» | ★★★ |
| 3 | water-boiler-room.jpg | 4:3 | Карточка «Вода», направление «Водоснабжение» | ★★★ |
| 4 | house-dusk.jpg | 16:9 | Финальный блок с формой | ★★ |
| 5 | master-portrait.jpg | 4:5 | «О мастере» (до реального фото Сергея) | ★★ |
| 6 | meter-check.jpg | 4:3 | Блок «Газификация» | ★★ |
| 7 | underfloor-heating.jpg | 4:3 | Направление «Отопление», тёплый пол | ★ |
| 8 | flame-macro.jpg | 16:9 | Акцент в блоке «Как работаем» / запуск | ★ |
| 9 | gas-entry-plot.jpg | 3:2 | Блок «Газификация», ввод газа на участке | ★ |

## Промпты

**1. Стена (фон хиро «Труба»)**
```
straight-on frontal photo of a clean light beige facing-brick wall of a private house, perfectly flat and parallel to the camera, no windows, no pipes, no objects, even mortar lines, soft warm side daylight from the left creating gentle texture, large calm empty surface
```
Сделать два кадра: 16:9 и 9:16. Стена должна быть пустой — трубу рисуем кодом поверх.

**2. Электрощит**
```
close-up of an electrician's hands in grey work gloves installing white circuit breakers into a new neat electrical panel on a light brick wall inside a private house under renovation, tidy routed cables, navy work sleeves, shallow depth of field, side window light
```

**3. Бойлерная / водоснабжение**
```
clean modern utility room in a private house, white indirect water heater cylinder, neatly routed white polypropylene and copper pipes, brass valves, pressure gauge, smooth light grey plastered wall, soft daylight from a small window, orderly professional installation, no people
```

**4. Дом в сумерках**
```
two-storey private brick house with dark metal roof at blue hour, warm light glowing in all windows, thin steam from a stainless steel chimney, yellow gas pipe running along the facade to a gas meter, autumn garden, quiet street, calm cozy feeling, wide shot with sky space on the left
```

**5. Мастер (временно, до фото Сергея)**
```
environmental portrait of a calm Russian gas technician around 40, short dark hair, light stubble, navy work overalls, standing beside a white wall-mounted gas boiler in a finished boiler room, holding a pipe wrench low, looking slightly off camera, natural window light
```

**6. Проверка счётчика**
```
gas technician in navy overalls checking a gas meter on a beige brick facade, yellow gas pipe with 90 degree bends and wall clamps, holding a small manometer, seen from the side, daylight, focus on hands and meter
```

**7. Тёплый пол**
```
underfloor heating installation in a private house: neat spiral of white PEX pipes on grey insulation boards over a concrete floor, manifold with blue and red valves at the wall, soft daylight, top-down three-quarter angle
```

**8. Пламя**
```
macro photo of a blue gas burner flame inside a boiler, crisp blue flame tips with a soft warm orange glow, dark navy background, shallow depth of field, calm and clean
```

**9. Ввод газа на участке**
```
yellow steel gas pipe rising from the ground on a private plot and entering the facade of a new brick house, gas valve and wall clamps, neat lawn and gravel, overcast soft daylight, documentary angle at eye level
```

## Видео (если понадобится позже)
Из картинок 8 и 4 сделать 4–6-секундные лупы (Kling / Runway / Veo): пламя мягко колышется; в окнах дома загорается свет. Без звука, H.264 до 2 МБ.
