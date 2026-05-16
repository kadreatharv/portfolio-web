import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'CYBER SECURITY',
    subtitle: 'Security & Pentesting',
    description: 'Identifying vulnerabilities and securing digital assets. Ethical hacking, network security, and robust defense.',
    tags: ['WIRESHARK', 'METASPLOIT'],
    icon: 'fi fi-rr-shield-check',
    color: '#ff003c',
    rgb: '255, 0, 60',
    learningStage: 'Advanced',
    progress: 85
  },
  {
    title: 'DEVOPS',
    subtitle: 'Automation & Scale',
    description: 'Streamlining workflows through CI/CD and containerization. Optimizing system reliability at scale.',
    tags: ['DOCKER', 'CI/CD'],
    icon: 'fi fi-rr-settings',
    color: '#a259ff',
    rgb: '162, 89, 255',
    learningStage: 'Intermediate',
    progress: 65
  },
  {
    title: 'WEB DEVELOPMENT',
    subtitle: 'Full-Stack Experiences',
    description: 'Crafting responsive, high-performance web apps. Blending frameworks with creative 3D elements.',
    tags: ['REACT', 'THREE.JS'],
    icon: 'fi fi-rr-browser',
    color: '#fff',
    rgb: '255, 255, 255',
    learningStage: 'Advanced',
    progress: 90
  }
];

const WhatIDo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (sectionRef.current) {
      // 1. Entry Animation (Wave/Stagger)
      gsap.fromTo(cardsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      // 2. Title Scroll Effect (Parallax out)
      gsap.to(".what-i-do-title", {
        y: -80,
        opacity: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 3. Cards Scroll Movement (Subtle parallax, NO SKEW)
      gsap.to(cardsRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, []);

  const handleMouseEnter = (index: number) => {
    gsap.to(cardsRef.current[index], {
      scale: 1.15,
      y: -25,
      duration: 0.6,
      ease: "elastic.out(1.2, 0.5)",
      overwrite: true
    });
  };

  const handleMouseLeave = (index: number) => {
    gsap.to(cardsRef.current[index], {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true
    });
  };

  return (
    <section ref={sectionRef} id="work" style={{
      minHeight: '100vh',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 2,
      padding: '0 2vw',
      overflow: 'hidden'
    }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>

        {/* LEFT: SPACE FOR SEATED AVATAR */}
        <div style={{ flex: '0 0 35%', height: '80vh', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            bottom: '5%',
            left: '10%',
            width: '80%',
            height: '20px',
            background: 'radial-gradient(ellipse at center, rgba(162, 89, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(15px)',
            borderRadius: '50%'
          }}></div>
        </div>

        {/* CENTER: TYPOGRAPHY */}
        <div style={{ flex: '0 0 20%', textAlign: 'left', paddingLeft: '2vw' }}>
          <h3 className="glow-title" style={{
            fontSize: '0.9rem',
            color: '#a259ff',
            marginBottom: '0.5rem',
            letterSpacing: '8px',
            fontWeight: 600,
            opacity: 0.8
          }}>SERVICES</h3>
          <h1 className="what-i-do-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 0.9, color: '#fff', fontWeight: 900, letterSpacing: '-2px' }}>
            WHAT<br />
            I DO
          </h1>
        </div>

        {/* RIGHT: SERVICE CARDS */}
        <div style={{
          flex: '0 0 45%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5vh',
          paddingRight: '4vw',
          paddingTop: '5vh',
          justifyContent: 'flex-start',
          height: '100%'
        }}>

          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="service-card"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                '--card-accent': service.color,
                '--card-accent-rgb': service.rgb,
                padding: '1.2rem 1.8rem',
                borderRadius: '32px',
                borderWidth: '1px',
                transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease'
              } as React.CSSProperties}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.2rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `rgba(${service.rgb}, 0.05)`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: `1px solid rgba(${service.rgb}, 0.1)`
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: `rgba(${service.rgb}, 0.1)`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: service.color,
                    fontSize: '1.4rem'
                  }}>
                    <i className={service.icon}></i>
                  </div>
                </div>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px', textShadow: 'none' }}>{service.title}</h2>
                  <p style={{ color: service.color === '#fff' ? 'var(--accent-color)' : service.color, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 700 }}>{service.subtitle}</p>
                </div>
              </div>

              <p style={{ color: '#aaa', fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                {service.description}
              </p>

              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                {service.tags.map(tag => (
                  <span key={tag} className="skill-tag" style={{
                    margin: 0,
                    padding: '0.4rem 1rem',
                    fontSize: '0.7rem',
                    background: `rgba(${service.rgb}, 0.05)`,
                    color: service.color === '#fff' ? '#fff' : service.color,
                    border: `1px solid rgba(${service.rgb}, 0.1)`
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* LEARNING STAGE */}
              <div className="learning-stage" style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="learning-label" style={{ marginBottom: '0.8rem', fontSize: '0.7rem' }}>
                  <span>LEARNING STAGE</span>
                  <span style={{ color: service.color }}>{service.learningStage}</span>
                </div>
                <div className="progress-bar-container" style={{ height: '4px' }}>
                  <div className="progress-bar-fill" style={{
                    width: `${service.progress}%`,
                    background: `linear-gradient(90deg, ${service.color}, ${service.color === '#fff' ? '#aaa' : service.color + 'dd'})`,
                    boxShadow: `0 0 10px ${service.color === '#fff' ? 'rgba(255,255,255,0.3)' : service.color}`
                  }}></div>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>

  );
};

export default WhatIDo;
