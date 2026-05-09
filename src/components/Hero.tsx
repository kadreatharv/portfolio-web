import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1, // Added smoothing to prevent instant disappearance
        }
      });

      tl.to(leftTextRef.current, {
        x: -100,
        opacity: 0,
        scale: 0.8,
        ease: "power2.inOut",
        immediateRender: false
      }, 0);

      tl.to(rightTextRef.current, {
        x: 100,
        opacity: 0,
        scale: 0.8,
        ease: "power2.inOut",
        immediateRender: false
      }, 0);

      // Force refresh to ensure positions are correct
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  }, []);

  return (
    <section ref={heroRef} id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      
      {/* Left Text */}
      <div ref={leftTextRef} style={{ zIndex: 10, paddingLeft: '5vw' }}>
        <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', color: '#a259ff', fontWeight: 300, marginBottom: '0.5rem', fontFamily: 'Geist', letterSpacing: '2px', marginLeft: '50px', textShadow: '0 0 15px rgba(162, 89, 255, 0.6), 0 0 30px rgba(162, 89, 255, 0.4)' }}>Hello! I'm</p>
        <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.9, letterSpacing: '-2px', textShadow: '0 0 60px rgba(255, 255, 255, 0.15)' }}>
          ATHARV<br/>KADRE
        </h1>
      </div>

      {/* Right Text */}
      <div ref={rightTextRef} style={{ zIndex: 10, paddingRight: '5vw', textAlign: 'right', position: 'relative' }}>
        <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', color: '#a259ff', fontWeight: 300, marginBottom: '0.5rem', fontFamily: 'Geist', letterSpacing: '2px', textShadow: '0 0 15px rgba(162, 89, 255, 0.6), 0 0 30px rgba(162, 89, 255, 0.4)' }}>A Creative</p>
        
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.9, letterSpacing: '-2px', 
            position: 'absolute', top: '-20px', right: 0,
            color: '#a259ff', opacity: 0.5, filter: 'blur(3px)', zIndex: 1, whiteSpace: 'nowrap'
          }}>
            <div className="roll-container">
              <div className="roll-text-wrapper">
                <span>CYBER SEC</span>
                <span>DEVELOPER</span>
                <span>CYBER SEC</span>
              </div>
            </div>
          </h1>

          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.9, letterSpacing: '-2px', position: 'relative', zIndex: 2, whiteSpace: 'nowrap' }}>
            <div className="roll-container">
              <div className="roll-text-wrapper">
                <span style={{ color: '#fff', textShadow: '0 0 60px rgba(255, 255, 255, 0.15)' }}>DEVELOPER</span>
                <span style={{ color: '#fff', textShadow: '0 0 60px rgba(255, 255, 255, 0.15)' }}>CYBER SEC</span>
                <span style={{ color: '#fff', textShadow: '0 0 60px rgba(255, 255, 255, 0.15)' }}>DEVELOPER</span>
              </div>
            </div>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
