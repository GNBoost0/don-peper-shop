'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, AdaptiveDpr } from '@react-three/drei';
import ParticleField from './ParticleField';
import Bottle3D from './Bottle3D';
import HolographicUI from './HolographicUI';
import type { Flavor } from '@/lib/products';

interface SceneProps {
  flavor?: Flavor;
  showBottle?: boolean;
  showHolograms?: boolean;
  interactive?: boolean;
  particleColor?: string;
  enableOrbit?: boolean;
}

function SceneContent({
  flavor,
  showBottle = true,
  showHolograms = false,
  interactive = false,
  particleColor,
}: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.9} />
      <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={3} color="#ffffff" />
      <spotLight position={[-5, 5, -5]} angle={0.4} penumbra={1} intensity={2} color={flavor?.accent ?? '#ff006e'} />
      <directionalLight position={[0, 5, 5]} intensity={2} color="#fff5e8" />
      <pointLight position={[0, 0, 5]} intensity={2} color="#ffffff" distance={15} />

      <ParticleField color={particleColor ?? flavor?.accent ?? '#c08c5a'} count={1500} />

      {showBottle && (
        <Bottle3D
          colorFrom={flavor?.colorFrom ?? '#ff006e'}
          colorTo={flavor?.colorTo ?? '#ff4d8d'}
          flavorName={flavor?.name ?? ''}
          interactive={interactive}
          floatSpeed={interactive ? 0.5 : 1}
        />
      )}

      {showHolograms && (
        <HolographicUI
          panels={[
            {
              position: [-2.8, 1.2, 0],
              title: flavor?.name.toUpperCase() ?? 'DON PEPER',
              lines: ['Rhum infusé', 'Artisanal', 'Premium'],
              color: flavor?.accent ?? '#c08c5a',
            },
            {
              position: [2.8, -0.3, 0],
              title: 'CARACTÈRE',
              lines: ['75cl / 1L / 10cl', 'Infusion 3 mois', 'Production limitée'],
              color: flavor?.colorFrom ?? '#ff006e',
            },
          ]}
        />
      )}

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.15}
        scale={10}
        blur={2}
        far={5}
        color="#2a1f15"
      />

      <Environment preset="apartment" />

      <AdaptiveDpr pixelated />
    </>
  );
}

export default function Scene({
  flavor,
  showBottle = true,
  showHolograms = false,
  interactive = false,
  particleColor,
  enableOrbit = false,
}: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneContent
          flavor={flavor}
          showBottle={showBottle}
          showHolograms={showHolograms}
          interactive={interactive}
          particleColor={particleColor}
        />
        {enableOrbit && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={4}
            maxDistance={12}
            autoRotate={false}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
