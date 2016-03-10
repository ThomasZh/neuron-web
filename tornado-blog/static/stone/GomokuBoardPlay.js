// GomokuBoardPlaying.js
// thomas.h.zhang
// 2012-05-14

// class define
function GomokuBoardPlay() {
	this.dp = 32; // display pix
	this.dw = 15; // display width
	this.dh = 15; // display height
	this.BoardSize = 15; // default size = 15*15
	this.goGame = new GoGame(this.BoardSize);
	this.goGame.Init();
	this.goJudgement = new GomokuJudgement(this.BoardSize, this.goGame
			.GetStoneArray());
	this.goJudgement.Init();
	this.StepCursor = 0;	// cursor for review history
}

//在JavaScript中实现简单的继承
//将GomokuBoardPlay的原型指向GoBoard的一个实例
//因为GomokuBoardPlay的实例可以调用GoBoard原型中的方法, 所以GomokuBoardPlay的实例也可以调用GoBoard原型中的所有属性。
GomokuBoardPlay.prototype = new GoBoard(this.dp, this.dw, this.dh, this.BoardSize);

// remove stone
GoBoard.prototype.RemoveStone = function(i, j) {
	this.DrawStone(i, j, __None_Stone);
};

// add stone
GoBoard.prototype.AddStone = function(i, j) {
	// this point is not empty
	if (this.goGame.GetColor(i, j) != __None_Stone)
		return -1;

	if(this.goGame.GetStepCount()%2 == 0){
		this.goGame.SetColor(i,j,__Black_Stone);
		this.DrawStone(i,j,__Black_Stone);
	} else {
		this.goGame.SetColor(i,j,__White_Stone);
		this.DrawStone(i,j,__White_Stone);
	}

	var num = this.goJudgement.Success(i, j);
	if (num == __Five_in_A_Row) {
		if (this.goGame.GetStepCount() % 2 == 0)
			alert("Black win!");
		else
			alert("White win!");
	}
	
	// unmark the last step. and mark this step.
	var lastStep = this.goGame.GetLastStep();
	if (lastStep != null)
		this.DrawText(lastStep[0], lastStep[1], __None_Text);
	this.DrawText(i, j, __Last_Mark);
	
	this.goGame.StepForward(i, j);
	this.StepCursor++;

	return 0;
};

// click on board
GoBoard.prototype.OnMouseClick = function(i, j) {
	// this point is not empty
	if (this.goGame.GetColor(i, j) != __None_Stone) {
		this.PlaySound("errorSound");
		return;
	}

	this.PlaySound("clickSound");
	this.AddStone(i, j);
};

GoBoard.prototype.RegisterMouseDownListener = function(spaceTd, i, j) {
	var thisRef = this;
	spaceTd.onmousedown = function() {
		thisRef.OnMouseClick(i, j);
	};
};

GoBoard.prototype.UnRegisterMouseDownListener = function(spaceTd, i, j) {
	spaceTd.onmousedown = function() {
	};
};
