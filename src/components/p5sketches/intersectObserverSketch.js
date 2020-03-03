import React from 'react'
import { useInView } from 'react-intersection-observer'
import  Sketch  from 'react-p5'

const InViewSketch = (sketch) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
  })
  console.log(ref)
  console.log(inView)
  console.log(sketch)
  
  if (inView) {
      console.log("div in view")
      return (
          <div ref={ref} style={{height: '100%', width: '100vw'}}>
            <Sketch setup={setup} draw={draw} windowResized={windowResized}/>
          </div>
      ) }
    else {
        return (
            <div ref={ref}></div>
        )
    }
  }


export default InViewSketch

var particles
var canvas

function setup(p5, canvasRef) {
        canvas = p5.createCanvas(canvasRef.clientWidth, canvasRef.clientHeight)
        canvas.parent(canvasRef)
        particles = new ParticleSystem(canvas.width, canvas.height, p5)
}

function draw(p5) {
    particles.display()
}

function windowResized(p5) {
    p5.resizeCanvas(
        canvas.parent.clientWidth,
        canvas.parent.clientHeight);
        particles.resize(canvas.width, canvas.height)
    
    
}

class ParticleSystem {
    constructor(xBound, yBound, p5) {
        this.xBound = xBound
        this.yBound = yBound
        this.particles = []

        for( let x = 0; x < xBound; x+=3) {

            for(let y = 0; y < yBound; y+=3) {
                this.addParticle(x,y, p5)
            }
        }
    }
    
    resize(xBound, yBound) {
        this.particles = []
        for( let x = 0; x < xBound; x+=3) {

            for(let y = 0; y < yBound; y+=3) {
                this.addParticle(x,y)
            }
        }
    }

    addParticle(x,y, p5) {
        this.particles.push(new Particle(x,y, p5))
    }

    

    display(p5) {
        
        this.particles.forEach(particle=> {
            particle.update()
            particle.display(p5)})
    }
}

class Particle {

    constructor(x,y, p5) {
        this.x = x
        this.y = y
        this.t = 0
        this.p5 = p5
        this.setFill()
        this.square = () => p5.square(x,y,3)
    }

    setFill() {
        this.p5.noiseSeed(this.x*this.y)
        const color = this.p5.color(255 * this.p5.noise(10+this.t), 255 * this.p5.noise(12+this.t), 255 * this.p5.noise(15+this.t))
        this.p5.fill(color)
    }

    update() {
        if (this.t < 1)
        {
            this.t+= 0.01
        }
            
        else {
            this.t -= 0.01
        }
        this.setFill()
    
    }

    display() {
        this.square()
    }

}