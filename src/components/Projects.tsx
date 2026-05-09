import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Fraud Detection AI",
    desc: "Real-time crypto fraud detection using Neural Networks.",
    tech: "Python / React",
    num: "01"
  },
  {
    title: "Expense Tracker",
    desc: "Android application with graphical representations.",
    tech: "Android / Java",
    num: "02"
  },
  {
    title: "Student System",
    desc: "Console-based application for efficient data management.",
    tech: "C / C++",
    num: "03"
  },
  {
    title: "Awwwards Portfolio",
    desc: "Premium 3D portfolio featuring WebGL and Smooth Scroll.",
    tech: "Three.js / GSAP",
    num: "04"
  }
];

const Projects: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && containerRef.current) {
      const pinDistance = containerRef.current.offsetWidth - window.innerWidth;
      
      gsap.to(containerRef.current, {
        x: -pinDistance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${pinDistance}`,
          pin: true,
          scrub: 1,
        }
      });
    }
  }, []);

  return (
    <section id="projects" style={{ padding: 0, backgroundColor: '#030303', zIndex: 2 }}>
      <div ref={wrapperRef} className="horizontal-scroll-wrapper">
        <div style={{ position: 'absolute', top: '10vh', left: '4vw' }}>
          <h2 style={{ fontSize: '2rem', color: '#666' }}>Selected Works</h2>
        </div>
        <div ref={containerRef} className="horizontal-scroll-container">
          {projects.map((proj, idx) => (
            <div key={idx} className="project-card">
              <div className="project-number">{proj.num}</div>
              <div>
                <h3 style={{ fontSize: '3rem', marginBottom: '1rem', textTransform: 'uppercase' }}>{proj.title}</h3>
                <p style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '2rem' }}>{proj.desc}</p>
                <div style={{ fontSize: '1rem', color: 'var(--accent-color)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  {proj.tech}
                </div>
              </div>
            </div>
          ))}
          {/* Spacer at the end for padding */}
          <div style={{ width: '4vw' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
