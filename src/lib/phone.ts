/** Маска телефона +7 (XXX) XXX-XX-XX. Первая 8 или 7 считается кодом страны. */
export function maskPhone(input: HTMLInputElement) {
  let prev = '';
  const format = () => {
    const raw = input.value;
    let d = (raw.startsWith('+7') ? raw.slice(2) : raw).replace(/\D/g, '');
    if (d.length > 10 && /^[78]/.test(d)) d = d.slice(1); // вставили 8XXXXXXXXXX или +7XXXXXXXXXX
    if (prev === '' && /^[78]$/.test(d)) d = '';           // начали набор с 8 или 7
    d = d.slice(0, 10);
    prev = d;
    let out = '+7';
    if (d.length) out += ' (' + d.slice(0, 3);
    if (d.length >= 3) out += ')';
    if (d.length > 3) out += ' ' + d.slice(3, 6);
    if (d.length > 6) out += '-' + d.slice(6, 8);
    if (d.length > 8) out += '-' + d.slice(8, 10);
    input.value = d.length ? out : '+7 (';
  };
  input.addEventListener('input', format);
  input.addEventListener('focus', () => { if (!input.value) input.value = '+7 ('; });
  input.addEventListener('blur', () => { if (input.value.replace(/\D/g, '').length <= 1) { input.value = ''; prev = ''; } });
  input.form?.addEventListener('reset', () => { prev = ''; });
}
export const phoneComplete = (v: string) => v.replace(/\D/g, '').length === 11;
