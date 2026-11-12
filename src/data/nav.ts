import gas from '../assets/ai/gas-entry-plot.jpg';
import heat from '../assets/photos/11-boiler-wall-2.jpg';
import water from '../assets/ai/water-boiler-room.jpg';
import power from '../assets/ai/power-panel.jpg';
import weld from '../assets/photos/05-chimney-steel.jpg';

export const services = [
  { title: 'Газификация дома', href: '/uslugi/gazifikaciya/', photo: gas },
  { title: 'Отопление и котельные', href: '/uslugi/otoplenie/', photo: heat },
  { title: 'Водоснабжение и канализация', href: '/uslugi/vodosnabzhenie/', photo: water },
  { title: 'Электромонтаж', href: '/uslugi/elektromontazh/', photo: power },
  { title: 'Сварка и металлоконструкции', href: '/uslugi/svarka-metallokonstrukcii/', photo: weld },
];

// header: false — пункт только в футере (шапка по спеке: Услуги · Цены · Наши работы · О компании · Контакты)
export const mainNav = [
  { title: 'Услуги', href: '/uslugi/', children: services },
  { title: 'Цены', href: '/ceny/' },
  { title: 'Наши работы', href: '/raboty/' },
  { title: 'О компании', href: '/o-kompanii/' },
  { title: 'Отзывы', href: '/otzyvy/', header: false },
  { title: 'Контакты', href: '/kontakty/' },
];

export const legal = [{ title: 'Политика обработки персональных данных', href: '/politika/' }];
