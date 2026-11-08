import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { asset } from '../utils';

/**
 * Galeri foto di dalam pop-up. Foto yang file-nya belum ada otomatis disembunyikan
 * (dan dicatat di Console), jadi aman mengisi daftar nama file lebih dulu.
 * Klik foto untuk memperbesar; ← → untuk pindah, Esc untuk menutup.
 */
export default function Gallery({ images = [], alt = '' }) {
  const urls = useMemo(() => images.map(asset).filter(Boolean), [images]);
  const [failed, setFailed] = useState(() => new Set());
  const [open, setOpen] = useState(null); // index pada daftar yang tampil

  const shown = urls.filter((u) => !failed.has(u));

  const markFailed = (u) => {
    console.warn(`[Gallery] Gambar tidak ditemukan: "${u}". Taruh file di public/images/ dengan nama yang sama persis.`);
    setFailed((prev) => new Set(prev).add(u));
  };

  useEffect(() => {
    if (open === null) return undefined;
    // fase capture: kita menangani tombol lebih dulu supaya Esc hanya menutup lightbox,
    // bukan seluruh pop-up di belakangnya
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(null);
      } else if (e.key === 'ArrowRight') {
        e.stopPropagation();
        setOpen((i) => (i + 1) % shown.length);
      } else if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        setOpen((i) => (i - 1 + shown.length) % shown.length);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, shown.length]);

  if (!urls.length) return null;

  const cols = Math.min(Math.max(shown.length - 1, 1), 4);

  return (
    <>
      {/* gambar tersembunyi untuk mendeteksi file yang tidak ada */}
      {urls
        .filter((u) => !failed.has(u))
        .map((u) => (
          <img key={`probe-${u}`} src={u} alt="" hidden onError={() => markFailed(u)} />
        ))}

      {shown.length > 0 && (
        <div className="gallery" style={{ '--cols': cols }}>
          {shown.map((u, i) => (
            <motion.button
              type="button"
              key={u}
              className="gallery-item"
              aria-label={`Enlarge photo ${i + 1}`}
              onClick={() => setOpen(i)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img src={u} alt={`${alt} ${i + 1}`} loading="lazy" />
            </motion.button>
          ))}
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {open !== null && shown[open] && (
            <motion.div
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(null)}
            >
              <motion.img
                key={shown[open]}
                src={shown[open]}
                alt={`${alt} ${open + 1}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              />
              {shown.length > 1 && (
                <>
                  <button
                    type="button"
                    className="lightbox-nav prev"
                    aria-label="Previous photo"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen((open - 1 + shown.length) % shown.length);
                    }}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="lightbox-nav next"
                    aria-label="Next photo"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen((open + 1) % shown.length);
                    }}
                  >
                    ›
                  </button>
                  <span className="lightbox-count">
                    {open + 1} / {shown.length}
                  </span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}