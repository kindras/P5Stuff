class LSystem {
	constructor(axiom) {
		this.axiom = axiom;
		this.rules = [];
		this.actions = [];
		this.sentence = axiom;
		this.step = 0;
	}

	addLetter(letter, action, rule) {
		if(rule) {
			this.rules[letter] = rule;
		}
		this.actions[letter] = action;
	}

	generateNextStep() {
		background(51);
		resetMatrix();
		text(this.step, 30,30);
		translate(width/2,height);
		let nextSentence = "";
		for (const letter of this.sentence) {
			if(this.rules[letter]) {
				nextSentence += this.rules[letter];
			} else {
				nextSentence += letter;
			}
			if(this.actions[letter]) {
				this.actions[letter]();
			}
		}
		this.sentence = nextSentence;
		this.step++;
		
	}
}


const len = 10;
let lSystem;

function setup() {
	noLoop();
	createCanvas(windowWidth, windowHeight);
	background(51);
	stroke(255);
	fill(255);
	strokeWeight(2);

	lSystem = new LSystem('F');
	lSystem.addLetter('F',() =>  { line(0,0,0,-len); translate(0,-len); } ,'FF+[+F-F-F]-[-F+F+F]');
	lSystem.addLetter('+',() =>  rotate(PI/6));
	lSystem.addLetter('-',() =>  rotate(-PI/6));
	lSystem.addLetter('[',() =>  push());
	lSystem.addLetter(']',() =>  pop());
	createP(lSystem.axiom);	
}