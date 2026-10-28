import { motion } from 'framer-motion';
import { Flower, Sparkle } from './Deco';
import { Reveal, ease } from '../motion';
import { process, tools, testimonials } from '../data';

export function ProcessAndTools() {
  return (
    <section className="info-grid">
      {/* PROCESS */}
      <div className="panel process">
        <div className="section-head plain">
          <h2 className="h-label">
            MY PROCESS <Sparkle size={13} className="spin" />
          </h2>
        </div>
        <div className="process-body">
          <ol className="steps">
            {process.map((s, i) => (
              <motion.li
                key={s.no}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.09, ease }}
                whileHover={{ x: 8 }}
              >
                <span className="step-no">{s.no}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <Reveal className="orbit" delay={0.2}>
            <div className="orbit-ring" />
            <div className="orbit-sparkle">
              <Sparkle size={12} color="#d9b8a0" />
            </div>
            <Flower size={150} petals={8} className="bloom" />
            <p>
              A thoughtful
              <br />
              process for
              <br />
              meaningful
              <br />
              results.
            </p>
          </Reveal>
        </div>
      </div>

      {/* TOOLS */}
      <div className="panel tools">
        <div className="section-head plain">
          <h2 className="h-label">
            TOOLS I USE <Sparkle size={13} className="spin" />
          </h2>
        </div>
        <div className="tools-grid">
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              className="tool"
              style={{ '--c': t.color }}
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease }}
              whileHover={{ y: -5, rotate: [0, -2.5, 2.5, 0], transition: { duration: 0.5 } }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="tool-badge">{t.glyph}</span>
              <span className="tool-name">{t.name}</span>
            </motion.div>
          ))}
        </div>
        <p className="more">&amp; MORE GREAT TOOLS</p>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="panel kind">
      <div className="section-head plain">
        <h2 className="h-label">
          KIND WORDS <Sparkle size={13} className="spin" />
        </h2>
      </div>
      <div className="kind-grid">
        {testimonials.map((t, i) => (
          <Reveal as="figure" key={t.name} delay={i * 0.12} className="quote">
            <motion.span
              className="quote-mark"
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.3 + i * 0.12 }}
            >
              “
            </motion.span>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <motion.span className="mini-avatar" whileHover={{ rotate: 12, scale: 1.1 }}>
                {t.initials}
              </motion.span>
              <span>
                <b>{t.name}</b>
                <small>{t.role}</small>
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
