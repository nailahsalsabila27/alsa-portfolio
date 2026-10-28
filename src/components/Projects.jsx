import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Flower, Sparkle } from './Deco';
import { Reveal, ease } from '../motion';
import { projects } from '../data';

function Mockup({ variant, headline }) {
  return (
    <div className={`mock mock-${variant}`}>
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span />
      </div>
      <div className="mock-body">
        <div className="mock-copy">
          <h4>{headline}</h4>
          <p />
          <p className="short" />
          <b className="mock-btn" />
        </div>
        <div className="mock-art">
          <Flower size={variant === 2 ? 74 : 84} petals={variant + 7} className="float" />
          <Sparkle size={12} className="mock-spark twinkle" />
        </div>
      </div>
      <div className="mock-cards">
        <u />
        <u />
        <u />
      </div>
    </div>
  );
}

function Card({ p, index }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const tx = useTransform(sry, (v) => v * -1.2);
  const ty = useTransform(srx, (v) => v * 1.2);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 9);
    rx.set(py * -9);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Reveal as="article" delay={index * 0.12} className="project">
      <div className="project-head">
        <span className="project-no">{p.no}</span>
        <div>
          <h3>{p.title}</h3>
          <small>{p.type}</small>
        </div>
      </div>

      <a className="project-link" href={p.url} aria-label={`Open ${p.title}`}>
        <motion.div
          className="tilt"
          style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
          onPointerMove={onMove}
          onPointerLeave={reset}
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.5, ease }}
        >
          <motion.div style={{ x: tx, y: ty }}>
            <Mockup variant={p.variant} headline={p.headline} />
          </motion.div>
          <span className="project-open">
            View project <span>↗</span>
          </span>
        </motion.div>
      </a>

      <div className="chips">
        {p.tags.map((t) => (
          <motion.span key={t} className="chip" whileHover={{ y: -3, rotate: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }}>
            {t}
          </motion.span>
        ))}
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section className="panel" id="projects">
      <div className="section-head">
        <h2 className="h-label">
          SELECTED PROJECTS <Sparkle size={13} className="spin" />
        </h2>
        <a className="link-arrow" href="#projects">
          VIEW ALL PROJECTS <span>→</span>
        </a>
      </div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <Card key={p.no} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
