import React from 'react'

import { lazy, Suspense } from 'react';

import useDimensions from "react-use-dimensions";

import FramerTile from '../animate/FramerTile';

const P5Wrapper = lazy(() => 
  import('react-p5-wrapper').then(module => ({
    default: module.ReactP5Wrapper
  }))
)

const InViewSketch = ({sketch, style, className}) => {

  const [containerRef, containerSize] = useDimensions(); 

  const isSSR = typeof window === "undefined";


  
  if (containerSize && typeof window != 'undefined') {
      return ( <>{!isSSR && <div ref={containerRef} style={style} className={`inViewSketchContainer ${className}`}>
              <FramerTile>
              <Suspense fallback={<div>Loading...</div>}>
                <P5Wrapper sketch={sketch} parentSize={containerSize} />
              </Suspense>
              </FramerTile>
          </div> }</>
      ) 
    }
      else {
        <div> Loading...</div>
      }

  }


export default InViewSketch

