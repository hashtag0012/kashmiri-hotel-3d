"use client"

import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/addons/loaders/OBJLoader"
import { Center } from "@react-three/drei"
export function Model() {
  const obj = useLoader(OBJLoader, "/Countryside_Retreat_0621070252_texture.obj")
  return (
    <Center>
      <primitive object={obj} scale={0.05} />
    </Center>
  )
}

function DebugBox() {
    return (
        <mesh position={[2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
        </mesh>
    )
}