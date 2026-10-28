import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/* Bunga burgundy — dipakai sebagai dekorasi di banyak tempat */
export function Flower({ size = 120, petals = 9, className = '' }) {
  const gid = 'fg' + useId().replace(/:/g, '');
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gid} cx="50%" cy="85%" r="85%">
          <stop offset="0%" stopColor="#a13243" />
          <stop offset="55%" stopColor="#5b1520" />
          <stop offset="100%" stopColor="#25080e" />
        </radialGradient>
      </defs>
      {Array.from({ length: petals }).map((_, i) => (
        <path
          key={i}
          d="M0 0 C-36 -30 -32 -88 0 -97 C32 -88 36 -30 0 0Z"
          fill={`url(#${gid})`}
          stroke="#c0586a"
          strokeOpacity="0.22"
          transform={`rotate(${(360 / petals) * i})`}
        />
      ))}
      <circle r="13" fill="#1a0509" />
      <circle r="5" fill="#d9b8a0" opacity="0.75" />
    </svg>
  );
}

/* Bintang 4 sudut ✦ */
export function Sparkle({ size = 14, className = '', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"
        fill={color}
      />
    </svg>
  );
}

/* Kelopak yang jatuh pelan di latar belakang */
export function FallingPetals({ count = 14 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 12,
        dur: 16 + Math.random() * 16,
        delay: -Math.random() * 30,
        sway: 40 + Math.random() * 80,
        op: 0.25 + Math.random() * 0.35,
      })),
    [count]
  );
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.op,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            '--sway': `${p.sway}px`,
          }}
        />
      ))}
    </div>
  );
}

/* Jejak kecil yang mengikuti kursor ✿ ♡ ✦ */
const SYMS = ['✦', '♡', '✿', '·', '✦'];
export function CursorTrail() {
  const [dots, setDots] = useState([]);
  const last = useRef(0);
  const id = useRef(0);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduce) return undefined;

    const timers = new Set();
    const onMove = (e) => {
      const now = performance.now();
      if (now - last.current < 80) return;
      last.current = now;
      const k = id.current++;
      const dot = {
        k,
        x: e.clientX,
        y: e.clientY,
        sym: SYMS[k % SYMS.length],
        dx: (Math.random() - 0.5) * 36,
      };
      setDots((d) => [...d.slice(-12), dot]);
      const t = setTimeout(() => {
        setDots((d) => d.filter((p) => p.k !== k));
        timers.delete(t);
      }, 900);
      timers.add(t);
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="trail" aria-hidden="true">
      {dots.map((p) => (
        <span key={p.k} className="trail-dot" style={{ left: p.x, top: p.y, '--dx': `${p.dx}px` }}>
          {p.sym}
        </span>
      ))}
    </div>
  );
}

/* Progress scroll di atas halaman, dengan hati kecil yang ikut berjalan */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const left = useTransform(scaleX, [0, 1], ['0%', '100%']);
  return (
    <div className="progress" aria-hidden="true">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <motion.span className="progress-heart" style={{ left }}>
        ♥
      </motion.span>
    </div>
  );
}
