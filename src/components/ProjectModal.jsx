import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Flower, Sparkle } from './Deco';
import Photo from './Photo';
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
 * Pop-up detail proyek. Dipasang di dalam <AnimatePresence> oleh parent,
 * jadi animasi keluar (exit) ikut berjalan.
 * Tutup: tombol ✕, klik area gelap, atau tombol Esc.
 */
export default function ProjectModal({ project, onClose }) {
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
      // jaga fokus tetap di dalam pop-up
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

  const hasLink = project.url && project.url !== '#';

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
            <span className="modal-no">{project.no}</span>
            <div>
              <h3 id="modal-title">{project.title}</h3>
              <p className="modal-full">{project.fullTitle}</p>
              <small>{project.type}</small>
            </div>
          </motion.header>

          {project.image && (
            <motion.div variants={item} className="modal-media">
              <Photo src={project.image} alt={project.title} />
            </motion.div>
          )}

          <motion.section variants={item}>
            <h4 className="modal-label">
              ABOUT THE PROJECT <Sparkle size={10} className="spin" />
            </h4>
            <p className="modal-text">{project.description}</p>
          </motion.section>

          <motion.section variants={item}>
            <h4 className="modal-label">
              WHAT I DID <Sparkle size={10} className="spin" />
            </h4>
            <ul className="modal-list">
              {project.contributions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={item} className="modal-tech">
            <div>
              <h4 className="modal-label">PROGRAMMING LANGUAGES</h4>
              <div className="chips">
                {project.languages.map((l) => (
                  <motion.span
                    key={l}
                    className="chip chip-solid"
                    whileHover={{ y: -3, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    {l.toUpperCase()}
                  </motion.span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="modal-label">TOOLS &amp; FRAMEWORKS</h4>
              <div className="chips">
                {project.tools.map((t) => (
                  <motion.span
                    key={t}
                    className="chip"
                    whileHover={{ y: -3, rotate: 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    {t.toUpperCase()}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.section>

          {hasLink && (
            <motion.div variants={item}>
              <a className="pill" href={project.url} target="_blank" rel="noreferrer">
                VIEW PROJECT <span>↗</span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
}