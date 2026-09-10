import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import News from './components/News';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-light)' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <News />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
