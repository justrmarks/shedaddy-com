import React from 'react'
import { useInView } from 'react-intersection-observer'
import useDimensions from "react-use-dimensions";
import {ReactP5Wrapper as P5Wrapper} from 'react-p5-wrapper';
import FramerTile from '../animate/FramerTile';


const InViewSketch = ({sketch, style, className}) => {

  const [containerRef, containerSize] = useDimensions(); 

  
  if (containerSize) {
      return (
          <div ref={containerRef} style={style} className={`inViewSketchContainer ${className}`}>
              <FramerTile>
                <P5Wrapper  sketch={sketch} parentSize={containerSize} />
              </FramerTile>
          </div>
      ) }

  }


export default InViewSketch

