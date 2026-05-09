import React, { useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".work-box", "skewX", "deg"),
        clamp = gsap.utils.clamp(-20, 20);

      const scroll = ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });

      gsap.to(".work-flex", {
        xPercent: -70,
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: "bottom -150%",
          scrub: 2,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        scroll.kill();
      };
    },
    { scope: container }
  );

  const projects = [
    {
      name: "SATA_CORE_AI",
      category: "Cyber Security / AI",
      tools: "React, Python, XGBoost, PostgreSQL",
      image: "/satacore.png",
      link: "https://run-time-error-final.vercel.app"
    },
    {
      name: "My Portfolio Web",
      category: "Web Development",
      tools: "React, Three.js, GSAP, Vite",
      image: "/portfolio_v1.png",
      link: "#"
    },
    {
      name: "SecureVault",
      category: "DevOps / Security",
      tools: "Docker, Kubernetes, AWS, Terraform",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2024&auto=format&fit=crop",
      link: "#"
    }
  ];

  return (
    <section className="work-section" id="work" ref={container}>
      <div className="work-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-title">
                <h3>0{index + 1}</h3>
                <div>
                  <h4>{project.name}</h4>
                  <p>{project.category}</p>
                </div>
              </div>
              <WorkImage image={project.image} link={project.link} />
              <div className="work-info">
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
