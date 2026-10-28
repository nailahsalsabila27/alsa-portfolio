import { MotionConfig } from 'framer-motion';
import Hero from './components/Hero';
import Projects from './components/Projects';
import { ProcessAndTools, Testimonials } from './components/Info';
import Contact from './components/Contact';
import { CursorTrail, FallingPetals, Flower, ScrollProgress } from './components/Deco';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <FallingPetals />
      <CursorTrail />

      <Hero />

      <main className="frame">
        <Projects />
        <ProcessAndTools />
        <Testimonials />
        <Contact />
      </main>

      {/* bunga dekoratif yang menempel di tepi halaman */}
      <div className="edge-flower edge-l" aria-hidden="true">
        <Flower size={220} className="sway slow" />
      </div>
    </MotionConfig>
  );
}
