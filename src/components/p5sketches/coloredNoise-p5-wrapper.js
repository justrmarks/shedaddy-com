
export function sketch(p) {
    
    let particles
    let canvas


    let background = 11;

p.setup = () => {
        canvas = p.createCanvas(0, 0)
        p.background(background);
        particles = new ParticleSystem(canvas.width, canvas.height, canvas.width/10, p)
        p.noStroke()
}

p.draw = () => {
    p.background(background);
    particles.display()
    // console.log("noise-draw")
}

p.updateWithProps = function ({parentSize}) {
    if (canvas && parentSize){
        const {height, width} = parentSize

        if (height != canvas.height || width != canvas.width) {
            p.resizeCanvas(width, height)
            particles = new ParticleSystem(canvas.width, canvas.height, canvas.width / 20 ,p)
        }
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

        this.xSpacing = 1.73;
        this.ySpacing = 10;



        for( let x = 0; x < xBound; x+=this.particleSize+this.particleSize/this.xSpacing) {

            for(let y = 0; y < yBound; y+=this.particleSize+this.particleSize/this.ySpacing) {
                const p = Math.random();

                this.addParticle(x,y)
            }
        }
    }
    
    resize(xBound, yBound) {
        this.particles = []

        for( let x = 0; x < xBound; x+=this.particleSize) {

            for(let y = 0; y < yBound; y+=this.particleSize) {




                this.addParticle(x,y )
            }
        }
    }

    addParticle(x,y ) {

        const p = Math.random();
        let shape;

        if (p> 0.8) {shape = 'circle'}
        else {shape='square'}
        this.particles.push(new Particle(x,y, this.particleSize, shape,this.particles.length, this.p5))
    }

    

    display(p5) {
        
        this.particles.forEach(particle=> {
            particle.update()
            particle.display(p5)})
      
    }
}

class Particle {

    constructor(x,y, size, shape, index, p5) {
        this.x = x
        this.y = y
        this.t = 0
        this.index = index
        this.p5 = p5
        this.setFill()

        this.makeShape = () => { 

            if (shape == 'circle') { 

                let even = index % 2 == 0
                p5.stroke(200)
                let delta = (Math.sin((this.t *100) * Math.PI / 180) ) * 70;
                // console.log(delta, 'delta')

                let newX = this.x,newY = this.y;

                if (even) {
                newX = this.x + delta; }
                else {newY = this.y + delta}
                // console.log(this.x,"this.x")
                p5.circle(newX,newY, size) 
            }
    
            else { 
                p5.noStroke()
                p5.square(x,y,size) 
            }
        }

        this.rOffset = 7;
        this.rScale = 240;

        this.gOffset = 0;
        this.gScale = 101;

        this.bScale = 151;
        this.bOffset = 5;



    }

    setFill() {
        this.p5.noiseSeed((this.x*this.y) + this.x + this.y + (250))
        const color = this.p5.color(this.rScale * this.p5.noise(this.rOffset+this.t), this.gScale * this.p5.noise(this.gOffset+this.t), this.bScale * this.p5.noise(this.bOffset+this.t))
        this.p5.fill(color)
    }

    update() {
      
        
        this.t+= 0.01
            
        this.setFill()
    
    }

    display() {
        this.makeShape()
    }

}