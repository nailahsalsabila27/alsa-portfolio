import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Avatar from './Avatar';
import { Flower, Sparkle } from './Deco';
import { Handwrite, Reveal, ease } from '../motion';
import { profile } from '../data';

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5 12 13l8.5-6.5" />
  </svg>
);
const InstaIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.8" fill="currentColor" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export default function Contact() {
  const [toast, setToast] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(profile.email).catch(() => {});
    setToast(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), 2200);
  };

  return (
    <>
      <section className="panel contact" id="contact">
        <Reveal className="contact-col contact-hero">
          <h2>
            LET’S CREATE
            <br />
            SOMETHING
          </h2>
          <Handwrite className="script amazing" delay={0.4}>
            Amazing
          </Handwrite>
        </Reveal>

        <Reveal className="contact-col contact-mid" delay={0.1}>
          <h3>
            I’M CURRENTLY OPEN
            <br />
            FOR NEW PROJECTS
          </h3>
          <p>Let’s build something impactful and beautiful together.</p>
          <motion.a
            className="pill pill-lg"
            href={`mailto:${profile.email}`}
            onClick={copy}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 16 }}
          >
            SEND ME A MESSAGE <Sparkle size={13} className="spin" />
          </motion.a>
        </Reveal>

        <Reveal className="contact-col contact-links" delay={0.2}>
          <button type="button" className="link-row" onClick={copy}>
            <MailIcon /> <span>{profile.email.toUpperCase()}</span>
          </button>
          <a className="link-row" href="#contact">
            <InstaIcon /> <span>{profile.instagram.toUpperCase()}</span>
          </a>
          <span className="link-row">
            <PinIcon /> <span>{profile.place.toUpperCase()}</span>
          </span>
        </Reveal>

        <motion.div
          className="portrait"
          initial={{ opacity: 0, y: 30, rotate: 6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 3 }}
          viewport={{ once: true }}
          whileHover={{ rotate: -1, scale: 1.03 }}
          transition={{ duration: 0.9, ease }}
        >
          <span className="tape" />
          <Avatar mono interactive={false} />
          <Flower size={96} className="portrait-flower sway" />
        </motion.div>
      </section>

      <footer className="thanks">
        THANK YOU FOR VISITING <Sparkle size={13} className="spin" />
      </footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            role="status"
          >
            Email copied ✨
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
