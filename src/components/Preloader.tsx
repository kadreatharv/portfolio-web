import React, { useEffect, useState, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { progress: actualProgress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const isDoneRef = useRef(false);

  // Smoothly interpolate display progress
  useEffect(() => {
    let interval: any;
    if (displayProgress < 100) {
      interval = setInterval(() => {
        setDisplayProgress((prev) => {
          // If model is actually loaded, speed up to 100
          if (actualProgress === 100) return Math.min(100, prev + 10);
          // Otherwise, crawl up to 99
          if (prev < 99) return prev + 1;
          return prev;
        });
      }, actualProgress === 100 ? 50 : 100);
    }
    return () => clearInterval(interval);
  }, [actualProgress, displayProgress]);

  useEffect(() => {
    // Finish when both actual and display progress are 100
    if (actualProgress === 100 && displayProgress >= 100 && !isDoneRef.current) {
      isDoneRef.current = true;
      
      // Animate out
      gsap.to(preloaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.2,
        onComplete: onComplete
      });
    }
  }, [actualProgress, displayProgress, onComplete]);

  // Force finish after 10 seconds as a fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDoneRef.current) {
        setDisplayProgress(100);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={preloaderRef} className="preloader" style={{ backgroundColor: '#e2e0e5' }}>
      <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', width: '100vw', overflow: 'hidden' }}>
         <div className="marquee-container">
           <h1 style={{ fontSize: '8vw', color: '#111', whiteSpace: 'nowrap', opacity: 0.8, margin: 0, paddingRight: '3vw' }}>
              MOTIVATED AND PASSIONATE MACHINE LEARNING ENTHUSIAST &bull;
           </h1>
           <h1 style={{ fontSize: '8vw', color: '#111', whiteSpace: 'nowrap', opacity: 0.8, margin: 0, paddingRight: '3vw' }}>
              MOTIVATED AND PASSIONATE MACHINE LEARNING ENTHUSIAST &bull;
           </h1>
         </div>
      </div>

      <div className="preloader-pill" style={{ zIndex: 10 }}>
        <span>LOADING</span>
        <span>{Math.round(displayProgress)}%</span>
        <div className="preloader-bar-bg">
          <div className="preloader-bar-fill" style={{ width: `${displayProgress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
