import React, { Suspense, useRef } from 'react'
import { DoubleSide, Vector3 } from 'three'

export function Box(props) {
    const mesh = useRef();
    return (
      <mesh {...props} ref={mesh}>
        <boxBufferGeometry attach="geometry" args={props.scale ? [props.scale.width, props.scale.height, props.scale.depth] : [1,1,1]} />
        <meshStandardMaterial attach="material" color={'hotpink'} />
      </mesh>
    )
  }

export function Plane(props) {
    const mesh = useRef();
    return (
        <mesh {...props} ref={mesh} rotation={[90,0,0]}>
            <planeGeometry attach="geometry" args={[props.scale, props.scale] || [3000,3000, 1, 1]} />
            <meshBasicMaterial attach="material" color={props.color || '#00ffff'} side={DoubleSide}/>
        </mesh>
    )
}