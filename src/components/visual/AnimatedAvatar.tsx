"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import type { Mesh } from "three";
import { useReducedMotion } from "@/lib/reduced-motion";

function Orb({ accent }: { accent: string }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.45;
    ref.current.rotation.x += delta * 0.25;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 16]} />
      <MeshDistortMaterial
        color={accent}
        distort={0.35}
        speed={1.8}
        roughness={0.18}
        metalness={0.6}
      />
    </mesh>
  );
}

/**
 * Replaces the flat "M" placeholder in the IntroCard with a real animated
 * 3D distorted orb that re-tints when the visitor switches palette. Falls
 * back to a static gradient block under reduced motion.
 */
export function AnimatedAvatar() {
  const reduced = useReducedMotion();
  const [accent, setAccent] = useState("#4770ff");

  useEffect(() => {
    const update = () => {
      const computed = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      if (computed) setAccent(computed);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-palette"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="aspect-[6/4] overflow-hidden rounded-lg relative bg-gradient-to-br from-primary/15 via-paper to-primary/5">
      {reduced ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-7xl font-semibold text-primary/40">M</div>
        </div>
      ) : (
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 4, 3]} intensity={1.6} />
          <directionalLight position={[-3, -2, 2]} intensity={0.6} color="#ffffff" />
          <Suspense fallback={null}>
            <Orb accent={accent} />
          </Suspense>
        </Canvas>
      )}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-2/90 backdrop-blur px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-wider text-ink">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          OPEN TO WORK
        </span>
      </div>
    </div>
  );
}
