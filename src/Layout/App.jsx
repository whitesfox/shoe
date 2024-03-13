import { Canvas } from "@react-three/fiber"
import {  ContactShadows, Environment, OrbitControls } from "@react-three/drei"

import { Shoe } from "../ComponentsForThree/Shoe"
import { Picker} from "../Components/Action"

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


