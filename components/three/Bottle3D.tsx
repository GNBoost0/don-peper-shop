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
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Background — premium dark cream label (visible on light scene)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  bgGrad.addColorStop(0, '#2b1a0e');
  bgGrad.addColorStop(0.15, '#3d2614');
  bgGrad.addColorStop(0.5, '#2b1a0e');
  bgGrad.addColorStop(0.85, '#3d2614');
  bgGrad.addColorStop(1, '#2b1a0e');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Gold thick double border
  ctx.strokeStyle = '#e8b06a';
  ctx.lineWidth = 8;
  ctx.strokeRect(24, 24, 976, 976);
  ctx.strokeStyle = 'rgba(232, 176, 106, 0.4)';
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, 928, 928);

  // DON PEPER — massive brand text
  ctx.fillStyle = '#f0c884';
  ctx.font = 'bold 110px "Cormorant Garamond", "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DON PEPER', 512, 300);

  // Gold divider line under brand
  const lineGrad = ctx.createLinearGradient(150, 0, 874, 0);
  lineGrad.addColorStop(0, 'transparent');
  lineGrad.addColorStop(0.5, '#e8b06a');
  lineGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(150, 380);
  ctx.lineTo(874, 380);
  ctx.stroke();

  // RHUM INFUSÉ
  ctx.fillStyle = '#fff5e6';
  ctx.font = '600 44px "Inter", system-ui, sans-serif';
  ctx.fillText('RHUM  INFUSÉ', 512, 440);

  // Flavor name in bright color
  ctx.fillStyle = colorFrom;
  ctx.font = 'italic 60px "Cormorant Garamond", serif';
  ctx.fillText(flavorName, 512, 560);

  // Decorative dots
  ctx.fillStyle = colorFrom;
  ctx.beginPath();
  ctx.arc(380, 660, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e8b06a';
  ctx.beginPath();
  ctx.arc(512, 660, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = colorTo;
  ctx.beginPath();
  ctx.arc(644, 660, 12, 0, Math.PI * 2);
  ctx.fill();

  // Bottom text
  ctx.fillStyle = '#c4a070';
  ctx.font = '600 30px "Inter", sans-serif';
  ctx.fillText('ARDENNES · FRANCE', 512, 760);

  ctx.font = '24px "Inter", sans-serif';
  ctx.fillStyle = '#a08866';
  ctx.fillText('Fait à la main · Édition limitée', 512, 800);

  // Small gold badge circle
  ctx.strokeStyle = '#e8b06a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(512, 890, 44, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#e8b06a';
  ctx.font = 'bold 26px serif';
  ctx.fillText('40°', 512, 893);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;
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

  // Curved label — wraps ~200° around the bottle for max visibility
  const labelGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.565, 0.565, 1.4, 96, 1, true, -Math.PI * 0.55, Math.PI * 1.1);
    return geo;
  }, []);

  // MeshBasicMaterial = NOT affected by scene lighting, always fully visible
  const labelMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: labelTexture,
      side: THREE.DoubleSide,
      toneMapped: false,
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
        color: 0xeef0ff,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.85,
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
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Curved label wrapping the bottle — uses MeshBasicMaterial so it's ALWAYS visible */}
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
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point lights for inner glow */}
      <pointLight position={[0, 0, 2]} color={colorFrom} intensity={2} distance={8} />
      <pointLight position={[0, -1, 0]} color={colorTo} intensity={1.5} distance={5} />
    </group>
  );
}
