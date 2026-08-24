'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, OrbitControls, Text } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function FilmReel() {
  const group = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.14
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08
  })
  const holes = Array.from({ length: 8 }, (_, index) => {
    const angle = (index / 8) * Math.PI * 2
    return [Math.cos(angle) * 1.35, Math.sin(angle) * 1.35]
  })
  return <group ref={group} rotation={[0.25, 0, -0.12]}>
    <mesh>
      <cylinderGeometry args={[2.25, 2.25, 0.18, 96]} />
      <meshStandardMaterial color="#e9e1d3" metalness={0.28} roughness={0.68} />
    </mesh>
    {holes.map(([x, y], index) => <mesh key={index} position={[x, y, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.26, 0.07, 12, 24]} />
      <meshStandardMaterial color="#0b0c0c" metalness={0.4} roughness={0.48} />
    </mesh>)}
    <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.5, 0.1, 16, 40]} />
      <meshStandardMaterial color="#9a3028" metalness={0.25} roughness={0.55} />
    </mesh>
    <mesh position={[0, 0, 0.16]}>
      <cylinderGeometry args={[0.2, 0.2, 0.22, 32]} />
      <meshStandardMaterial color="#0b0c0c" metalness={0.5} roughness={0.4} />
    </mesh>
  </group>
}

function ArchiveScene() {
  return <Canvas camera={{ position: [0, 0, 7], fov: 35 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
    <color attach="background" args={["#0b0c0c"]} />
    <ambientLight intensity={1.5} />
    <directionalLight position={[4, 5, 6]} intensity={3} color="#fff5e5" />
    <pointLight position={[-4, -2, 2]} intensity={8} distance={10} color="#8b3029" />
    <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.25}>
      <FilmReel />
    </Float>
    <Line points={[[-4, -2.4, -0.2], [4, -2.4, -0.2]]} color="#b28b5b" lineWidth={0.5} transparent opacity={0.55} />
    <Text position={[-3.8, 2.45, 0]} fontSize={0.12} letterSpacing={0.2} color="#b9b0a2" anchorX="left">WUCH FILMS / THE ARCHIVE</Text>
    <Text position={[3.8, -2.65, 0]} fontSize={0.1} letterSpacing={0.18} color="#8e877d" anchorX="right">FRAME 001</Text>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
  </Canvas>
}

export function ArchiveIntro() {
  return <section className="relative h-[72vh] min-h-[520px] overflow-hidden bg-[#0b0c0c]" aria-label="WUCH FILMS archive introduction">
    <ArchiveScene />
    <div className="pointer-events-none absolute inset-x-5 bottom-8 flex items-end justify-between text-[#e9e1d3] md:inset-x-10">
      <div><p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#b9b0a2]">An independent moving image house</p><h1 className="mt-3 max-w-3xl font-serif text-6xl leading-[.82] tracking-[-.07em] md:text-[9rem]">Stories<br />from the edges.</h1></div>
      <p className="hidden max-w-[180px] text-right font-mono text-[10px] uppercase leading-5 tracking-[.16em] text-[#b9b0a2] md:block">Scroll to enter<br />the archive</p>
    </div>
  </section>
}
