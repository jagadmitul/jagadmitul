"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Mesh } from "three";
import { useReducedMotion } from "@/lib/reduced-motion";

/**
 * Active 3D layer that sits on top of the global CSS ambient gradient.
 * Three blobs whose colors follow the active palette via three CSS
 * variables (--ambient-1/2/3) — keeps the dark-mode gradient feel from
 * the original portfolio AND lets each theme retint the WebGL layer too.
 */

function rgbStringToHex(rgbCsv: string): string {
  const parts = rgbCsv.split(",").map((s) => parseInt(s.trim(), 10));
  if (parts.length < 3 || parts.some(Number.isNaN)) return "#4770ff";
  const [r, g, b] = parts;
  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function readPaletteColors(): { c1: string; c2: string; c3: string } {
  if (typeof document === "undefined") {
    return { c1: "#4770ff", c2: "#FF7A5A", c3: "#7A5AFF" };
  }
  const style = getComputedStyle(document.documentElement);
  return {
    c1: rgbStringToHex(style.getPropertyValue("--ambient-1")),
    c2: rgbStringToHex(style.getPropertyValue("--ambient-2")),
    c3: rgbStringToHex(style.getPropertyValue("--ambient-3")),
  };
}

function Blob({
  color,
  position,
  scale,
  speed = 1,
}: {
  color: string;
  position: [number, number, number];
  scale: number;
  speed?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.pointer;
    ref.current.position.x = position[0] + t.x * 0.6;
    ref.current.position.y = position[1] + t.y * 0.6;
  });
  return (
    <Float speed={1.3 * speed} rotationIntensity={0.6} floatIntensity={1.6}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={0.55}
          speed={1.6}
          roughness={0.18}
          metalness={0.5}
          opacity={0.9}
          transparent
        />
      </mesh>
    </Float>
  );
}

export function Background3D() {
  const reduced = useReducedMotion();
  const [colors, setColors] = useState(readPaletteColors());

  useEffect(() => {
    const update = () => setColors(readPaletteColors());
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-palette"],
    });
    return () => observer.disconnect();
  }, []);

  if (reduced) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 1, filter: "blur(36px)", opacity: 0.95 }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[3, 4, 3]} intensity={1.5} />
        <directionalLight position={[-3, -2, 2]} intensity={0.85} color={colors.c1} />
        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
          <Blob color={colors.c2} position={[4.5, 2.5, 0]} scale={3.4} speed={0.7} />
          <Blob color={colors.c3} position={[-4.5, -2.5, -1]} scale={3.6} speed={0.9} />
          <Blob color={colors.c1} position={[0, 0, -2]} scale={3.0} speed={1.1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
