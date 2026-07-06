'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';
import Bottle3D from './Bottle3D';
import ParticleField from './ParticleField';
import type { Flavor } from '@/lib/products';

interface HeroSceneProps {
  flavor?: Flavor;
}

export default function HeroScene({ flavor }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Transparent background — let CSS white show through */}
        <ambientLight intensity={1.2} />
        <hemisphereLight args={['#ffffff', '#f0f0f0', 0.8]} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={4} color="#ffffff" />
        <spotLight position={[-5, 5, -5]} angle={0.4} penumbra={1} intensity={3} color={flavor?.accent ?? '#ff8866'} />
        <directionalLight position={[0, 5, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-3, 2, -3]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 0, 5]} intensity={2.5} color="#ffffff" distance={15} />

        <ParticleField color="#d4a574" count={1200} />

        <Bottle3D
          colorFrom={flavor?.colorFrom ?? '#ff006e'}
          colorTo={flavor?.colorTo ?? '#ff4d8d'}
          flavorName={flavor?.name ?? ''}
          floatSpeed={1}
        />

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.08}
          scale={10}
          blur={2}
          far={5}
          color="#999999"
        />

        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
