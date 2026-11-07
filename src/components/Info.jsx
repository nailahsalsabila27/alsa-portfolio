import { motion } from 'framer-motion';
import { Flower, Sparkle } from './Deco';
import { Reveal, ease } from '../motion';
import { process, tools, moreTools, softSkills, journey } from '../data';

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
        <p className="more">{moreTools}</p>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section className="panel journey" id="journey">
      <div className="section-head">
        <h2 className="h-label">
          EXPERIENCE &amp; ACHIEVEMENTS <Sparkle size={13} className="spin" />
        </h2>
      </div>
      <div className="journey-grid">
        {journey.map((col, c) => (
          <Reveal key={col.title} delay={c * 0.12} className="journey-col">
            <h3 className="journey-title">{col.title}</h3>
            <ul>
              {col.items.map((it) => (
                <motion.li key={it.name} whileHover={{ x: 6 }} transition={{ duration: 0.4, ease }}>
                  <span className="journey-period">{it.period}</span>
                  <strong>{it.name}</strong>
                  <small>{it.place}</small>
                  {it.points.length > 0 && (
                    <ul className="journey-points">
                      {it.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <div className="soft">
        <span className="soft-label">SOFT SKILLS</span>
        {softSkills.map((s) => (
          <motion.span
            key={s}
            className="chip"
            whileHover={{ y: -3, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            {s.toUpperCase()}
          </motion.span>
        ))}
      </div>
    </section>
  );
}