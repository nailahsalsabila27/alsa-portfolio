// Merapikan path gambar supaya salah tulis yang umum tetap jalan. Semua gambar
// diambil dari folder  public/images/  (subfolder boleh):
//   'foto.png'                    -> /images/foto.png
//   'images/foto.png'             -> /images/foto.png
//   'public/images/foto.png'      -> /images/foto.png
//   'prestasi/amw-1.jpg'          -> /images/prestasi/amw-1.jpg
//   'https://...'                 -> dibiarkan
export function asset(path) {
  if (!path || typeof path !== 'string') return '';
  let s = path.trim().replace(/\\/g, '/');
  if (/^(https?:)?\/\//.test(s) || s.startsWith('data:')) return s;
  s = s.replace(/^\.?\/?public\//, '').replace(/^\.\//, '').replace(/^\/+/, '');
  if (!s.startsWith('images/')) s = `images/${s}`;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/${s}`;
}

// Link ke file di folder public/ (mis. CV PDF): 'cv.pdf' -> '/cv.pdf'
export function fileUrl(name) {
  if (!name || typeof name !== 'string') return '';
  const s = name.trim().replace(/\\/g, '/').replace(/^\.?\/?public\//, '').replace(/^\/+/, '');
  if (/^(https?:)?\/\//.test(s)) return s;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/${s}`;
}