// GoBoard.js
// thomas.h.zhang
// 2008-08-24


// 类的定义
function GoBoardPlay()
{
	this.dp = 32;		// display pix
	this.dw = 19;		// display width
	this.dh = 19;		// display height
	this.BoardSize = 19;	// 棋盘大小, 默认为19*19
	this.goGame = new GoGame(this.BoardSize);
	this.goGame.Init();
	this.goJudgement = new GoJudgement(this.BoardSize, this.goGame.GetStoneArray());
	this.goJudgement.Init();
}


// 在JavaScript中实现简单的继承
// 将GoBoardPlay的原型指向GoBoard的一个实例
// 因为GoBoard的实例可以调用GoBoard原型中的方法, 所以GoBoardPlay的实例也可以调用GoBoard原型中的所有属性。
GoBoardPlay.prototype = new GoBoard();


// 在界面上删除棋子
GoBoard.prototype.RemoveStone = function(i,j) 
{
	this.DrawStone(i,j,__None_Stone);
}


// 鼠标点击事件
GoBoard.prototype.OnMouseClick = function(i,j)
{
	// 棋盘上此点无棋子
	if(this.goGame.GetColor(i,j)==0)
	{
		if(this.goGame.GetStep()%2==0)
		{
			this.goGame.SetColor(i,j,__Black_Stone);
			this.DrawStone(i,j,__Black_Stone);
		} else {
			this.goGame.SetColor(i,j,__White_Stone);
			this.DrawStone(i,j,__White_Stone);
		}
		
		var num = this.goJudgement.CountPonnuki(i,j);
		if (num > 0) {
			alert("有提子,提子个数:"+num);
			//goJudgement.PrintPonnuki();
						
			var ponnukiArray = this.goJudgement.GetPonnukiArray();
			for (var m=0; m<this.BoardSize; m++)
				for (var n=0; n<this.BoardSize; n++)
				{
					if(ponnukiArray[m][n]==true)
					{
						// 提子为劫争点 
						if (num==1)
						{
							if (m==this.goJudgement.GetKoI() && n==this.goJudgement.GetKoJ())
							{
								alert("请寻劫后再提子!");
								this.goGame.SetColor(i,j,__None_Stone);
								this.RemoveStone(i,j);
							} else {
								this.goGame.SetColor(m,n,__None_Stone);
								this.RemoveStone(m,n);
								this.goJudgement.SetKo(i, j);
								this.goGame.StepForward();
							}
						} else {
							this.goGame.SetColor(m,n,__None_Stone);
							this.RemoveStone(m,n);
						}
					}
				}
					
			if (num != 1)
			{
				this.goGame.StepForward();
				this.goJudgement.SetKo(19, 19);
			}
		} else {
			num = this.goJudgement.CountSelfPonnukiNum(i,j);
			if (num > 0) {
				alert("不允许自提子,自提子个数:"+num);
				//goJudgement.PrintPonnuki();
			
				this.goGame.SetColor(i,j,__None_Stone);
				this.RemoveStone(i,j);
			} else {
				this.goGame.StepForward();
				this.goJudgement.SetKo(19, 19);
			}
		}
	}
}


GoBoard.prototype.RegisterMouseDownListener = function(spaceTd, i, j)
{
	var thisRef = this;
	spaceTd.onmousedown = function(){
		thisRef.OnMouseClick(i, j);
	};
}


GoBoard.prototype.UnRegisterMouseDownListener = function(spaceTd, i, j)
{
	spaceTd.onmousedown = function(){
	};
}


// mode = 'edit', 'view', 'playing';
GoBoard.prototype.SetMode = function(mode)
{
	for(var i=0; i<this.dh; i++){
		for(var j=this.BoardSize-this.dw; j<this.BoardSize; j++){
			var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i + "_" + j);
			if (mode == 'playing'){
				this.RegisterMouseDownListener(spaceTd, i, j);
			}else if (mode == 'view'){
				this.UnRegisterMouseDownListener(spaceTd, i, j);
			}
		}
	}
}