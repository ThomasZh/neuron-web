// GoBoardPlay.js
// thomas.h.zhang
// 2008-08-24

// init
function GoBoardPlay() {
	this.dp = 32; // display pix
	this.dw = 19; // display width
	this.dh = 19; // display height
	this.BoardSize = 19; // default size = 19*19
	this.goGame = new GoGame(this.BoardSize);
	this.goGame.Init();
	this.goJudgement = new GoJudgement(this.BoardSize, this.goGame.GetStoneArray());
	this.goJudgement.Init();
	this.StepCursor = 0;	// cursor for review history
}

// 在JavaScript中实现简单的继承
// 将GoBoardPlay的原型指向GoBoard的一个实例
// 因为GoBoard的实例可以调用GoBoard原型中的方法, 所以GoBoardPlay的实例也可以调用GoBoard原型中的所有属性。
GoBoardPlay.prototype = new GoBoard(this.dp, this.dw, this.dh, this.BoardSize);

// remove stone
GoBoard.prototype.RemoveStone = function(i, j) {
	this.DrawStone(i, j, __None_Stone);
};

//add a stone on point(i,j)
GoBoard.prototype.AddStone = function(i,j)
{
	// this point is not empty
	if(this.goGame.GetColor(i,j) != __None_Stone)
		return -1;
		
	if(this.goGame.GetStepCount()%2 == 0){
		this.goGame.SetColor(i,j,__Black_Stone);
		this.DrawStone(i,j,__Black_Stone);
	} else {
		this.goGame.SetColor(i,j,__White_Stone);
		this.DrawStone(i,j,__White_Stone);
	}
	
	var num = this.goJudgement.CountPonnuki(i,j);
	if (num > 0) {
		//alert("有提子,提子个数:"+num);
		//goJudgement.PrintPonnuki();
		
		var array = new Array();
		var count = 0;
		var ponnukiArray = this.goJudgement.GetPonnukiArray();
		for (var m=0; m<this.BoardSize; m++)
			for (var n=0; n<this.BoardSize; n++)
			{
				if (ponnukiArray[m][n] == true){
					if (num == 1){
						// current point is a Ko point
						if (m==this.goJudgement.GetKoI() && n==this.goJudgement.GetKoJ()) {
							this.PlaySound("errorSound");
							alert("请寻劫后再提子!");
							this.goGame.SetColor(i,j,__None_Stone);
							this.RemoveStone(i,j);
							return -1;
						} else {
							this.goGame.SetColor(m,n,__None_Stone);
							this.RemoveStone(m,n);
							this.goJudgement.SetKo(i,j);	// Set as a Ko point
							
							array[0] = [m,n];
						};
					} else {
						this.goGame.SetColor(m,n,__None_Stone);
						this.RemoveStone(m,n);

						array[count] = [m,n];
						count++;
					};
				};
			}
				
		if (num != 1)
			this.goJudgement.SetKo(19, 19); // no Ko point
		
		this.goGame.StepPonnukiArray[this.goGame.StepCount] = array;
	} else { // no ponnuki
		num = this.goJudgement.CountSelfPonnukiNum(i,j);
		if (num > 0) {
			this.PlaySound("errorSound");
			alert("不允许自提子,自提子个数:"+num);
			//goJudgement.PrintPonnuki();
		
			this.goGame.SetColor(i,j,__None_Stone);
			this.RemoveStone(i,j);
			return -1;
		} else 
			this.goJudgement.SetKo(19, 19); // no Ko point
		
		this.goGame.StepPonnukiArray[this.goGame.StepCount] = [];
	}
	
	// unmark the last step. and mark this step.
	var lastStep = this.goGame.GetLastStep();
	if (lastStep != null)
		this.DrawText(lastStep[0], lastStep[1], __None_Text);
	this.DrawText(i, j, __Last_Mark);
	
	this.goGame.StepForward(i, j);
	this.StepCursor++;
	
//	$( "#slider" ).slider('option', 'max', this.StepCursor);
//	$( "#slider" ).slider('option', 'value', this.StepCursor);

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

	// move step(i,j);
//	jQuery.ajax({
//		url : "fancy.go?cmd=move&i=" + i + "&j=" + j + "&step="
//				+ (this.goGame.GetStep() - 1),
//		async : false,
//		dataType : "json",
//		complete : function(data) {
			// print results as appended
			// var responseData = jQuery.parseJSON(data.responseText);
//		}
//	});
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
