// Merapikan path gambar supaya salah tulis yang umum tetap jalan:
//   'foto.png'               -> '/images/foto.png'
//   'images/foto.png'        -> '/images/foto.png'
//   'public/images/foto.png' -> '/images/foto.png'
//   '/images/foto.png'       -> '/images/foto.png'
//   'https://...'            -> dibiarkan
export function asset(path) {
  if (!path || typeof path !== 'string') return '';
  let s = path.trim().replace(/\\/g, '/');
  if (/^(https?:)?\/\//.test(s) || s.startsWith('data:')) return s;
  s = s.replace(/^\.?\/?public\//, '').replace(/^\.\//, '').replace(/^\/+/, '');
  if (!s.includes('/')) s = `images/${s}`;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/${s}`;
}