import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, useAnimations, useProgress, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// This is a placeholder for the actual Avatar.
// When you get your ReadyPlayerMe .glb file, place it in /public/avatar.glb
// and uncomment the useGLTF lines below.

const PurpleParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = React.useState(() => {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const r = 10;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a259ff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const RealAvatar = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Load the user's avatar and its animations
  const { scene, animations, nodes } = useGLTF('/avatar.glb') as any;

  // Setup animation mixer
  const { actions } = useAnimations(animations, groupRef);

  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Play the first animation (usually Idle)
      const actionName = Object.keys(actions)[0];
      actions[actionName]?.play();
    }
  }, [actions]);

  // Global mouse tracking (Foolproof even with pointerEvents: none)
  const mouse = useRef({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      const progress = scrollY / height;
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (scrollProgress > 3.5) return; // Stop rendering/updates when far off-screen
    if (groupRef.current) {
      // 1. Mouse coordinates from global listener
      // We multiply by (1 - scrollProgress) to disable tracking as we reach the About section
      const trackingFactor = Math.max(0, 1 - scrollProgress * 1.5);
      const targetX = ((mouse.current.x * Math.PI) / 2.5) * trackingFactor;
      const targetY = ((mouse.current.y * Math.PI) / 4) * trackingFactor;

      // 2. Scroll-based position & scale
      // Hero: X = -0.4 | About: X = -1.8 | WhatIDo: X = -2.3 | Career: Slide Out
      let currentX, currentScale, currentY, baseRotationOffset, currentOpacity = 1;

      if (scrollProgress <= 1) {
        // Section 1: Hero -> About
        currentX = THREE.MathUtils.lerp(-0.4, -1.8, scrollProgress);
        currentScale = THREE.MathUtils.lerp(5.5, 4.5, scrollProgress);
        currentY = THREE.MathUtils.lerp(-8.5, -7.2, scrollProgress);
        baseRotationOffset = THREE.MathUtils.lerp(0.6, 1.4, scrollProgress);
      } else if (scrollProgress <= 2) {
        // Section 2: About -> WhatIDo
        const p = Math.min(scrollProgress - 1, 1);
        currentX = THREE.MathUtils.lerp(-1.8, -2.3, p);
        currentScale = 4.5;
        currentY = -7.2;
        baseRotationOffset = 1.4;
      } else {
        // Section 3: WhatIDo -> Out (Page 4+)
        const p = Math.min(scrollProgress - 2, 1);
        currentX = THREE.MathUtils.lerp(-2.3, -8, p); // Slide far left
        currentScale = THREE.MathUtils.lerp(4.5, 3.5, p);
        currentY = -7.2;
        baseRotationOffset = 1.4;
      }

      groupRef.current.position.x = currentX;
      groupRef.current.position.y = currentY;
      groupRef.current.scale.setScalar(currentScale);

      groupRef.current.rotation.y = baseRotationOffset;
      groupRef.current.rotation.x = 0;

      // 4. Scan for Blinking and Head Bones
      scene.traverse((child: any) => {
        // Blinking logic (Keep it always active)
        if (child.morphTargetInfluences && child.morphTargetDictionary) {
          const blink = (state.clock.elapsedTime % 2.0 < 0.12) ? 1 : 0;
          for (let i = 0; i < child.morphTargetInfluences.length; i++) {
            child.morphTargetInfluences[i] = blink;
          }
        }

        // Head/Neck Bone follow (Fades out with scrollProgress)
        if (child.isBone && (child.name.toLowerCase().includes('head') || child.name.toLowerCase().includes('neck'))) {
          child.rotation.set(0, 0, 0);
          child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, targetX, 0.25);
          child.rotation.x = THREE.MathUtils.lerp(child.rotation.x, -targetY, 0.25);
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[-0.4, -8.5, 0]} scale={[5.5, 5.5, 5.5]}>
      <primitive object={scene} />
    </group>
  );
};

// Preload the avatar for performance
useGLTF.preload('/avatar.glb');

const AvatarCanvas: React.FC = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas 
        camera={{ position: [0, 1, 5], fov: 45 }} 
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        {/* Soft Global Ambiance */}
        <ambientLight intensity={0.4} />

        {/* Key Light - Soft Warm/Neutral */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        {/* CINEMATIC RIM LIGHTING SETUP */}

        {/* 1. Deep Red Rim Light (Left) */}
        <spotLight
          position={[-8, 5, -5]}
          angle={0.6}
          penumbra={1}
          intensity={80}
          color="#ff003c"
          distance={25}
        />

        {/* 2. Neon Purple Rim Light (Right) */}
        <spotLight
          position={[8, 5, -5]}
          angle={0.6}
          penumbra={1}
          intensity={100}
          color="#a855f7"
          distance={25}
        />

        {/* 3. Soft Magenta Top/Back Light for Hair/Cap edge */}
        <pointLight
          position={[0, 10, -3]}
          intensity={50}
          color="#ff2d75"
          distance={15}
        />

        {/* ATMOSPHERIC BACKGLOW - Creates the halo/bloom feel behind the model */}
        <pointLight
          position={[0, 2, -4]}
          intensity={150}
          color="#a855f7"
          distance={15}
          decay={2}
        />

        {/* Subtle Bottom Fill to avoid pitch black shadows on torso */}
        <pointLight
          position={[0, -5, 2]}
          intensity={20}
          color="#a259ff"
          distance={10}
        />

        <Environment preset="city" />
        <PurpleParticles />
        <React.Suspense fallback={null}>
          <RealAvatar />
        </React.Suspense>
      </Canvas>
    </div>
  );
};


export default AvatarCanvas;
