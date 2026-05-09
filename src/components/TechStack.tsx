import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Text,
  Environment,
} from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Icons = () => {
  const icons = [
    { text: "C", color: "#A8B9CC" },
    { text: "C++", color: "#00599C" },
    { text: "Python", color: "#3776AB" },
    { text: "NumPy", color: "#013243" },
    { text: "Pandas", color: "#150458" },
    { text: "HTML", color: "#E34F26" },
    { text: "CSS", color: "#1572B6" },
    { text: "JavaScript", color: "#F7DF1E" },
    { text: "React", color: "#61DAFB" },
    { text: "DSA", color: "#FF4500" },
    { text: "OOP", color: "#4B0082" },
    { text: "OS", color: "#2F4F4F" },
    { text: "DBMS", color: "#008080" },
    { text: "Git", color: "#F05032" },
    { text: "GitHub", color: "#FFFFFF" },
    { text: "VS Code", color: "#007ACC" },
    { text: "MySQL", color: "#4479A1" },
    { text: "Linux", color: "#FCC624" },
    { text: "Jupyter", color: "#F37626" },
  ];

  return (
    <>
      {icons.map((icon, i) => {
        const rigidBodyRef = React.useRef<any>(null);

        const handlePointerOver = () => {
          if (rigidBodyRef.current) {
            rigidBodyRef.current.applyImpulse({
              x: (Math.random() - 0.5) * 15,
              y: 20,
              z: (Math.random() - 0.5) * 10
            }, true);
          }
        };

        useEffect(() => {
          ScrollTrigger.create({
            trigger: "#tech",
            start: "top 80%",
            onEnter: () => {
              if (rigidBodyRef.current) {
                rigidBodyRef.current.setTranslation({ x: (Math.random() - 0.5) * 6, y: 18, z: 0 }, true);
                rigidBodyRef.current.setLinvel({ x: 0, y: -2, z: 0 }, true);
              }
            },
            onLeaveBack: () => {
              if (rigidBodyRef.current) {
                rigidBodyRef.current.applyImpulse({ x: 0, y: 50, z: 0 }, true);
              }
            }
          });
        }, []);

        return (
          <RigidBody
            key={i}
            ref={rigidBodyRef}
            // Use random X and Z to prevent vertical towers
            position={[(Math.random() - 0.5) * 10, 18 + i * 2, (Math.random() - 0.5) * 2]}
            colliders="cuboid"
            restitution={0.4} 
            friction={0.8}
            lockRotations={true}
          >
            <Float speed={1.5} rotationIntensity={0} floatIntensity={0.2}>
              <mesh onPointerOver={handlePointerOver}>
                {/* Smaller boxes to avoid clutter */}
                <boxGeometry args={[icon.text.length > 8 ? 2.2 : 1.6, 0.7, 0.4]} />
                <meshPhysicalMaterial
                  transparent
                  opacity={0.9}
                  roughness={0.2}
                  metalness={0.5}
                  transmission={0.3}
                  thickness={0.2}
                  color={icon.color}
                />
                <Text
                  position={[0, 0, 0.22]} // Move text clearly in front
                  fontSize={icon.text.length > 8 ? 0.2 : 0.28}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  fontWeight="900"
                  // Add a shadow/outline to make it pop
                  outlineWidth={0.02}
                  outlineColor="#000000"
                >
                  {icon.text}
                </Text>
              </mesh>
            </Float>
          </RigidBody>
        );
      })}
    </>
  );
};

const TechStack = () => {
  return (
    <section className="tech-section" id="tech" style={{ height: "100vh", position: "relative" }}>
      <h2 style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        fontSize: "5rem", zIndex: 1, pointerEvents: "none", mixBlendMode: "difference"
      }}>
        My <span style={{ color: "var(--accent-color)" }}>Techstack</span>
      </h2>
      <Canvas
        camera={{ position: [0, 3, 8], fov: 35 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 13, 10]} intensity={1} />
            <Icons />
            <Environment preset="city" />
            {/* Floor */}
            <RigidBody type="fixed" position={[0, 0, 0]}>
              <mesh>
                <boxGeometry args={[20, 0.5, 10]} />
                <meshStandardMaterial transparent opacity={0} />
              </mesh>
            </RigidBody>
            {/* Walls */}
            <RigidBody type="fixed" position={[-5, 3, 0]}>
              <mesh><boxGeometry args={[0.5, 10, 10]} /><meshStandardMaterial transparent opacity={0} /></mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[5, 3, 0]}>
              <mesh><boxGeometry args={[0.5, 10, 10]} /><meshStandardMaterial transparent opacity={0} /></mesh>
            </RigidBody>
          </Physics>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 13, 10]} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default TechStack;
