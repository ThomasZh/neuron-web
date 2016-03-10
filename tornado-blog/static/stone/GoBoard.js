// GoBoard.js
// thomas.h.zhang
// 2009-04-23

__Max_Size = 19;
__Last_Mark = '\uff00';

// class define
function GoBoard(dp, dw, dh, boardSize) {
	this.dp = dp; // display pix
	this.dw = dw; // display width
	this.dh = dh; // display height
	this.BoardSize = boardSize; // default size=19*19, must be boardSize%2==1
	this.goGame = new GoGame(this.BoardSize);
	this.goGame.Init();
	this.inputItem = null;
	this.activeTd = null;
	this.parentId = null;
}

// initlization
GoBoard.prototype.Init = function(parentId) {
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
	parentVar.appendChild(boardTable);

	for ( var i = 0; i < this.dh; i++) {
		var spaceTr = document.createElement("tr");
		var spaceTbody = document.createElement("tbody");
		spaceTbody.appendChild(spaceTr); // in IE must take a tbody between table and tr
		boardTable.appendChild(spaceTbody);
		for ( var j = this.BoardSize - this.dw; j < this.BoardSize; j++) {
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
};

GoBoard.prototype.RegisterMouseDownListener = function(spaceTd, i, j) {
	var thisRef = this;
	spaceTd.onmousedown = function() {
		thisRef.ChangeToText(i, j);
	};
};

GoBoard.prototype.UnRegisterMouseDownListener = function(spaceTd, i, j) {
	spaceTd.onmousedown = function() {
	};
};

GoBoard.prototype.RegisterDblclickListener = function(spaceTd, i, j) {
	var thisRef = this;
	spaceTd.ondblclick = function() {
		thisRef.ChangeToEdit(i, j);
	};
};

GoBoard.prototype.UnRegisterDblclickListener = function(spaceTd, i, j) {
	spaceTd.ondblclick = function() {
	};
};

GoBoard.prototype.RegisterContextmenuListener = function(spaceTd, i, j) {
	var thisRef = this;
	spaceTd.oncontextmenu = function() {
		thisRef.ChangeStone(i, j);
	};
};

GoBoard.prototype.UnRegisterContextmenuListener = function(spaceTd, i, j) {
	spaceTd.oncontextmenu = function() {
	};
};

// draw stone
GoBoard.prototype.DrawStone = function(i, j, color) {
	var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i
			+ "_" + j);

	if (color == __None_Stone)
		this.DrawNoneStone(spaceTd, i, j);
	else if (color == __Black_Stone)
		this.DrawBlackStone(spaceTd, i, j);
	else if (color == __White_Stone)
		this.DrawWhiteStone(spaceTd, i, j);
};

// draw null stone
GoBoard.prototype.DrawNoneStone = function(spaceTd, i, j) {
	this.goGame.SetColor(i, j, __None_Stone);

	if (i == 0) {
		if (j == 0) {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/top-left.png");
		} else if (j == (this.BoardSize - 1)) {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/top-right.png");
		} else {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/top.png");
		}
	} else if (i == (this.BoardSize - 1)) {
		if (j == (this.BoardSize - 1)) {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/bottom-right.png");
		} else if (i == (this.BoardSize - 1) && j == 0) {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/bottom-left.png");
		} else {
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/bottom.png");
		}
	} else if (i == 3
			&& (j == 3 || j == (this.BoardSize - 1) / 2 || j == (this.BoardSize - 4))) {
		if (this.BoardSize == __Max_Size)
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/star.png");
		else if (j == (this.BoardSize - 1) / 2)
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/cross.png");
		else
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/star.png");
	} else if (i == (this.BoardSize - 1) / 2
			&& (j == 3 || j == (this.BoardSize - 1) / 2 || j == (this.BoardSize - 4))) {
		if (this.BoardSize == __Max_Size)
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/star.png");
		else if (j == (this.BoardSize - 4) || j == 3)
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/cross.png");
		else
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/star.png");
	} else if (i == (this.BoardSize - 4)
			&& (j == 3 || j == (this.BoardSize - 1) / 2 || j == (this.BoardSize - 4))) {
		if (this.BoardSize == __Max_Size)
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/star.png");
		else if (j == (this.BoardSize - 1) / 2)
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/cross.png");
		else
			spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
					+ "/star.png");
	} else if (j == 0) {
		spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
				+ "/left.png");
	} else if (j == (this.BoardSize - 1)) {
		spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
				+ "/right.png");
	} else {
		spaceTd.setAttribute("background", "static/stone/images/board" + this.dp
				+ "/cross.png");
	}

	spaceTd.style.color = "white";
	if (this.dp > 30)
		spaceTd.style.fontSize = "14px";
	else if (this.dp < 30)
		spaceTd.style.fontSize = "10px";
};

// draw black stone
GoBoard.prototype.DrawBlackStone = function(spaceTd, i, j) {
	this.goGame.SetColor(i, j, __Black_Stone);
	spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/black.png");
	spaceTd.style.color = "white";
};

// draw white stone
GoBoard.prototype.DrawWhiteStone = function(spaceTd, i, j) {
	this.goGame.SetColor(i, j, __White_Stone);
	spaceTd.setAttribute("background", "static/stone/images/board" + this.dp + "/white.png");
	spaceTd.style.color = "black";
};

// draw text
GoBoard.prototype.DrawText = function(i, j, text) {
	if (text == null || text == __None_Text)
		text = '';

	var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i
			+ "_" + j);
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
};

// click mouse's right button
GoBoard.prototype.ChangeStone = function(i, j) {
	var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i
			+ "_" + j);
	var color = this.goGame.GetColor(i, j);

	if (color == __None_Stone)
		this.DrawBlackStone(spaceTd, i, j);
	else if (color == __Black_Stone)
		this.DrawWhiteStone(spaceTd, i, j);
	else if (color == __White_Stone)
		this.DrawNoneStone(spaceTd, i, j);
};

// edit board, input text
GoBoard.prototype.ChangeToEdit = function(i, j) {
	var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i
			+ "_" + j);
	var str = this.goGame.GetText(i, j);

	if (this.inputItem == null) {
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
	if (str == __None_Text)
		str = "";
	this.inputItem.value = str; // draw text on board

	spaceTd.innerHTML = ""; // clean the board
	spaceTd.appendChild(this.inputItem);
	this.inputItem.focus();
	this.activeTd = spaceTd;
};

// click mouse's left button, change the edit mode to normal mode
GoBoard.prototype.ChangeToText = function(i, j) {
	var spaceTd = document.getElementById(this.parentId + "StoneSpace_" + i
			+ "_" + j);
	// if edit this board, canel the edit mode, and save the edit text
	if (this.activeTd)
		if (spaceTd != this.activeTd) {
			var str = this.inputItem.value;
			var spaceId = this.activeTd.getAttribute("id");
			var Array = spaceId.split("_");
			this.goGame.SetText(Array[1], Array[2], str);
			this.activeTd.innerHTML = str;
			this.inputItem.style.display = "none";
			this.activeTd = null;
		}
};

GoBoard.prototype.GetGoGame = function() {
	return this.goGame;
};

GoBoard.prototype.Clone = function(goGameA) {
	this.goGame.Clone(goGameA);
};

// initlization
GoBoard.prototype.UpdateUI = function() {
	for ( var i = 0; i < this.dh; i++)
		for ( var j = this.BoardSize - this.dw; j < this.BoardSize; j++) {
			var color = this.goGame.GetColor(i, j);
			this.DrawStone(i, j, color);
			var str = this.goGame.GetText(i, j);
			this.DrawText(i, j, str);
		}
};

__Mode_Playing_Black = 1;
__Mode_Playing_White = -1;
__Mode_View = 0;
__Mode_Edit = 10;

// mode = 'edit', 'view', 'playing';
GoBoard.prototype.SetMode = function(mode) {
	for ( var i = 0; i < this.dh; i++)
		for ( var j = this.BoardSize - this.dw; j < this.BoardSize; j++) {
			var spaceTd = document.getElementById(this.parentId + "StoneSpace_"
					+ i + "_" + j);
			switch (mode) {
			case __Mode_Playing_Black:
			case __Mode_Playing_White:
				this.RegisterMouseDownListener(spaceTd, i, j);
				break;
			case __Mode_Edit:
				this.RegisterMouseDownListener(spaceTd, i, j);
				this.RegisterDblclickListener(spaceTd, i, j);
				this.RegisterContextmenuListener(spaceTd, i, j);
				break;
			case __Mode_View:
			default:
				this.UnRegisterMouseDownListener(spaceTd, i, j);
				this.UnRegisterDblclickListener(spaceTd, i, j);
				this.UnRegisterContextmenuListener(spaceTd, i, j);
				break;
			}
		}
};

// clear all text
GoBoard.prototype.ClearAllText = function() {
	for ( var i = 0; i < this.dh; i++)
		for ( var j = this.BoardSize - this.dw; j < this.BoardSize; j++)
			this.DrawText(i, j, __None_Text);
};

// clear all stone
GoBoard.prototype.ClearAllStone = function() {
	for ( var i = 0; i < this.dh; i++)
		for ( var j = this.BoardSize - this.dw; j < this.BoardSize; j++)
			this.DrawStone(i, j, __None_Stone);
};

GoBoard.prototype.Back = function() {
	var lastStep = this.goGame.StepArray[this.StepCursor - 1];
	if (lastStep != null) {
		this.DrawStone(lastStep[0], lastStep[1], __None_Stone);
		this.DrawText(lastStep[0], lastStep[1], __None_Text);
		this.StepCursor--;

		var ponnukiArray = this.goGame.StepPonnukiArray[this.StepCursor];
		if (ponnukiArray != null && ponnukiArray.length > 0)
			for ( var i = 0; i < ponnukiArray.length; i++) {
				if (this.StepCursor % 2 == 0)
					this.DrawStone(ponnukiArray[i][0], ponnukiArray[i][1],
							__White_Stone);
				else
					this.DrawStone(ponnukiArray[i][0], ponnukiArray[i][1],
							__Black_Stone);
			}

		var last2Step = this.goGame.StepArray[this.StepCursor - 1];
		if (last2Step != null)
			this.DrawText(last2Step[0], last2Step[1], __Last_Mark);
	}
};

GoBoard.prototype.Forward = function() {
	var nextStep = this.goGame.StepArray[this.StepCursor];
	if (nextStep != null) {
		this.DrawText(nextStep[0], nextStep[1], __Last_Mark);
		if (this.StepCursor % 2 == 0)
			this.DrawStone(nextStep[0], nextStep[1], __Black_Stone);
		else
			this.DrawStone(nextStep[0], nextStep[1], __White_Stone);

		var ponnukiArray = this.goGame.StepPonnukiArray[this.StepCursor];
		if (ponnukiArray != null && ponnukiArray.length > 0)
			for ( var i = 0; i < ponnukiArray.length; i++)
				this.DrawStone(ponnukiArray[i][0], ponnukiArray[i][1],
						__None_Stone);

		var lastStep = this.goGame.StepArray[this.StepCursor - 1];
		if (lastStep != null)
			this.DrawText(lastStep[0], lastStep[1], __None_Text);

		this.StepCursor++;
	}
};

GoBoard.prototype.First = function() {
	var lastStep = this.goGame.StepArray[this.StepCursor - 1];
	if (lastStep != null) {
		this.DrawText(lastStep[0], lastStep[1], __None_Text);
		this.StepCursor = 0;

		this.ClearAllStone();
	}
};

GoBoard.prototype.Last = function() {
	while (this.StepCursor < this.goGame.StepCount)
		this.Forward();
};

GoBoard.prototype.GotoStep = function(num) {
	this.First();
	while (this.StepCursor < num)
		this.Forward();
};

GoBoard.prototype.ShowNumber = function() {
	for ( var i = 0; i < this.StepCursor; i++) {
		var point = this.goGame.StepArray[i];
		this.DrawText(point[0], point[1], i + 1);
	}
};

GoBoard.prototype.Show20Number = function() {
	var n = this.StepCursor - 20;
	n = n < 0 ? 0 : n;

	for ( var i = n; i < this.StepCursor; i++) {
		var point = this.goGame.StepArray[i];
		if (i == this.StepCursor - 1)
			this.DrawText(point[0], point[1], __Last_Mark);
		else
			this.DrawText(point[0], point[1], i + 1);
	}
};

GoBoard.prototype.HideNumber = function() {
	for ( var i = 0; i < this.StepCursor; i++) {
		var point = this.goGame.StepArray[i];

		if (i == this.StepCursor - 1)
			this.DrawText(point[0], point[1], __Last_Mark);
		else
			this.DrawText(point[0], point[1], __None_Text);
	}
};

//Play Sound
GoBoard.prototype.PlaySound = function(soundobj) {
	var borswer = window.navigator.userAgent.toLowerCase();
    if ( borswer.indexOf( "ie" ) >= 0 ) {
    	//IE内核浏览器
    	var thissound = eval("document." + soundobj);
    	try {
    		thissound.Play();
    	} catch (e) {
    		thissound.DoPlay();
    	}
    } else {
    	//非IE内核浏览器
    	if (soundobj == "clickSound") {
    		var audio = document.getElementById( "audioPlayClick" );
    		//浏览器支持 audion
    		audio.play();
    	} else if (soundobj == "errorSound") {
    		var audio = document.getElementById( "audioPlayError" );
    		//浏览器支持 audion
    		audio.play();
    	} 
    }

};
