/** Маска телефона +7 (XXX) XXX-XX-XX. Возвращает true, если номер полный. */
export function maskPhone(input: HTMLInputElement) {
  const format = () => {
    let d = input.value.replace(/\D/g, '');
    if (d.startsWith('8') || d.startsWith('7')) d = d.slice(1);
    d = d.slice(0, 10);
    let out = '+7';
    if (d.length) out += ' (' + d.slice(0, 3);
    if (d.length >= 3) out += ')';
    if (d.length > 3) out += ' ' + d.slice(3, 6);
    if (d.length > 6) out += '-' + d.slice(6, 8);
    if (d.length > 8) out += '-' + d.slice(8, 10);
    input.value = d.length ? out : '';
  };
  input.addEventListener('input', format);
  input.addEventListener('focus', () => { if (!input.value) input.value = '+7 ('; });
  input.addEventListener('blur', () => { if (input.value.replace(/\D/g, '').length <= 1) input.value = ''; });
}
export const phoneComplete = (v: string) => v.replace(/\D/g, '').length === 11;
