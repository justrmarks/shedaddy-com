import React, { Suspense, useRef } from 'react'
import { useFrame, Canvas } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Snapdragon from './snapDragon'
import ThreeErrorBoundry from './ThreeErrorBoundry'
import { Box } from './models/primitiveMeshes'






// component to handle error detection and canvas rendering for 
// react Three Fiber canvas component
const CanvasJumbotron = (props)=> {
    return (
    <div style={{width: '100vh', height: '100vw'}}>
    <Canvas {...props} camera={{position: [0,5,30]}} >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ThreeErrorBoundry>
            <Suspense fallback={<Box />}>
                <Snapdragon position={[0, 0, 0]} />
                <Snapdragon position={[0, -2, 0]} />
                <Snapdragon position={[10, 0, 0]} />

            </Suspense>
        </ThreeErrorBoundry>
    </Canvas>
    </div> )
}
export default CanvasJumbotron;