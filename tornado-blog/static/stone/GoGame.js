// GoGame.js
// thomas.h.zhang
// 2009-04-23


__Black_Stone = 1;
__White_Stone = -1;
__None_Stone = 0;


// class define
function GoGame(boardSize)
{
	this.BoardSize = boardSize;         // default size=19*19
	this.StoneArray = new Array();      // 1 black, -1 white, 0 space
	this.TextArray = new Array();       // board text
	this.StepCount = 0;	// 目前棋局的步数
}


GoGame.prototype.GetStoneArray = function()
{
	return this.StoneArray;
}


GoGame.prototype.GetTextArray = function()
{
	return this.TextArray;
}


// initilization
GoGame.prototype.Init = function()
{
	for(var i=0; i<this.BoardSize; i++){
		this.StoneArray[i] = new Array();
		this.TextArray[i] = new Array();

		for(var j=0; j<this.BoardSize; j++){
			// 0=null
			this.StoneArray[i][j] = __None_Stone;
			// text="-1"
			this.TextArray[i][j] = "-1";
		}
	}
}


// 1 black, -1 white, 0 space
GoGame.prototype.GetColor = function(i, j)
{
	return this.StoneArray[i][j];
}


// 1 black, -1 white, 0 space
GoGame.prototype.SetColor = function(i, j, color)
{
	this.StoneArray[i][j] = color;
}


// get(i,j) text
GoGame.prototype.GetText = function(i, j)
{
	return this.TextArray[i][j];
}


// set(i,j) text
GoGame.prototype.SetText = function(i, j, str)
{
	this.TextArray[i][j] = str;
}


// 更新棋局
GoGame.prototype.Update = function(goGameA)
{
	this.StepCount = goGameA.StepCount;
	var stoneArray = goGameA.StoneArray;
	var textArray = goGameA.TextArray;

	for(var i=0; i<this.BoardSize; i++){
		for(var j=0; j<this.BoardSize; j++){
			this.StoneArray[i][j] = stoneArray[i][j];
			this.TextArray[i][j] = textArray[i][j];
		}
	}
}


// 取得目前棋局的步数
GoGame.prototype.GetStep = function()
{
	return this.StepCount;
}


// 目前棋局的步数+1
GoGame.prototype.StepForward = function()
{
	this.StepCount++;
}
