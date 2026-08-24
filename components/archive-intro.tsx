'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, Text } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return reduced
}
import * as THREE from 'three'

function FilmReel({ animated, spin }: { animated: boolean; spin: number }) {
  const group = useRef<THREE.Group>(null)
  const targetSpin = useRef(0)
  useEffect(() => { targetSpin.current += Math.PI * 2 }, [spin])
  useFrame((state, delta) => {
    if (!group.current) return
    if (animated) group.current.rotation.y += delta * 0.14
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetSpin.current, 4, delta)
    group.current.rotation.x = animated ? Math.sin(state.clock.elapsedTime * 0.35) * 0.08 : 0
  })
  const holes = Array.from({ length: 8 }, (_, index) => {
    const angle = (index / 8) * Math.PI * 2
    return [Math.cos(angle) * 1.35, Math.sin(angle) * 1.35]
  })
  return <group ref={group} rotation={[0.25, 0, -0.12]}>
    <mesh><cylinderGeometry args={[2.25, 2.25, 0.18, 96]} /><meshStandardMaterial color="#f2eee7" metalness={0.72} roughness={0.42} /></mesh>
    {holes.map(([x, y], index) => <mesh key={index} position={[x, y, 0.12]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.26, 0.07, 12, 24]} /><meshStandardMaterial color="#0b0c0c" metalness={0.4} roughness={0.48} /></mesh>)}
    <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.5, 0.1, 16, 40]} /><meshStandardMaterial color="#b89a68" metalness={0.25} roughness={0.55} /></mesh>
    <mesh position={[0, 0, 0.16]}><cylinderGeometry args={[0.2, 0.2, 0.22, 32]} /><meshStandardMaterial color="#0b0c0c" metalness={0.5} roughness={0.4} /></mesh>
  </group>
}

function DustField({ animated }: { animated: boolean }) {
  const points = useMemo(() => {
    const positions = new Float32Array(72 * 3)
    for (let i = 0; i < 72; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1
    }
    return positions
  }, [])
  const ref = useRef<THREE.Points>(null)
  useFrame((state, delta) => { if (ref.current && animated) ref.current.rotation.y += delta * 0.012 })
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry><pointsMaterial color="#e9e1d3" size={0.025} transparent opacity={0.45} sizeAttenuation /></points>
}

function CameraParallax({ animated }: { animated: boolean }) {
  const { camera } = useThree()
  useFrame((state) => {
    if (!animated) return
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.22, 0.025)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.12, 0.025)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function ArchiveScene() {
  return <Canvas camera={{ position: [0, 0, 7], fov: 35 }} dpr={[1, 1.35]} gl={{ antialias: true }} aria-hidden="true">
    <color attach="background" args={["#0a0a0a"]} /><ambientLight intensity={1.2} /><directionalLight position={[4, 5, 6]} intensity={2.4} color="#f2eee7" />
    <DustField animated={false} /><CameraParallax animated={false} />
    <Line points={[[-4, -2.4, -0.2], [4, -2.4, -0.2]]} color="#f4e7c5" lineWidth={0.5} transparent opacity={0.55} />
    <Line points={[[-3.8, -2.62, -0.2], [3.8, -2.62, -0.2]]} color="#f4e7c5" lineWidth={0.5} transparent opacity={0.35} />
    <Text position={[-3.8, 2.45, 0]} fontSize={0.12} letterSpacing={0.2} color="#f4e7c5" anchorX="left">WUCH FILMS / MATCHBOX SERIES</Text>
    <Text position={[3.8, -2.82, 0]} fontSize={0.1} letterSpacing={0.18} color="#f4e7c5" anchorX="right">STRIKE / FRAME 001</Text>
  </Canvas>
}

export function ArchiveIntro() {
  return <section className="archive-intro relative h-[72vh] min-h-[520px] overflow-hidden" aria-label="WUCH FILMS archive introduction">
    <div className="archive-intro__image" role="img" aria-label="Filmmaker monitoring a live camera feed on set" />
    <ArchiveScene />
    <div className="pointer-events-none absolute inset-x-5 bottom-8 z-20 flex items-end justify-between text-primary-foreground md:inset-x-10"><div><p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#b9b0a2]">An independent moving image house</p><h1 className="mt-3 max-w-3xl font-serif text-6xl leading-[.82] tracking-[-.07em] text-hero-foreground md:text-[9rem]">Stories<br />from the edges.</h1></div></div>
  </section>
}
