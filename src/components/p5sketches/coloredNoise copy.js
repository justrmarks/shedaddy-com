export var particles
export var canvas

export function setup(p5, canvasRef) {
        console.log(setup)
        canvas = p5.createCanvas(400, 300)
        canvas.parent(canvasRef)
        particles = new ParticleSystem(canvas.width, canvas.height, p5)
    

}

export function draw(p5) {
    particles.display()
}

export function windowResized(p5) {
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