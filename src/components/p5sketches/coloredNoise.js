export function setup(p5, canvasRef, canvasX, canvasY) {
    return (p5, canvasRef) => {
        p5.createCanvas(canvasX, canvasY).parent(canvasRef)
        const particles = new ParticleSystem()
    }

}

export function draw(p5) {

    
}

class ParticleSystem {
    constructor(xBound, yBound) {
        this.xBound = xBound
        this.yBound = yBound
        this.particles = []
    }
    

    addParticle() {

    }

    update() {
        this.particles.forEach((particle, index, object)=> {
            particle.update()
            
        })
    }
}

class Particle {

    constructor(x,y,force, direction) {
        this.x = x
        this.y = y
        this.force = force
        this.direction = direction
    }

    update() {
        this.x += Math.cos(direction) * this.force 
        this.xy += Math.sin(direction) * this.force 
    }

}