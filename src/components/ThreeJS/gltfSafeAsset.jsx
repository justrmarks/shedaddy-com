import React, { Suspense } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Asset({ url }) {
    const gltf = useLoader(GLTFLoader, url)
    return <primitive object={gltf.scene} dispose={null} />
  }

export default function SafeAsset({url, fallback = <Cube />}) {

    return (
        <Suspense fallback={fallback}>
            <Asset url={url} />
        </Suspense>
    )
}
  


