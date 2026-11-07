import { useEffect, useState } from 'react';
import { asset } from '../utils';

/**
 * Gambar dengan fallback otomatis: kalau file tidak ditemukan / path salah,
 * tampilkan `fallback` (ilustrasi / mockup) dan beri peringatan di Console browser.
 */
export default function Photo({ src, alt = '', className = '', fallback = null, ...rest }) {
  const url = asset(src);
  const [bad, setBad] = useState(false);

  useEffect(() => setBad(false), [url]);

  if (!url || bad) return fallback;
  return (
    <img
      className={className}
      src={url}
      alt={alt}
      onError={() => {
        console.warn(
          `[Photo] Gambar tidak ditemukan: "${url}". Pastikan file ada di folder public/images/ dan namanya sama persis (huruf besar/kecil & ekstensi).`
        );
        setBad(true);
      }}
      {...rest}
    />
  );
}