import React, { Suspense, useRef } from 'react'

export function Box(props) {
    const mesh = useRef();
    return (
      <mesh {...props} ref={mesh}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={'hotpink'} />
      </mesh>
    )
  }

export function Plane(props) {
    const mesh = useRef();
    return (
        <mesh {...props} ref={mesh}>
            <planeGeometry attach="geometry" args={[props.scale, props.scale]} />
            <meshStandardMaterial attach="material" color={'green'} />
        </mesh>
    )
}