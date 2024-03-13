import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { easing } from "maath"
import { useGLTF} from "@react-three/drei"
import { state } from "../Serve/store"
import { useSnapshot } from "valtio"


export function Shoe() {
    const ref = useRef()
    const snap = useSnapshot(state)
    // console.log(part)
    const { nodes, materials } = useGLTF("shoe-draco.glb")
    useFrame((state, delta) => {
      const t = state.clock.getElapsedTime()
      ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 4) / 8, -0.2 - (1 + Math.sin(t / 1.5)) / 20)
      ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    //   easing.dampC(materials.part.color, snap.items.part, 0.3, delta)
    easing.dampC(materials.laces.color, snap.items.laces, 0.3, delta)
    easing.dampC(materials.mesh.color, snap.items.mesh, 0.3, delta)
    easing.dampC(materials.caps.color, snap.items.caps, 0.3, delta)
    easing.dampC(materials.inner.color, snap.items.inner, 0.3, delta)
    easing.dampC(materials.sole.color, snap.items.sole, 0.3, delta)
    easing.dampC(materials.stripes.color, snap.items.stripes, 0.3, delta)
    easing.dampC(materials.band.color, snap.items.band, 0.3, delta)
    easing.dampC(materials.patch.color, snap.items.patch, 0.3, delta)
})
   
    return (
      <group
        ref={ref}
        onPointerMissed={() => (state.current = null)}
        onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
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
  