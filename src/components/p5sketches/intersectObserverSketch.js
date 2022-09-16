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

  
  if (containerSize && typeof window != 'undefined') {
      return ( <>
              <FramerTile>
              <Suspense fallback={<div className="suspenseLoading">Loading...</div>}>
              <div ref={containerRef} style={style} className={`inViewSketchContainer ${className}`}>
                <P5Wrapper sketch={sketch} parentSize={containerSize} />
              </div>
              </Suspense>
              </FramerTile>
          </>
      ) 
    }
      else {
        <div> Loading...</div>
      }

  }


export default InViewSketch

