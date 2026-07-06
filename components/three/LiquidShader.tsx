'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LiquidShaderProps {
  colorFrom?: string;
  colorTo?: string;
}

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;
    vec3 pos = position;
    pos.z += sin(pos.x * 4.0 + uTime * 2.0) * 0.05;
    pos.z += cos(pos.y * 3.0 + uTime * 1.5) * 0.03;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColorFrom;
  uniform vec3 uColorTo;

  void main() {
    float mixVal = (vUv.y + sin(uTime * 0.5 + vUv.x * 3.0) * 0.2);
    vec3 color = mix(uColorFrom, uColorTo, mixVal);
    float shimmer = sin(vUv.x * 20.0 + uTime * 3.0) * 0.1 + 0.9;
    color *= shimmer;
    gl_FragColor = vec4(color, 0.85);
  }
`;

export default function LiquidShader({
  colorFrom = '#ff006e',
  colorTo = '#ff4d8d',
}: LiquidShaderProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorFrom: { value: new THREE.Color(colorFrom) },
      uColorTo: { value: new THREE.Color(colorTo) },
    }),
    [colorFrom, colorTo]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent
      side={THREE.DoubleSide}
    />
  );
}
