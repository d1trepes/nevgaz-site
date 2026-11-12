export const services = [
  { title: 'Газификация дома', href: '/uslugi/gazifikaciya/', icon: 'flame' },
  { title: 'Отопление и котельные', href: '/uslugi/otoplenie/', icon: 'radiator' },
  { title: 'Водоснабжение и канализация', href: '/uslugi/vodosnabzhenie/', icon: 'drop' },
  { title: 'Электромонтаж', href: '/uslugi/elektromontazh/', icon: 'bolt' },
  { title: 'Сварка и металлоконструкции', href: '/uslugi/svarka-metallokonstrukcii/', icon: 'weld' },
];

export const mainNav = [
  { title: 'Услуги', href: '/uslugi/', children: services },
  { title: 'Цены', href: '/ceny/' },
  { title: 'Наши работы', href: '/raboty/' },
  { title: 'О компании', href: '/o-kompanii/' },
  { title: 'Отзывы', href: '/otzyvy/' },
  { title: 'Контакты', href: '/kontakty/' },
];

export const legal = [{ title: 'Политика обработки персональных данных', href: '/politika/' }];
