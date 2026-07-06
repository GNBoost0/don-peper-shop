'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Bottle3DProps {
  colorFrom?: string;
  colorTo?: string;
  liquidLevel?: number;
  floatSpeed?: number;
  interactive?: boolean;
}

export default function Bottle3D({
  colorFrom = '#ff006e',
  colorTo = '#ff4d8d',
  liquidLevel = 0.7,
  floatSpeed = 1,
  interactive = false,
}: Bottle3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  const fromColor = useMemo(() => new THREE.Color(colorFrom), [colorFrom]);
  const toColor = useMemo(() => new THREE.Color(colorTo), [colorTo]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3 * floatSpeed;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * floatSpeed) * 0.15;

      if (interactive) {
        const targetX = state.pointer.y * 0.15;
        const targetZ = state.pointer.x * 0.1;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -targetZ, 0.05);
      }
    }

    if (liquidRef.current) {
      const material = liquidRef.current.material as THREE.MeshStandardMaterial;
      const t = state.clock.elapsedTime;
      const lerpVal = (Math.sin(t * 0.5) + 1) / 2;
      material.color.lerpColors(fromColor, toColor, lerpVal);
      material.emissive.lerpColors(fromColor, toColor, lerpVal);
    }
  });

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x88aaff,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.95,
        thickness: 0.3,
        ior: 1.45,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.35,
      }),
    []
  );

  const bottleHeight = 3;
  const liquidHeight = bottleHeight * liquidLevel;

  return (
    <group ref={groupRef} dispose={null}>
      {/* Bottle body - main cylinder */}
      <mesh material={glassMaterial} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.6, bottleHeight, 48, 1]} />
      </mesh>

      {/* Bottle bottom */}
      <mesh material={glassMaterial} position={[0, -bottleHeight / 2, 0]}>
        <sphereGeometry args={[0.6, 48, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
      </mesh>

      {/* Bottle top narrowing */}
      <mesh material={glassMaterial} position={[0, bottleHeight / 2 + 0.3, 0]}>
        <cylinderGeometry args={[0.22, 0.55, 0.8, 48, 1]} />
      </mesh>

      {/* Neck */}
      <mesh material={glassMaterial} position={[0, bottleHeight / 2 + 0.75, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 32, 1]} />
      </mesh>

      {/* Cap */}
      <mesh position={[0, bottleHeight / 2 + 1.0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.25, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Liquid inside */}
      <mesh ref={liquidRef} position={[0, -bottleHeight / 2 + liquidHeight / 2, 0]}>
        <cylinderGeometry args={[0.52, 0.57, liquidHeight, 48, 1]} />
        <meshStandardMaterial
          color={fromColor}
          emissive={fromColor}
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Label */}
      <mesh position={[0, -0.2, 0.561]}>
        <planeGeometry args={[0.7, 1.0]} />
        <meshStandardMaterial color="#0a0612" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Label gold accent */}
      <mesh position={[0, 0.2, 0.562]}>
        <planeGeometry args={[0.5, 0.08]} />
        <meshStandardMaterial
          color="#d4a574"
          emissive="#d4a574"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow ring at bottom */}
      <mesh position={[0, -bottleHeight / 2 - 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 1.2, 64]} />
        <meshBasicMaterial
          color={colorFrom}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point light for glow */}
      <pointLight position={[0, 0, 2]} color={colorFrom} intensity={2} distance={8} />
      <pointLight position={[0, -1, 0]} color={colorTo} intensity={1.5} distance={5} />
    </group>
  );
}
