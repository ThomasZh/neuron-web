// GoBoard.js
// thomas.h.zhang
// 2009-04-23


// class define
function GoBoard(dp, dw, dh)
{
	this.dp = dp;		// display pix
	this.dw = dw;		// display width
	this.dh = dh;		// display height
	this.BoardSize = 19;	// default size=19*19
	this.goGame = new GoGame(this.BoardSize);
	this.goGame.Init();
	this.inputItem = null;
	this.activeTd = null;
	this.parentId = null;
}


// initlization
GoBoard.prototype.Init = function(parentId)
{
	this.parentId = parentId;
	var parentVar = document.getElementById(parentId);
	var boardTable = document.createElement("table");
	boardTable.setAttribute("id", this.parentId + "GoBoardTable");
	boardTable.setAttribute("width", this.dw * this.dp);
	boardTable.setAttribute("height", this.dh * this.dp);
	boardTable.setAttribute("align", "left");
	boardTable.setAttribute("cellSpacing", 0);
	boardTable.setAttribute("cellPadding", 0);
	boardTable.setAttribute("topmargin", 0);
	boardTable.setAttribute("leftmargin", 0);
	boardTable.setAttribute("border", 0);
	parentVar.appendChild(boardTable);
	
	for(var i=0; i<this.dh; i++){
		var spaceTr = document.createElement("tr");
		var spaceTbody = document.createElement("tbody"); 
		spaceTbody.appendChild(spaceTr);	// in IE must take a tbody between table and tr
		boardTable.appendChild(spaceTbody);
		for(var j=this.BoardSize-this.dw; j<this.BoardSize; j++){
			var spaceTd = document.createElement("td");
			var spaceId = this.parentId + "StoneSpace_" + i + "_" + j;
			spaceTd.setAttribute("id", spaceId);
			spaceTd.setAttribute("width", this.dp);
			spaceTd.setAttribute("height", this.dp);
			spaceTd.setAttribute("align", "center");
			spaceTd.setAttribute("valign", "middle");
			if (this.dp > 30)
				spaceTd.style.fontSize = "14px";
			else if (this.dp < 30)
				spaceTd.style.fontSize = "10px";
			spaceTr.appendChild(spaceTd);

			var color = this.goGame.GetColor(i, j);
			this.DrawStone(i, j, color);
			var txt = this.goGame.GetText(i, j);
			this.DrawText(i, j, txt);
		}
	}
}


GoBoard.prototype.RegisterMouseDownListener = function(spaceTd, i, j)
{
	var thisRef = this;
	spaceTd.onmousedown = function(){
		thisRef.ChangeToText(i, j);
	};
}
GoBoard.prototype.UnRegisterMouseDownListener = function(spaceTd, i, j)
{
	spaceTd.onmousedown = function(){
	};
}


GoBoard.prototype.RegisterDblclickListener = function(spaceTd, i, j)
{
	var thisRef = this;
	spaceTd.ondblclick = function(){
		thisRef.ChangeToEdit(i, j);
	};
}
GoBoard.prototype.UnRegisterDblclickListener = function(spaceTd, i, j)
{
	spaceTd.ondblclick = function(){
	};
}


GoBoard.prototype.RegisterContextmenuListener = function(spaceTd, i, j)
{
	var thisRef = this;
	spaceTd.oncontextmenu = function(){
		thisRef.ChangeStone(i, j);
	};
}
GoBoard.prototype.UnRegisterContextmenuListener = function(spaceTd, i, j)
{
	spaceTd.oncontextmenu = function(){
	};
}


// draw stone
GoBoard.prototype.DrawStone = function(i, j, color)
{
	var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i + "_" + j);

	if (color == __None_Stone)
		this.DrawNoneStone(spaceTd, i, j);
	else if (color == __Black_Stone)
		this.DrawBlackStone(spaceTd, i, j);
	else if (color == __White_Stone)
		this.DrawWhiteStone(spaceTd, i, j);
}


// draw null stone
GoBoard.prototype.DrawNoneStone = function(spaceTd, i, j)
{
	this.goGame.SetColor(i, j, __None_Stone);

	if (i == 0) {
		if (j == 0) {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/top-left.png");
		} else if (j == 18) {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/top-right.png");
		} else {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/top.png");
		}
	} else if (i == 18) {
		if (j == 18) {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/bottom-right.png");
		} else if (i == 18 && j == 0) {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/bottom-left.png");
		} else {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/bottom.png");
		}
	} else if (i == 3 && (j == 3 || j == 9 || j == 15)) {
		spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/star.png");
	} else if (i == 9 && (j == 3 || j == 9 || j == 15)) {
		spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/star.png");
	} else if (i == 15 && (j == 3 || j == 9 || j == 15)) {
		spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/star.png");
	} else if (j == 0) {
		spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/left.png");
	} else if (j == 18) {
		spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/right.png");
	} else {
		spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/cross.png");
	}
	
	spaceTd.style.color = "white";
	if (this.dp > 30)
		spaceTd.style.fontSize = "14px";
	else if (this.dp < 30)
		spaceTd.style.fontSize = "10px";
}


// draw black stone
GoBoard.prototype.DrawBlackStone = function(spaceTd, i, j)
{
	this.goGame.SetColor(i, j, __Black_Stone);
	spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/black.png");
	spaceTd.style.color = "white";
}


// draw white stone
GoBoard.prototype.DrawWhiteStone = function(spaceTd, i, j)
{
	this.goGame.SetColor(i, j, __White_Stone);
	spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/white.png");
	spaceTd.style.color = "black";
}


// draw text
GoBoard.prototype.DrawText = function(i, j, text)
{
	if (text == null || text == "-1")
		text = '';

	var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i + "_" + j);
	this.goGame.SetText(i, j, text);
	spaceTd.innerHTML = text;
  
	var stoneColor = this.goGame.GetColor(i, j);
	if (stoneColor == __Black_Stone)
		spaceTd.style.color = "white";
	else if (stoneColor == __White_Stone)
		spaceTd.style.color = "black";
	else if (stoneColor == __None_Stone)
		spaceTd.style.color = "white";
	else
		spaceTd.style.color = "white";
}


// click mouse's right button
GoBoard.prototype.ChangeStone = function(i, j)
{
	var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i + "_" + j);
	var color = this.goGame.GetColor(i, j);
	
	if (color == __None_Stone)
		this.DrawBlackStone(spaceTd, i, j);
	else if (color == __Black_Stone)
		this.DrawWhiteStone(spaceTd, i, j);
	else if (color == __White_Stone)
		this.DrawNoneStone(spaceTd, i, j);
}


// edit board, input text
GoBoard.prototype.ChangeToEdit = function(i, j)
{
	var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i + "_" + j);
	var str = this.goGame.GetText(i, j);

	if (this.inputItem == null){
		this.inputItem = document.createElement("input");
		this.inputItem.type = "text";
		this.inputItem.style.width = "100%";
		this.inputItem.style.height = "18px";
		if (this.dp > 30)
			this.inputItem.style.fontSize = "14px";
		else if (this.dp < 30)
			this.inputItem.style.fontSize = "10px";
	}
 	this.inputItem.style.display = "inline";
	if (str == "-1")
		str = "";
	this.inputItem.value = str; // draw text on board

	spaceTd.innerHTML = ""; // clean the board
	spaceTd.appendChild(this.inputItem);
	this.inputItem.focus();
	this.activeTd = spaceTd;
}


// click mouse's left button, change the edit mode to normal mode
GoBoard.prototype.ChangeToText = function(i, j)
{
	var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i + "_" + j);
	// if edit this board, canel the edit mode, and save the edit text
	if (this.activeTd){
		if (spaceTd != this.activeTd){
			var str = this.inputItem.value;
			var spaceId = this.activeTd.getAttribute("id");
			var Array = spaceId.split("_");
			this.goGame.SetText(Array[1],Array[2],str);
			this.activeTd.innerHTML = str;
			this.inputItem.style.display = "none";
			this.activeTd = null;
		}
	}
}


GoBoard.prototype.GetGoGame = function()
{
	return this.goGame;
}


GoBoard.prototype.SetGoGame = function(goGameA)
{
	this.goGame.Update(goGameA);
}


// initlization
GoBoard.prototype.UpdateUI = function()
{
	for(var i=0; i<this.dh; i++){
		for(var j=this.BoardSize-this.dw; j<this.BoardSize; j++){
			var color = this.goGame.GetColor(i, j);
			this.DrawStone(i, j, color);
			var str = this.goGame.GetText(i, j);
			this.DrawText(i, j, str);
		}
	}
}


// clear text
GoBoard.prototype.ClearText = function()
{
	for(var i=0; i<this.dh; i++){
		for(var j=this.BoardSize-this.dw; j<this.BoardSize; j++){
			this.DrawText(i, j, "-1");
		}
	}
}


// mode = 'edit', 'view';
GoBoard.prototype.SetMode = function(mode)
{
	for(var i=0; i<this.dh; i++){
		for(var j=this.BoardSize-this.dw; j<this.BoardSize; j++){
			var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i + "_" + j);
			if (mode == 'edit'){
				this.RegisterMouseDownListener(spaceTd, i, j);
				this.RegisterDblclickListener(spaceTd, i, j);
				this.RegisterContextmenuListener(spaceTd, i, j);
			}else if (mode == 'view'){
				this.UnRegisterMouseDownListener(spaceTd, i, j);
				this.UnRegisterDblclickListener(spaceTd, i, j);
				this.UnRegisterContextmenuListener(spaceTd, i, j);			
			}
		}
	}
}