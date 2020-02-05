import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Snapdragon from './snapDragon'



// component to handle error detection and canvas rendering for 
// react Three Fiber canvas component
export const CanvasJumbotron = (props)=> {

    if ()
    return (
    <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Snapdragon position={[-1.2, 0, 0]} />
        <Snapdragon position={[1.2, 0, 0]} />
    </Canvas> )
}