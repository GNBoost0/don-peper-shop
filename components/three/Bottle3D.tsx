'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
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
        color: 0xaaccff,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.92,
        thickness: 0.4,
        ior: 1.45,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.5,
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
        <meshStandardMaterial color="#2a1a3e" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Cap top accent */}
      <mesh position={[0, bottleHeight / 2 + 1.14, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.04, 32]} />
        <meshStandardMaterial color="#d4a574" metalness={0.9} roughness={0.15} emissive="#d4a574" emissiveIntensity={0.2} />
      </mesh>

      {/* Liquid inside */}
      <mesh ref={liquidRef} position={[0, -bottleHeight / 2 + liquidHeight / 2, 0]}>
        <cylinderGeometry args={[0.52, 0.57, liquidHeight, 48, 1]} />
        <meshStandardMaterial
          color={fromColor}
          emissive={fromColor}
          emissiveIntensity={0.6}
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Label background - brighter */}
      <mesh position={[0, -0.2, 0.561]}>
        <planeGeometry args={[0.72, 1.05]} />
        <meshStandardMaterial color="#1a1028" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Label border */}
      <mesh position={[0, -0.2, 0.562]}>
        <planeGeometry args={[0.74, 1.07]} />
        <meshBasicMaterial color="#d4a574" transparent opacity={0.4} />
      </mesh>

      {/* DON PEPER text on label */}
      <Text
        position={[0, 0.12, 0.57]}
        fontSize={0.11}
        color="#d4a574"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.004}
        outlineColor="#000000"
        letterSpacing={0.05}
        fontWeight="bold"
      >
        DON PEPER
      </Text>

      {/* Gold divider line under brand name */}
      <mesh position={[0, 0.0, 0.573]}>
        <planeGeometry args={[0.5, 0.015]} />
        <meshStandardMaterial
          color="#d4a574"
          emissive="#d4a574"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* "Rhum Infusé" subtitle */}
      <Text
        position={[0, -0.1, 0.57]}
        fontSize={0.045}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.002}
        outlineColor="#000000"
        letterSpacing={0.15}
      >
        RHUM INFUSE
      </Text>

      {/* Flavor name on label */}
      <Text
        position={[0, -0.28, 0.57]}
        fontSize={0.06}
        color={colorFrom}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.002}
        outlineColor="#000000"
        letterSpacing={0.08}
      >
        ARTISANAL
      </Text>

      {/* Small badge dots on label */}
      <mesh position={[-0.2, -0.45, 0.573]}>
        <circleGeometry args={[0.02, 16]} />
        <meshBasicMaterial color={colorFrom} />
      </mesh>
      <mesh position={[0, -0.45, 0.573]}>
        <circleGeometry args={[0.02, 16]} />
        <meshBasicMaterial color="#d4a574" />
      </mesh>
      <mesh position={[0.2, -0.45, 0.573]}>
        <circleGeometry args={[0.02, 16]} />
        <meshBasicMaterial color={colorTo} />
      </mesh>

      {/* Glow ring at bottom */}
      <mesh position={[0, -bottleHeight / 2 - 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 1.2, 64]} />
        <meshBasicMaterial
          color={colorFrom}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point lights for glow - boosted intensity */}
      <pointLight position={[0, 0, 2]} color={colorFrom} intensity={3} distance={10} />
      <pointLight position={[0, -1, 0]} color={colorTo} intensity={2.5} distance={6} />
      <pointLight position={[0, 2, 3]} color="#ffffff" intensity={1.5} distance={8} />
    </group>
  );
}
