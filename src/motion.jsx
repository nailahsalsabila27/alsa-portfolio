import { motion } from 'framer-motion';

// Satu easing & durasi dipakai di seluruh situs supaya animasinya terasa senada.
export const ease = [0.22, 1, 0.36, 1];

export function Reveal({
  as = 'div',
  children,
  delay = 0,
  y = 28,
  className = '',
  ...rest
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

// Teks tulisan tangan: terbuka dari kiri ke kanan seperti sedang ditulis.
export function Handwrite({ children, className = '', delay = 0.2 }) {
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block' }}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.span>
  );
}
