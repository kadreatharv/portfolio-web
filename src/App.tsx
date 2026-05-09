import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import WhatIDo from './components/WhatIDo';
import Career from './components/Career';
import Work from './components/Work';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import AvatarCanvas from './components/AvatarCanvas';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function MainContent({ loading, onLoadingComplete }: { loading: boolean, onLoadingComplete: () => void }) {
  const lenis = useLenis();

  useEffect(() => {
    if (loading) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
      window.scrollTo(0, 0); // Start from Page 1 on refresh
      
      // Refresh ScrollTrigger after a short delay to ensure layout is settled
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [loading, lenis]);

  return (
    <>
      {loading && <Preloader onComplete={onLoadingComplete} />}
      <Layout>
        <Hero />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <TechStack />
        <Contact />
      </Layout>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <CustomCursor />
      <AvatarCanvas />
      <MainContent loading={loading} onLoadingComplete={() => setLoading(false)} />
    </ReactLenis>
  );
}

export default App;

