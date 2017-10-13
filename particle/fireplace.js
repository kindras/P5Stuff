class Fireplace {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
    }

    show() {
        push();

        translate(this.x, this.y);

        this.particles.forEach(particle => {
            particle.show();
        });

        pop();
    }

    update() {
        this.particles.push(new Particle(0,0));
        this.particles.forEach(particle => {
            particle.update();
        });

        this.particles = this.particles.filter(p => !p.shouldBeDeleted());
    }
}