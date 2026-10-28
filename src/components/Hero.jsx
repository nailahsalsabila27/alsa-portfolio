import { motion } from 'framer-motion';
import Avatar from './Avatar';
import { Flower, Sparkle } from './Deco';
import { Handwrite } from '../motion';
import { ease } from '../motion';
import { profile } from '../data';

const LETTERS = 'PORTFOLIO'.split('');

function Globe() {
  return (
    <svg className="globe" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <ellipse cx="12" cy="12" rx="4" ry="9.5" />
      <path d="M2.5 12h19M4 7h16M4 17h16" />
    </svg>
  );
}

export default function Hero() {
  return (
    <header className="hero">
      <motion.div
        className="hero-meta"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <span>{profile.role}</span>
        <span>CREATIVE PORTFOLIO</span>
      </motion.div>

      <h1 className="hero-title" aria-label="Portfolio">
        {LETTERS.map((l, i) => (
          <span className="letter-mask" key={i} aria-hidden="true">
            <motion.span
              className="letter"
              initial={{ y: '112%', rotate: 5 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.07, ease }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* bunga dekoratif di tepi */}
      <motion.div
        className="hero-flower hero-flower-l"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 1, ease }}
      >
        <Flower size={190} className="sway" />
      </motion.div>
      <motion.div
        className="hero-flower hero-flower-r"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 1.1, ease }}
      >
        <Flower size={170} petals={10} className="sway slow" />
      </motion.div>

      <div className="hero-body">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
        >
          <p className="hero-tagline">
            {profile.tagline.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
          <a className="pill" href="#contact">
            <span className="pill-dot" />
            AVAILABLE FOR PROJECTS
            <Sparkle size={13} className="spin" />
          </a>
          <Handwrite className="script hero-sign" delay={1.8}>
            {profile.name}
          </Handwrite>
        </motion.div>

        <motion.div
          className="hero-avatar"
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55, ease }}
        >
          <Avatar fade hint />
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease }}
        >
          <p className="hero-about">{profile.about}</p>
          <div className="hero-loc">
            <span>
              {profile.location}
              <br />
              {profile.work}
            </span>
            <span className="globe-ring">
              <Globe />
            </span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
