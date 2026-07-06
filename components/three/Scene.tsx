'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
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
      {/* Explicit bright background color in 3D scene */}
      <color attach="background" args={['#fff0e0']} />

      {/* Heavy bright lighting */}
      <ambientLight intensity={1.2} />
      <hemisphereLight args={['#fff5e6', '#ffd9c4', 0.8]} />
      <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={4} color="#ffffff" />
      <spotLight position={[-5, 5, -5]} angle={0.4} penumbra={1} intensity={3} color={flavor?.accent ?? '#ff8866'} />
      <directionalLight position={[0, 5, 5]} intensity={2.5} color="#fff5e8" />
      <directionalLight position={[-3, 2, -3]} intensity={1.5} color="#ffccaa" />
      <pointLight position={[0, 0, 5]} intensity={2.5} color="#ffffff" distance={15} />

      <ParticleField color={particleColor ?? flavor?.accent ?? '#b8732e'} count={1500} />

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
              color: flavor?.accent ?? '#b8732e',
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
        opacity={0.12}
        scale={10}
        blur={2}
        far={5}
        color="#8a7460"
      />

      <Environment preset="studio" />

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
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color('#fff0e0');
        scene.fog = new THREE.Fog('#fff0e0', 15, 30);
      }}
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
