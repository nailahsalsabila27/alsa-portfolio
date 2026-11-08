import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flower, Sparkle } from './Deco';
import DetailModal from './DetailModal';
import { Reveal } from '../motion';
import { projects } from '../data';

/* Kartu proyek: hanya nomor, judul, dan deskripsi singkat. Detail ada di pop-up. */
function Card({ p, index, onOpen }) {
  return (
    <Reveal as="article" delay={index * 0.12} className="project">
      <motion.button
        type="button"
        className="project-card"
        aria-haspopup="dialog"
        aria-label={`View details of ${p.title}`}
        onClick={() => onOpen(p)}
        whileHover="hover"
        whileTap={{ scale: 0.985 }}
      >
        <motion.span
          className="project-card-flower"
          variants={{ hover: { rotate: 40, scale: 1.12, opacity: 0.9 } }}
          initial={{ rotate: 0, scale: 1, opacity: 0.45 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Flower size={120} petals={8 + (index % 3)} />
        </motion.span>

        <span className="project-no">{p.no}</span>
        <h3>{p.title}</h3>
        <p className="project-desc">{p.summary}</p>

        <span className="project-more">
          VIEW DETAILS
          <motion.i variants={{ hover: { x: 6, rotate: 90 } }} transition={{ duration: 0.5 }}>
            +
          </motion.i>
        </span>
      </motion.button>
    </Reveal>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="panel" id="projects">
      <div className="section-head">
        <h2 className="h-label">
          SELECTED PROJECTS <Sparkle size={13} className="spin" />
        </h2>
        <span className="link-arrow">CLICK A PROJECT FOR DETAILS</span>
      </div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <Card key={p.no} p={p} index={i} onOpen={setActive} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <DetailModal
            key={active.no}
            badge={active.no}
            title={active.title}
            subtitle={active.fullTitle}
            meta={active.type}
            images={active.images}
            description={active.description}
            descLabel="ABOUT THE PROJECT"
            list={active.contributions}
            listLabel="WHAT I DID"
            groups={[
              { label: 'PROGRAMMING LANGUAGES', items: active.languages, solid: true },
              { label: 'TOOLS & FRAMEWORKS', items: active.tools },
            ]}
            link={{ url: active.url, label: 'VIEW PROJECT' }}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  );
}