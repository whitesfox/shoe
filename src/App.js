import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import { easing } from "maath"

const state = proxy({
  current: "laces",
  colors: ["#EAEAEA", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
  color: "",
  items: { laces: "#fff", mesh: "#fff", caps: "#fff", inner: "#fff", sole: "#fff", stripes: "#fff", band: "#fff", patch: "#fff" },
})

export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Shoe />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <Picker />
    </>
  )
}

function Shoe() {
  const ref = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("shoe-draco.glb")
  // const [hovered, set] = useState(null)
  console.log(materials.laces)
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 4) / 8, -0.2 - (1 + Math.sin(t / 1.5)) / 20)
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })
  useFrame((state, delta) => easing.dampC(materials.laces.color, snap.items.laces, 0.3, delta))
  useFrame((state, delta) => easing.dampC(materials.mesh.color, snap.items.mesh, 0.3, delta))
  useFrame((state, delta) => easing.dampC(materials.caps.color, snap.items.caps, 0.3, delta))
  useFrame((state, delta) => easing.dampC(materials.inner.color, snap.items.inner, 0.3, delta))
  useFrame((state, delta) => easing.dampC(materials.sole.color, snap.items.sole, 0.3, delta))
  useFrame((state, delta) => easing.dampC(materials.stripes.color, snap.items.stripes, 0.3, delta))
  useFrame((state, delta) => easing.dampC(materials.band.color, snap.items.band, 0.3, delta))
  useFrame((state, delta) => easing.dampC(materials.patch.color, snap.items.patch, 0.3, delta))

  return (
    <group
      ref={ref}
      // onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      // onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name), console.log(state.current))}>
      <mesh receiveShadow castShadow geometry={nodes.shoe.geometry} material={materials.laces} material-color={snap.items.laces} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={snap.items.mesh} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={snap.items.caps} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={snap.items.inner} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={snap.items.sole} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={snap.items.stripes} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_6.geometry} material={materials.band} material-color={snap.items.band} />
      <mesh receiveShadow castShadow geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={snap.items.patch} />
    </group>
  )
}

function Picker() {
  const snap = useSnapshot(state)
  return (
    <div className="customizer">
      <div className="color-options">
        {snap.colors.map((color) => (
          <div
            key={color}
            className={`circle`}
            style={{ background: color, transform: `scale(${state.color === color ? 1.2 : 1})` }}
            onClick={(color) => (
              (state.color = color), { items: { ...state.items, [state.current]: color } }, console.log(state.items)
            )}></div>
        ))}
      </div>
    </div>
  )
}
