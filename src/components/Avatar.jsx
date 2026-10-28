import { useEffect, useId, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

const LINES = [
  'Hi there! 👋',
  'Coffee first ☕',
  "Let's make magic ✨",
  'Pixel-perfect, always 🎯',
  'Hehe, you found me 🙈',
  'Ctrl + S 💾',
];

const SKIN = '#f0c9b3';
const SKIN_DARK = '#dfa98f';
const HAIR = '#0d090a';
const GOLD = '#d9a94f';

/**
 * Avatar ilustrasi SVG yang lucu:
 * - kepala & wajah mengikuti kursor (efek parallax 3 lapis)
 * - hover / klik → kacamata naik, muncul mata senyum ^ ^ + bubble + hati melayang
 */
export default function Avatar({ interactive = true, mono = false, fade = false, hint = false }) {
  const uid = useId().replace(/:/g, '');
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 16 });
  const sy = useSpring(my, { stiffness: 80, damping: 16 });

  const backX = useTransform(sx, (v) => v * 5);
  const backY = useTransform(sy, (v) => v * 3);
  const midX = useTransform(sx, (v) => v * 9);
  const midY = useTransform(sy, (v) => v * 5);
  const frontX = useTransform(sx, (v) => v * 14);
  const frontY = useTransform(sy, (v) => v * 8);

  const [up, setUp] = useState(false);
  const [line, setLine] = useState(null);
  const [hearts, setHearts] = useState([]);
  const [clicked, setClicked] = useState(false);
  const t1 = useRef();
  const t2 = useRef();
  const count = useRef(0);

  useEffect(() => {
    if (!interactive) return undefined;
    const onMove = (e) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 3;
      const clamp = (v) => Math.max(-1, Math.min(1, v));
      mx.set(clamp((e.clientX - cx) / (window.innerWidth / 2)));
      my.set(clamp((e.clientY - cy) / (window.innerHeight / 2)));
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [interactive, mx, my]);

  useEffect(
    () => () => {
      clearTimeout(t1.current);
      clearTimeout(t2.current);
    },
    []
  );

  const poke = () => {
    if (!interactive) return;
    setClicked(true);
    setUp(true);
    setLine(LINES[count.current++ % LINES.length]);
    const base = Date.now();
    setHearts((h) =>
      [
        ...h,
        ...Array.from({ length: 5 }, (_, i) => ({
          id: base + i,
          x: (i - 2) * 28 + Math.random() * 12,
        })),
      ].slice(-10)
    );
    clearTimeout(t1.current);
    clearTimeout(t2.current);
    t1.current = setTimeout(() => setUp(false), 1900);
    t2.current = setTimeout(() => {
      setLine(null);
      setHearts([]);
    }, 2500);
  };

  return (
    <div
      ref={ref}
      className={`avatar${mono ? ' mono' : ''}${fade ? ' fade' : ''}${interactive ? ' live' : ''}`}
      onPointerEnter={() => interactive && setUp(true)}
      onPointerLeave={() => interactive && !line && setUp(false)}
      onClick={poke}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 400 480" role="img" aria-label="Illustration of me wearing sunglasses">
          <defs>
            <linearGradient id={`skin${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6d5c1" />
              <stop offset="1" stopColor={SKIN} />
            </linearGradient>
            <linearGradient id={`lens${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2a1614" />
              <stop offset="1" stopColor="#120808" />
            </linearGradient>
            <linearGradient id={`blazer${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1d1516" />
              <stop offset="1" stopColor="#0c0708" />
            </linearGradient>
            <clipPath id={`lensL${uid}`}>
              <rect x="124" y="170" width="66" height="42" rx="20" />
            </clipPath>
            <clipPath id={`lensR${uid}`}>
              <rect x="210" y="170" width="66" height="42" rx="20" />
            </clipPath>
          </defs>

          {/* rambut belakang (bob) */}
          <motion.path
            style={{ x: backX, y: backY }}
            d="M96 215 C88 120 138 66 200 66 C262 66 312 120 304 215 C302 262 296 300 306 334 L96 334 C106 300 98 262 96 215Z"
            fill={HAIR}
          />

          {/* leher */}
          <path d="M170 262 L170 352 L200 424 L230 352 L230 262Z" fill={`url(#skin${uid})`} />
          <path d="M170 292 Q200 318 230 292 L230 330 Q200 350 170 330Z" fill={SKIN_DARK} opacity="0.45" />

          {/* blazer */}
          <path
            d="M8 480 C18 408 80 372 150 352 L200 424 L250 352 C320 372 382 408 392 480Z"
            fill={`url(#blazer${uid})`}
          />
          <path d="M150 352 L200 424 L250 352" fill="none" stroke="#2f2224" strokeWidth="3" />
          <path d="M150 352 L128 400 M250 352 L272 400" stroke="#241a1b" strokeWidth="3" />

          {/* wajah + rambut samping + poni */}
          <motion.g style={{ x: midX, y: midY }}>
            <ellipse cx="200" cy="210" rx="70" ry="86" fill={`url(#skin${uid})`} />
            <path
              d="M104 205 C98 150 128 118 152 116 L142 176 C134 220 132 272 138 304 L108 322 C94 282 100 244 104 205Z"
              fill={HAIR}
            />
            <path
              d="M296 205 C302 150 272 118 248 116 L258 176 C266 220 268 272 262 304 L292 322 C306 282 300 244 296 205Z"
              fill={HAIR}
            />
            {/* poni */}
            <path
              d="M116 208 C104 120 148 88 200 88 C252 88 296 120 284 208 L272 166 C242 162 216 154 200 154 C184 154 158 162 128 166Z"
              fill={HAIR}
            />
            <path
              d="M150 112 C172 100 205 98 232 106"
              stroke="#2b2022"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
          </motion.g>

          {/* fitur wajah (lapisan paling depan) */}
          <motion.g style={{ x: frontX, y: frontY }}>
            {/* blush */}
            <ellipse cx="152" cy="236" rx="15" ry="9" fill="#e5868a" opacity="0.38" />
            <ellipse cx="248" cy="236" rx="15" ry="9" fill="#e5868a" opacity="0.38" />

            {/* mata senyum — muncul saat kacamata naik */}
            <motion.g animate={{ opacity: up ? 1 : 0 }} transition={{ duration: 0.2 }}>
              <path
                d="M143 196 Q159 178 175 196"
                stroke="#2a1518"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M225 196 Q241 178 257 196"
                stroke="#2a1518"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>

            {/* hidung & bibir */}
            <path
              d="M198 226 Q193 242 201 245"
              stroke="#c9967f"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M177 262 Q189 254 200 259 Q211 254 223 262 Q212 280 200 280 Q188 280 177 262Z"
              fill="#a63446"
            />
            <path
              d="M179 263 Q200 270 221 263"
              stroke="#5f1824"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M190 271 Q200 276 210 271" stroke="#d96b7b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />

            {/* anting emas */}
            <circle cx="124" cy="262" r="10" fill="none" stroke={GOLD} strokeWidth="3.2" />

            {/* kacamata hitam */}
            <motion.g
              animate={{ y: up ? -38 : 0, rotate: up ? -5 : 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            >
              <path d="M124 184 L108 178 M276 184 L292 178" stroke="#6b3a28" strokeWidth="5" strokeLinecap="round" />
              <rect x="124" y="170" width="66" height="42" rx="20" fill={`url(#lens${uid})`} stroke="#7a4630" strokeWidth="5" />
              <rect x="210" y="170" width="66" height="42" rx="20" fill={`url(#lens${uid})`} stroke="#7a4630" strokeWidth="5" />
              <path d="M190 184 Q200 177 210 184" stroke="#7a4630" strokeWidth="5" fill="none" strokeLinecap="round" />
              {/* kilau berjalan */}
              {['L', 'R'].map((s) => (
                <g key={s} clipPath={`url(#lens${s}${uid})`}>
                  <g transform={s === 'R' ? 'translate(86 0)' : undefined}>
                    <motion.path
                      d="M128 214 L146 168 L158 168 L140 214Z"
                      fill="#fff"
                      initial={{ x: 0, opacity: 0 }}
                      animate={{ x: [0, 70], opacity: [0, 0.35, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        repeatDelay: 3.4,
                        ease: 'easeInOut',
                        delay: s === 'L' ? 0 : 0.15,
                      }}
                    />
                  </g>
                </g>
              ))}
              <path d="M134 180 Q146 174 160 178" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.22" />
              <path d="M220 180 Q232 174 246 178" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.22" />
            </motion.g>
          </motion.g>
        </svg>
      </motion.div>

      {/* bubble + hati */}
      <AnimatePresence>
        {line && (
          <motion.div
            key={line}
            className="bubble"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            {line}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="heart"
            initial={{ opacity: 0, y: 0, x: h.x, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], y: -110, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            ♥
          </motion.span>
        ))}
      </AnimatePresence>

      {hint && interactive && !clicked && (
        <motion.span
          className="avatar-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 2.4 }, y: { duration: 2, repeat: Infinity } }}
        >
          click me ✦
        </motion.span>
      )}
    </div>
  );
}
