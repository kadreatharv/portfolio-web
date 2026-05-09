import React, { useRef } from "react";
import "./styles/Career.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(".career-timeline", {
        scrollTrigger: {
          trigger: ".career-info",
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
        maxHeight: "100%",
      });
    },
    { scope: container }
  );

  return (
    <section className="career-section" id="career" ref={container}>
      <h2>
        My <span>achievements & experience</span>
      </h2>
      <div className="career-container">
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Open Source Contributor</h4>
                <h5>GitHub Community</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Actively contributing to security-focused repositories and web frameworks. 
              Collaborating with global developers to improve code security.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathon Runner Up</h4>
                <h5>Code Srijan 2026</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Secured Runner Up position for developing an AI-driven threat detection system. 
              Successfully demonstrated real-time vulnerability scanning.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Core Team Member</h4>
                <h5>Tech Community</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading technical workshops on DevOps and Cyber Security. 
              Mentoring peers and building high-impact community projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
