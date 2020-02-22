import React, { Suspense } from 'react'
import { useFrame, Canvas } from 'react-three-fiber'
import Snapdragon from './snapDragon'
import ThreeErrorBoundry from './ThreeErrorBoundry'
import { Box, Plane } from './models/primitiveMeshes'
import _ from 'lodash'





// component to handle error detection and canvas rendering for 
// react Three Fiber canvas component
const CanvasJumbotron = (props)=> {

    const models = []
    let index=0
    let position
    _.times(1, ()=> {
        position=[Math.floor(Math.random()*45)-5 ,(Math.random()*-35)-5, Math.random()*-30 + 4]
        console.log(position)
        models.push(<Snapdragon key={index++} position={position}/>)
        
    })


    return (
    <div>
    <Canvas {...props} camera={{fov:80*window.innerWidth/window.innerHeight ,position: [0,0,15]}} style={{height: '100vh', width: '100vw'}}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ThreeErrorBoundry>
            <Suspense fallback={<Box />}>
                {models}
                {/* <Snapdragon position={[8, -10, -8]}/> */}
                <Box position={[4,0,3]} scale={{height: 500, width: 400, depth: 700}} />
            </Suspense>
        </ThreeErrorBoundry>
    </Canvas>
    </div>
     )
}
export default CanvasJumbotron;