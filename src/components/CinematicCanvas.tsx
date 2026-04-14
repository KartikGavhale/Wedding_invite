"use client";

import { Canvas } from "@react-three/fiber";
import { 
  Environment, 
  Stars, 
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicCanvas() {
  return (
    <div className="fixed inset-0 -z-40 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 50,
        }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Stars 
          radius={50} 
          depth={50} 
          count={3000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
      </Canvas>
    </div>
  );
}
