import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      // Title Parallax
      gsap.fromTo(titleRef.current, 
        { x: 100, opacity: 0 },
        { 
          x: 0, opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          }
        }
      );

      // Text Reveal with Skew
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 100, skewY: 5 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 90%",
            }
          }
        );

        // Continuous Parallax
        gsap.to(textRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }

    // Marquee Animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2 }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '6vw' }}>
        <div style={{ width: '42%', textAlign: 'left' }}>
          <h2 ref={titleRef} className="glow-title" style={{ fontSize: '3rem', color: '#a259ff', marginBottom: '3rem', letterSpacing: '6px', fontWeight: 900 }}>ABOUT ME</h2>
          <p ref={textRef} style={{ fontSize: '2.2rem', lineHeight: 1.5, fontWeight: 400, color: '#fff' }}>
            I am a motivated <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>Computer Science Engineering</span> undergraduate currently pursuing my B.Tech at <span style={{ color: 'var(--accent-color)' }}>Jaypee University of Engineering & Technology, Guna</span>.
            <br /><br />
            My core interests lie in <span style={{ color: '#a259ff', fontWeight: 600 }}>Cyber Security</span>, <span style={{ color: '#a259ff', fontWeight: 600 }}>DevOps</span>, and <span style={{ color: '#a259ff', fontWeight: 600 }}>Web Development</span>. I enjoy the intersection of building secure, scalable systems and crafting intuitive user interfaces.
            <br /><br />
            Currently, I am <span style={{ fontStyle: 'italic', borderBottom: '2px solid var(--accent-color)' }}>seeking a technical internship</span> to apply my knowledge of programming, data structures, and problem-solving skills while gaining hands-on industry experience.
          </p>
        </div>
      </div>
    </section>




  );
};

export default About;
