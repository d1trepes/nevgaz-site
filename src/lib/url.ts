/** Путь с учётом base (GitHub Pages): url('/ceny/') → '/repo/ceny/' */
export const url = (path = '/') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};
