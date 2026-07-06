'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';
import Bottle3D from './Bottle3D';
import type { Flavor } from '@/lib/products';

interface CardBottleProps {
  flavor: Flavor;
}

export default function CardBottle({ flavor }: CardBottleProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* No background color — transparent, CSS white shows through */}
        <ambientLight intensity={1.2} />
        <hemisphereLight args={['#ffffff', '#f0f0f0', 0.8]} />
        <spotLight position={[5, 8, 5]} angle={0.35} penumbra={1} intensity={3.5} color="#ffffff" />
        <spotLight position={[-5, 5, 3]} angle={0.4} penumbra={1} intensity={2.5} color={flavor.accent} />
        <directionalLight position={[0, 5, 5]} intensity={2.5} color="#ffffff" />

        <Bottle3D
          colorFrom={flavor.colorFrom}
          colorTo={flavor.colorTo}
          flavorName={flavor.name}
          floatSpeed={0.8}
          interactive={false}
        />

        <ContactShadows
          position={[0, -2.3, 0]}
          opacity={0.06}
          scale={6}
          blur={2.5}
          far={4}
          color="#999999"
        />

        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
