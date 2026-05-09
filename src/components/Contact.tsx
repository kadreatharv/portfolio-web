import React, { useRef } from 'react';
import gsap from 'gsap';

const Contact: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  const handleMouseEnter = () => {
    gsap.to(textRef.current, { scale: 1.05, color: '#ff3366', duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(textRef.current, { scale: 1, color: '#fff', duration: 0.3 });
  };

  return (
    <section id="contact" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', zIndex: 2 }}>
      <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '3px' }}>Got an Idea?</p>
      
      <a href="mailto:atharvkadre@email.com" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <h1 ref={textRef} style={{ fontSize: 'clamp(3rem, 10vw, 10rem)', lineHeight: 1, textAlign: 'center', cursor: 'none' }}>
          LET'S TALK
        </h1>
      </a>

      <div style={{ display: 'flex', gap: '3rem', marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem', width: '80%', justifyContent: 'center' }}>
        <a href="https://linkedin.com/in/atharv-kadre-01485b27b" target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>LinkedIn</a>
        <a href="https://github.com/kadreatharv" target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>GitHub</a>
        <a href="tel:+919589531984" style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>+91 95895 31984</a>
      </div>
      
      <p style={{ position: 'absolute', bottom: '2rem', color: '#444', fontSize: '0.9rem' }}>
        © 2026 Atharv Kadre. Crafted with React & WebGL.
      </p>
    </section>
  );
};

export default Contact;
