/**
 * DONE:
 *
 * - 30 FPS render loop
 * - Paddles are drawn to the position stored in Game.paddles
 * - W/S/I/K event keys are registered and logged in javascript console
 * 
 * - Paddles are moving 
 * - Ball is moving and bouncing on the top/bottom walls
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
     *  The ball size
	 *  @type {object}
	 */ 
	this.BALL_SIZE = {
		WIDTH: 10,
		HEIGHT: 10
	};

	/**
     *  The ball position
	 *  @type {object}
	 */ 
	this.BALL_POS = {
		X: 400,
		Y: 300
	};

	/**
	 * The margin between the edge of the screen and the paddle on both sides
	 * @type {Number}
	 */
	this.PADDLE_Y_MARGIN = 30;

	/**
     *  The ball position (from 0 to 7, 0 is right, 1 is right-down ...)
	 *  @type {Number}
	 */ 
	this.BALL_DIRECTION = 7;

	/**
     *  The score
	 *  @type {Number}
	 */ 
	this.SCORE_LEFT = 0;
	this.SCORE_RIGHT = 0;

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
	this.moveBall();
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
	this.context.moveTo(0, 0);
	this.context.fillStyle = "white";

	this.context.fillRect(
		this.BALL_POS.X,
		this.BALL_POS.Y,
		this.BALL_SIZE.WIDTH,
		this.BALL_SIZE.HEIGHT
	);
};

/**
 * Draws the UI on screen. Called from draw()
 */
Game.prototype.drawUI = function() {

};

/**
 * Moves the ball =. Called from draw()
 */
Game.prototype.moveBall = function() {

	switch(this.BALL_DIRECTION){
		case 0: //right
			this.BALL_POS.X += 5;
			break;
		case 1: //right-down
			this.BALL_POS.X += 4;
			this.BALL_POS.Y += 4;
			break;
		case 2: //down
			this.BALL_POS.Y += 5;
			break;
		case 3: //left-down
			this.BALL_POS.X -= 4;
			this.BALL_POS.Y += 4;
			break;
		case 4: //left
			this.BALL_POS.X -= 5;
			break;
		case 5: //left-up
			this.BALL_POS.X -= 4;
			this.BALL_POS.Y -= 4;
			break;
		case 6: //up
			this.BALL_POS.Y -= 5;
			break;
		case 7: //right-up
			this.BALL_POS.X += 4;
			this.BALL_POS.Y -= 4;
			break;
	}

	if(this.BALL_POS.Y > this.CANVAS_SIZE.HEIGHT - this.BALL_SIZE.HEIGHT && this.BALL_DIRECTION == 2) //down -> bottom
		this.BALL_DIRECTION = 6;
	if(this.BALL_POS.Y < this.BALL_SIZE.HEIGHT && this.BALL_DIRECTION == 6) //bottom -> down
		this.BALL_DIRECTION = 2;
	if(this.BALL_POS.Y < this.BALL_SIZE.HEIGHT && this.BALL_DIRECTION == 5) //left-up -> left-down
		this.BALL_DIRECTION = 3;
	if(this.BALL_POS.Y > this.CANVAS_SIZE.HEIGHT - this.BALL_SIZE.HEIGHT && this.BALL_DIRECTION == 3) //left-down -> left-up
		this.BALL_DIRECTION = 5;
	if(this.BALL_POS.Y > this.CANVAS_SIZE.HEIGHT - this.BALL_SIZE.HEIGHT && this.BALL_DIRECTION == 1) //right-down -> right-up
		this.BALL_DIRECTION = 7;
	if(this.BALL_POS.Y < this.BALL_SIZE.HEIGHT && this.BALL_DIRECTION == 7) //right-up -> right-down
		this.BALL_DIRECTION = 1;
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
			if(game.paddles[0] > game.PADDLE_Y_MARGIN) //move paddle 1 up
				game.paddles[0] -= 10;
			break;
		case this.KEY_CODES.S:
			console.log('S down');
			if(game.paddles[0] < game.CANVAS_SIZE.HEIGHT - game.PADDLE_Y_MARGIN - game.PADDLE_SIZE.HEIGHT) //move paddle 1 down
				game.paddles[0] += 10;
			break;
		case this.KEY_CODES.I:
			console.log('I down');
			if(game.paddles[1] > game.PADDLE_Y_MARGIN) //move paddle 2 up
				game.paddles[1] -= 10;
			break;
		case this.KEY_CODES.K:
			console.log('K down');
			if(game.paddles[1] < game.CANVAS_SIZE.HEIGHT - game.PADDLE_Y_MARGIN - game.PADDLE_SIZE.HEIGHT) //move paddle 2 down
				game.paddles[1] += 10;
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
