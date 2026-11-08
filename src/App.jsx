import { MotionConfig } from 'framer-motion';
import Hero from './components/Hero';
import Projects from './components/Projects';
import { ProcessAndTools, Journey } from './components/Info';
import { Gpa, GitHubActivity } from './components/Academic';
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
        <Journey />
        <section className="stats-grid">
          <Gpa />
          <GitHubActivity />
        </section>
        <Contact />
      </main>

      {/* bunga dekoratif yang menempel di tepi halaman */}
      <div className="edge-flower edge-l" aria-hidden="true">
        <Flower size={220} className="sway slow" />
      </div>
    </MotionConfig>
  );
}