'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicPanelProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  lines: string[];
  color?: string;
}

function HolographicPanel({
  position,
  rotation = [0, 0, 0],
  title,
  lines,
  color = '#d4a574',
}: HolographicPanelProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[2.2, 1.4]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Border */}
      <mesh position={[0, 0, 0.001]}>
        <ringGeometry args={[1.05, 1.1, 4]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <Text
        position={[0, 0.4, 0.01]}
        fontSize={0.14}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.003}
        outlineColor="#000000"
      >
        {title}
      </Text>
      {lines.map((line, i) => (
        <Text
          key={i}
          position={[0, 0.15 - i * 0.18, 0.01]}
          fontSize={0.09}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.002}
          outlineColor="#000000"
        >
          {line}
        </Text>
      ))}
    </group>
  );
}

interface HolographicUIProps {
  panels?: HolographicPanelProps[];
}

export default function HolographicUI({
  panels = [
    {
      position: [-2.5, 1, 0],
      title: 'ARTISANAL',
      lines: ['Infusion naturelle', 'Fruits sélectionnés', 'Sans colorants'],
      color: '#d4a574',
    },
    {
      position: [2.5, -0.5, 0],
      title: 'DON PEPER',
      lines: ['Rhum arrangé', 'Recette unique', 'Édition limitée'],
      color: '#ff006e',
    },
  ],
}: HolographicUIProps) {
  return (
    <group>
      {panels.map((panel, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.3}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <HolographicPanel {...panel} />
        </Float>
      ))}
    </group>
  );
}
