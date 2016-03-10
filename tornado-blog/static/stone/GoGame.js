// GoGame.js
// thomas.h.zhang
// 2009-04-23

__Black_Stone = 1;
__White_Stone = -1;
__None_Stone = 0;
__None_Text = "-1";

// class define
function GoGame(boardSize) {
	this.BoardSize = boardSize; // default size=19*19
	this.StoneArray = new Array(); // 1 black, -1 white, 0 space
	this.TextArray = new Array(); // board text
	this.StepCount = 0; // current step
	this.StepArray = new Array(); // step point array
	this.StepPonnukiArray = new Array(); // ponnuki array for every step
}

GoGame.prototype.GetStoneArray = function() {
	return this.StoneArray;
};

GoGame.prototype.GetTextArray = function() {
	return this.TextArray;
};

// initilization
GoGame.prototype.Init = function() {
	for ( var i = 0; i < this.BoardSize; i++) {
		this.StoneArray[i] = new Array();
		this.TextArray[i] = new Array();

		for ( var j = 0; j < this.BoardSize; j++) {
			// 0=null
			this.StoneArray[i][j] = __None_Stone;
			// text="-1"
			this.TextArray[i][j] = __None_Text;
		}
	}
};

// 1 black, -1 white, 0 space
GoGame.prototype.GetColor = function(i, j) {
	return this.StoneArray[i][j];
};

// 1 black, -1 white, 0 space
GoGame.prototype.SetColor = function(i, j, color) {
	this.StoneArray[i][j] = color;
};

// get(i,j) text
GoGame.prototype.GetText = function(i, j) {
	return this.TextArray[i][j];
};

// set(i,j) text
GoGame.prototype.SetText = function(i, j, str) {
	this.TextArray[i][j] = str;
};

// Clone
GoGame.prototype.Clone = function(goGameA) {
	this.StepCount = goGameA.StepCount;
	this.BoardSize = goGameA.BoardSize;

	var stoneArray = goGameA.StoneArray;
	var textArray = goGameA.TextArray;
	for ( var i = 0; i < this.BoardSize; i++)
		for ( var j = 0; j < this.BoardSize; j++) {
			this.StoneArray[i][j] = stoneArray[i][j];
			this.TextArray[i][j] = textArray[i][j];
		}

	var stepArray = goGameA.StepArray;
	for ( var k = 0; k < stepArray.length; k++)
		this.StepArray[k] = stepArray[k];

	var stepPonnukiArray = goGameA.StepPonnukiArray;
	for ( var k = 0; k < stepArray.length; k++)
		this.StepPonnukiArray[k] = stepPonnukiArray[k];
};

// get current step count
GoGame.prototype.GetStepCount = function() {
	return this.StepCount;
};

// get last two step
GoGame.prototype.GetLastStep = function() {
	return this.StepArray[this.StepCount - 1];
};

// next step
GoGame.prototype.StepForward = function(i, j) {
	this.StepArray[this.StepCount] = [ i, j ];
	this.StepCount++;
};
