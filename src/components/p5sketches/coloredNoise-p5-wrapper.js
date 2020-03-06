
export function sketch(p) {
    
    let particles
    let canvas

p.setup = () => {
        canvas = p.createCanvas(0, 0)
        particles = new ParticleSystem(canvas.width, canvas.height, canvas.width/10, p)
        p.noStroke()
}

p.draw = () => {
    particles.display()
}

p.myCustomRedrawAccordingToNewPropsHandler = function ({parentSize}) {
    if (canvas && parentSize){
        const {height, width} = parentSize
        p.resizeCanvas(width, height)
        particles = new ParticleSystem(canvas.width, canvas.height, canvas.width / 10,p)
    }
  };

}





class ParticleSystem {
    constructor(xBound, yBound, particleSize, p5) {
        this.xBound = xBound
        this.yBound = yBound
        this.particles = []
        this.p5 = p5
        this.particleSize = particleSize

        for( let x = 0; x < xBound; x+=this.particleSize+this.particleSize/10) {

            for(let y = 0; y < yBound; y+=this.particleSize+this.particleSize/10) {
                this.addParticle(x,y, this.particleSize/10)
            }
        }
    }
    
    resize(xBound, yBound) {
        this.particles = []
        for( let x = 0; x < xBound; x+=this.particleSize) {

            for(let y = 0; y < yBound; y+=this.particleSize) {
                this.addParticle(x,y, this.particleSize)
            }
        }
    }

    addParticle(x,y) {
        this.particles.push(new Particle(x,y, this.particleSize, this.p5))
    }

    

    display(p5) {
        
        this.particles.forEach(particle=> {
            particle.update()
            particle.display(p5)})
      
    }
}

class Particle {

    constructor(x,y, size, p5) {
        this.x = x
        this.y = y
        this.t = 0
        this.p5 = p5
        this.setFill()
        this.square = () => p5.square(x,y, size)
    }

    setFill() {
        this.p5.noiseSeed((this.x*this.y) + this.x + this.y + (250))
        const color = this.p5.color(255 * this.p5.noise(10+this.t), 255 * this.p5.noise(12+this.t), 120 * this.p5.noise(15+this.t))
        this.p5.fill(color)
    }

    update() {
      
        
        this.t+= 0.01
            
        this.setFill()
    
    }

    display() {
        this.square()
    }

}