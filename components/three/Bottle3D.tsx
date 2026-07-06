'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Bottle3DProps {
  colorFrom?: string;
  colorTo?: string;
  flavorName?: string;
  liquidLevel?: number;
  floatSpeed?: number;
  interactive?: boolean;
}

function createLabelTexture(colorFrom: string, colorTo: string, flavorName: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  // Background — warm dark label
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 768);
  bgGrad.addColorStop(0, '#1f1530');
  bgGrad.addColorStop(0.5, '#15102a');
  bgGrad.addColorStop(1, '#1f1530');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 768);

  // Gold double border
  ctx.strokeStyle = '#c08c5a';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, 480, 736);
  ctx.strokeStyle = 'rgba(192, 140, 90, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(28, 28, 456, 712);

  // DON PEPER — main brand
  ctx.fillStyle = '#d4a574';
  ctx.font = 'bold 68px "Cormorant Garamond", "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DON PEPER', 256, 220);

  // Gold divider line
  const lineGrad = ctx.createLinearGradient(100, 0, 412, 0);
  lineGrad.addColorStop(0, 'transparent');
  lineGrad.addColorStop(0.5, '#c08c5a');
  lineGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, 280);
  ctx.lineTo(412, 280);
  ctx.stroke();

  // RHUM INFUSÉ
  ctx.fillStyle = '#f0e8dc';
  ctx.font = '600 26px "Inter", system-ui, sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('RHUM  INFUSÉ', 256, 330);

  // Spacer

  // Flavor name in color
  ctx.fillStyle = colorFrom;
  ctx.font = 'italic 36px "Cormorant Garamond", serif';
  ctx.fillText(flavorName, 256, 420);

  // Decorative dots
  ctx.fillStyle = colorFrom;
  ctx.beginPath();
  ctx.arc(180, 500, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#c08c5a';
  ctx.beginPath();
  ctx.arc(256, 500, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = colorTo;
  ctx.beginPath();
  ctx.arc(332, 500, 7, 0, Math.PI * 2);
  ctx.fill();

  // Bottom text
  ctx.fillStyle = '#8a7a6a';
  ctx.font = '18px "Inter", sans-serif';
  ctx.fillText('ARDENNES · FRANCE', 256, 580);
  ctx.font = '14px "Inter", sans-serif';
  ctx.fillStyle = '#6b5d4f';
  ctx.fillText('Fait à la main · Édition limitée', 256, 610);

  // Small gold badge
  ctx.strokeStyle = '#c08c5a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(256, 670, 30, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#c08c5a';
  ctx.font = 'bold 14px serif';
  ctx.fillText('40°', 256, 672);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.anisotropy = 16;
  return texture;
}

export default function Bottle3D({
  colorFrom = '#ff006e',
  colorTo = '#ff4d8d',
  flavorName = '',
  liquidLevel = 0.7,
  floatSpeed = 1,
  interactive = false,
}: Bottle3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  const fromColor = useMemo(() => new THREE.Color(colorFrom), [colorFrom]);
  const toColor = useMemo(() => new THREE.Color(colorTo), [colorTo]);

  const labelTexture = useMemo(
    () => createLabelTexture(colorFrom, colorTo, flavorName),
    [colorFrom, colorTo, flavorName]
  );

  // Curved label geometry — wraps ~120° around the bottle
  const labelGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.562, 0.562, 1.1, 64, 1, true, -Math.PI * 0.33, Math.PI * 0.66);
    return geo;
  }, []);

  const labelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: labelTexture,
      transparent: true,
      roughness: 0.6,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
  }, [labelTexture]);

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
        color: 0xddddff,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.4,
        ior: 1.45,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.55,
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
        <meshStandardMaterial color="#3a2a1e" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Cap gold top */}
      <mesh position={[0, bottleHeight / 2 + 1.14, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.04, 32]} />
        <meshStandardMaterial color="#c08c5a" metalness={0.9} roughness={0.15} emissive="#c08c5a" emissiveIntensity={0.2} />
      </mesh>

      {/* Liquid inside */}
      <mesh ref={liquidRef} position={[0, -bottleHeight / 2 + liquidHeight / 2, 0]}>
        <cylinderGeometry args={[0.52, 0.57, liquidHeight, 48, 1]} />
        <meshStandardMaterial
          color={fromColor}
          emissive={fromColor}
          emissiveIntensity={0.5}
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Curved label wrapping the bottle */}
      <mesh
        geometry={labelGeometry}
        material={labelMaterial}
        position={[0, -0.15, 0]}
      />

      {/* Glow ring at bottom */}
      <mesh position={[0, -bottleHeight / 2 - 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 1.2, 64]} />
        <meshBasicMaterial
          color={colorFrom}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point lights for inner glow */}
      <pointLight position={[0, 0, 2]} color={colorFrom} intensity={3} distance={10} />
      <pointLight position={[0, -1, 0]} color={colorTo} intensity={2.5} distance={6} />
      <pointLight position={[0, 2, 3]} color="#ffffff" intensity={2} distance={10} />
    </group>
  );
}
