'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Ribbon({ offset, color, speed }: { offset: number; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * speed + offset) * 0.12
    ref.current.position.y = Math.sin(state.clock.elapsedTime * speed * 0.7 + offset) * 0.45 + offset * 0.25
  })
  return <mesh ref={ref} position={[offset * 1.5, offset * 0.2, -2]} rotation={[0, 0, offset * 0.12]}><torusGeometry args={[2.7 + offset * 0.25, 0.018, 8, 96, Math.PI * 1.35]} /><meshBasicMaterial color={color} transparent opacity={0.35} /></mesh>
}

function Dust() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const data = new Float32Array(180 * 3)
    for (let i = 0; i < 180; i++) { data[i * 3] = (Math.random() - 0.5) * 14; data[i * 3 + 1] = (Math.random() - 0.5) * 9; data[i * 3 + 2] = -Math.random() * 4 }
    return data
  }, [])
  useFrame((_, delta) => { if (ref.current) { ref.current.rotation.y += delta * 0.012; ref.current.rotation.x += delta * 0.004 } })
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#f4c99b" size={0.025} transparent opacity={0.5} /></points>
}

function Scene() {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => { if (group.current) { group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.025, 0.03); group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.045, 0.03) } })
  return <group ref={group}><Dust /><Ribbon offset={-2} color="#ef5b45" speed={0.28} /><Ribbon offset={0} color="#1c58c7" speed={0.2} /><Ribbon offset={2} color="#e4ad3d" speed={0.24} /></group>
}

export function AmbientBackground() {
  return <div className="ambient-background" aria-hidden="true"><Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.25]} gl={{ antialias: false, alpha: true }}><Scene /></Canvas></div>
}
