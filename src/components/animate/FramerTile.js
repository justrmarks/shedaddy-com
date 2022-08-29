import React from 'react'
import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";

import { useEffect } from "react";



const FramerTile = ({children}) => {



  const control = useAnimation()
  const [ref, inView] = useInView()


  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, y: 100, },
  }

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } 
    else {
      control.start("hidden");
    }
  }, [control, inView]);


    return (
      <motion.div 
      initial="hidden"
      animate={control}
        className="framer-tile"
        ref={ref}
        variants={boxVariant}
      >
        {children}
      </motion.div>
    );
  };


  export default FramerTile;