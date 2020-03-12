import React from 'react'
import { useInView } from 'react-intersection-observer'
import useDimensions from "react-use-dimensions";
import {loadableP5 as P5Wrapper} from './loadableP5'



const InViewSketch = ({sketch, style, className}) => {
  const [p5ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
  })
  const [containerRef, containerSize] = useDimensions(); 
  
  if (inView && containerSize) {
      return (
          <div ref={containerRef} style={style} className={className}>
              <div ref={p5ref}>
                <P5Wrapper  sketch={sketch} parentSize={containerSize} />
              </div>
          </div>
      ) }
    else {
        return (
            <div ref={containerRef} style={style} className={className}>
                <div ref={p5ref} className="notInView"></div>
            </div>
        )
    }
  }


export default InViewSketch

