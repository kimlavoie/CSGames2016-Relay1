/**
 * DONE:
 *
 * - 30 FPS render loop
 * - Paddles are drawn to the position stored in Game.paddles
 * - W/S/I/K event keys are registered and logged in javascript console
 *
 * OPEN THE JAVASCRIPT CONSOLE! IT'S YOUR BEST FRIEND !!!
 * USE THIS TUTORIAL: http://www.w3schools.com/canvas/default.asp
 * (also has a link tot he full canvas documentation)
 *
 * J'ai utilisé les prototypes de JavaScript. Ayez pas peur, c'est juste de la POO.
 * une function prototypée, c'est comme une méthode de classe classique.
 * oui, la syntaxe est dégueu. #dealwithit
 *
 * glhf
 */



/**
 * Key codes used by the game
 * @type {Object}
 */
window.KEY_CODES = {
	W: 87,
	S: 83,
	I: 73,
	K: 75
};

var Game = function() {
	this.canvas = document.getElementById('game'),
	this.context = this.canvas.getContext('2d');

	/**
	 * The canvas size
	 */
	this.CANVAS_SIZE = {
		WIDTH: 800,
		HEIGHT: 600
	};

	/**
	 * The vertical bounds the paddles can go
	 * @type {Object}
	 */
	this.PADDLE_LIMITS = {
		MIN: 10,
		MAX: 600
	};

	/**
	 * The paddle sizes
	 * @type {Object}
	 */
	this.PADDLE_SIZE = {
		WIDTH: 10,
		HEIGHT: 50
	};

	/**
	 * The margin between the edge of the screen and the paddle on both sides
	 * @type {Number}
	 */
	this.PADDLE_Y_MARGIN = 30;

	this.paddles = [300, 300];

	/**
	 * Start drawing loop (30 FPS)
	 */
	setInterval(this.draw.bind(this), 1000/30);
}

/**
 * Clears the screen and renders a new frame
 */
Game.prototype.draw = function() {
	// Clear screen
	this.context.moveTo(0, 0);
	this.context.fillStyle = "black";
	this.context.fillRect(0, 0, this.CANVAS_SIZE.WIDTH, this.CANVAS_SIZE.HEIGHT);

	this.drawPaddles();
	this.drawBall();
	this.drawUI();
};

/**
 * Draws the paddles on screen. Called from draw()
 */
Game.prototype.drawPaddles = function() {
	this.context.moveTo(0, 0);
	this.context.fillStyle = "white";

	// Draw P1 paddle
	this.context.fillRect(
		this.PADDLE_Y_MARGIN, 
		this.paddles[0], 
		this.PADDLE_SIZE.WIDTH, 
		this.PADDLE_SIZE.HEIGHT
	);

	// Draw P2 paddle
	this.context.fillRect(
		this.CANVAS_SIZE.WIDTH - this.PADDLE_SIZE.WIDTH - this.PADDLE_Y_MARGIN, 
		this.paddles[1], 
		this.PADDLE_SIZE.WIDTH, 
		this.PADDLE_SIZE.HEIGHT
	);
};

/**
 * Draws the ball on screen. Called from draw()
 */
Game.prototype.drawBall = function() {

};

/**
 * Draws the UI on screen. Called from draw()
 */
Game.prototype.drawUI = function() {

};


/**
 * Start the game
 */
var game = new Game();

/**
 * Handle mouse down events
 * @param {MouseEvent} e
 */
window.onkeydown = function(e) {
	// You can call the game here using the `game` global var

	switch(e.keyCode) {
		case this.KEY_CODES.W:
			console.log('W down');
			break;
		case this.KEY_CODES.S:
			console.log('S down');
			break;
		case this.KEY_CODES.I:
			console.log('I down');
			break;
		case this.KEY_CODES.K:
			console.log('K down');
			break;
	}
};

/**
 * Handle mouse up events
 * @param {MouseEvent} e
 */
window.onkeyup = function(e) {
	// You can call the game here using the `game` global var

	switch(e.keyCode) {
		case this.KEY_CODES.W:
			console.log('W up');
			break;
		case this.KEY_CODES.S:
			console.log('S up');
			break;
		case this.KEY_CODES.I:
			console.log('I up');
			break;
		case this.KEY_CODES.K:
			console.log('K up');
			break;
	}
};
