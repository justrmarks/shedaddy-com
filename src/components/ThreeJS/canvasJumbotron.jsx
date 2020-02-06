import React from 'react'
import { Canvas } from 'react-three-fiber'
import Snapdragon from './snapDragon'



// component to handle error detection and canvas rendering for 
// react Three Fiber canvas component
const CanvasJumbotron = (props)=> {
    return (
    <Canvas {...props}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Snapdragon position={[-1.2, 0, 0]} />
        <Snapdragon position={[1.2, 0, 0]} />
        <Snapdragon position={[1.2, 1, -3]} />
    </Canvas> )
}
export default CanvasJumbotron;