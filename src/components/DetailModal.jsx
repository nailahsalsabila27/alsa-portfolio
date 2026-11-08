import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Flower, Sparkle } from './Deco';
import Gallery from './Gallery';
import { ease } from '../motion';

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/**
 * Pop-up detail serbaguna (dipakai untuk proyek, organisasi, dan prestasi).
 * Semua bagian opsional — yang kosong tidak ditampilkan.
 *
 * props: badge, title, subtitle, meta, images[], description, descLabel,
 *        list[] + listLabel  ATAU  lists[{label, items[]}], groups[{label, items[], solid}], link{url,label}, onClose
 */
export default function DetailModal({
  badge,
  title,
  subtitle,
  meta,
  images = [],
  description,
  descLabel = 'ABOUT',
  list: points = [],
  listLabel = 'HIGHLIGHTS',
  lists = [],
  groups = [],
  link,
  onClose,
}) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const hasLink = link?.url && link.url !== '#';
  const hasImages = images.some(Boolean);
  const sections = lists.length ? lists : points.length ? [{ label: listLabel, items: points }] : [];

  return createPortal(
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={() => onCloseRef.current()}
    >
      <motion.div
        ref={panelRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60, scale: 0.92, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, y: 30, scale: 0.96, transition: { duration: 0.25 } }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
      >
        <Flower size={170} petals={9} className="modal-flower sway slow" />

        <motion.button
          ref={closeRef}
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={() => onCloseRef.current()}
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 14 }}
        >
          ✕
        </motion.button>

        <motion.div className="modal-body" variants={list} initial="hidden" animate="show">
          <motion.header variants={item} className="modal-head">
            {badge && <span className="modal-no">{badge}</span>}
            <div>
              <h3 id="modal-title">{title}</h3>
              {subtitle && <p className="modal-full">{subtitle}</p>}
              {meta && <small>{meta}</small>}
            </div>
          </motion.header>

          {hasImages && (
            <motion.div variants={item}>
              <Gallery images={images} alt={title} />
            </motion.div>
          )}

          {description && (
            <motion.section variants={item}>
              <h4 className="modal-label">
                {descLabel} <Sparkle size={10} className="spin" />
              </h4>
              <p className="modal-text">{description}</p>
            </motion.section>
          )}

          {sections.map((sec) => (
            <motion.section variants={item} key={sec.label}>
              <h4 className="modal-label">
                {sec.label} <Sparkle size={10} className="spin" />
              </h4>
              <ul className="modal-list">
                {sec.items.map((c) => {
                  const i = c.indexOf(' — ');
                  return (
                    <li key={c}>
                      {i > 0 ? (
                        <>
                          <b>{c.slice(0, i)}</b> <span className="modal-sep">—</span> {c.slice(i + 3)}
                        </>
                      ) : (
                        c
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.section>
          ))}

          {groups.length > 0 && (
            <motion.section variants={item} className="modal-tech">
              {groups.map((g) => (
                <div key={g.label}>
                  <h4 className="modal-label">{g.label}</h4>
                  <div className="chips">
                    {g.items.map((t) => (
                      <motion.span
                        key={t}
                        className={`chip${g.solid ? ' chip-solid' : ''}`}
                        whileHover={{ y: -3, rotate: g.solid ? -2 : 2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                      >
                        {t.toUpperCase()}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.section>
          )}

          {hasLink && (
            <motion.div variants={item}>
              <a className="pill" href={link.url} target="_blank" rel="noreferrer">
                {link.label || 'OPEN'} <span>↗</span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
}