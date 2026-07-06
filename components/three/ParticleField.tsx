'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
}

export default function ParticleField({
  count = 1200,
  color = '#b8732e',
  size = 0.04,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = Math.random() * 20 - 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = Math.random() * 0.01 + 0.003;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions, velocities };
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const positionArray = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positionArray[i3] += velocities[i3];
      positionArray[i3 + 1] += velocities[i3 + 1];
      positionArray[i3 + 2] += velocities[i3 + 2];

      if (positionArray[i3 + 1] > 10) {
        positionArray[i3 + 1] = -10;
        positionArray[i3] = (Math.random() - 0.5) * 30;
        positionArray[i3 + 2] = (Math.random() - 0.5) * 30;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
