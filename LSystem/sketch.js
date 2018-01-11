class LSystem {
	constructor(axiom) {
		this.axiom = axiom;
		this.rules = [];
		this.actions = [];
		this.sentence = axiom;
		this.step = 0;
	}

	validateFRule(rule) {
		for(const letter of rule) {
			if(!this.actions[letter]) {
				return false;
			}
		}
		this.rules['F'] = rule;
		this.reset();
		return true;
	}

	reset() {
		this.sentence = this.axiom;
		this.step = 0;
		background(51);
		resetMatrix();
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
}

function generate() {
	lSystem.generateNextStep();
	document.getElementById('step').innerHTML = lSystem.step;
}

function reset() {
	let rule = document.getElementById('rule');
	if(!rule || rule.value == '' || !lSystem.validateFRule(rule.value)) {
		// rule is not valid..
	}
}