// GoJudgement.js
// thomas.h.zhang
// 2008-06-28

// class define
function GoJudgement(boardSize, stoneArray) {
	this.BoardSize = boardSize; // default 19*19
	this.KoI = 19; // 设置劫争点为(19,19), 即此点目前不存在
	this.KoJ = 19;

	this.StoneArray = stoneArray; // 棋盘上的棋子数组: 1 black, -1 white, 0 space
	this.LibertyArray = new Array(); // 棋盘上的棋子拥有的气数组: 0,1,2,3,4
	this.LibertyFlagArray = new Array(); // 气已经计算完毕，不必重复计算此子了
	this.AroundCountArray = new Array(); // 某棋子周围棋子个数, 边缘、异色++
	this.SelfPonnukiArray = new Array(); // 临时存储提子的数组
	this.PonnukiArray = new Array(); // 存储提子的数组
};

// initializtion
GoJudgement.prototype.Init = function() {
	for ( var i = 0; i < this.BoardSize; i++) {
		// 初始化棋盘上的棋子数组
		this.LibertyArray[i] = new Array();
		this.LibertyFlagArray[i] = new Array();
		this.AroundCountArray[i] = new Array();
		this.PonnukiArray[i] = new Array();
		this.SelfPonnukiArray[i] = new Array();

		for ( var j = 0; j < this.BoardSize; j++) {
			// 初始化棋盘上的棋子数组 0=null
			this.LibertyArray[i][j] = 0;
			this.LibertyFlagArray[i][j] = false;
			this.AroundCountArray[i][j] = 0;
			this.PonnukiArray[i][j] = false;
			this.SelfPonnukiArray[i][j] = false;
		}
	}
};

// 清除临时提子列表
GoJudgement.prototype.CleanSelfLiberty = function() {
	for ( var i = 0; i < this.BoardSize; i++)
		for ( var j = 0; j < this.BoardSize; j++)
			this.SelfPonnukiArray[i][j] = false;
};

// 清除提子列表
GoJudgement.prototype.CleanLiberty = function() {
	for ( var i = 0; i < this.BoardSize; i++)
		for ( var j = 0; j < this.BoardSize; j++)
			this.PonnukiArray[i][j] = false;
};

// 清除某棋子周围棋子个数
GoJudgement.prototype.CleanAroundCount = function() {
	for ( var i = 0; i < this.BoardSize; i++)
		for ( var j = 0; j < this.BoardSize; j++)
			this.AroundCountArray[i][j] = 0;
};

// 清除某棋子气已经计算完毕标志־
GoJudgement.prototype.CleanLibertyFlag = function() {
	for ( var i = 0; i < this.BoardSize; i++)
		for ( var j = 0; j < this.BoardSize; j++)
			this.LibertyFlagArray[i][j] = false;
};

// 将临时提子列表追加入提子列表
GoJudgement.prototype.AppendLiberty = function() {
	for ( var i = 0; i < this.BoardSize; i++)
		for ( var j = 0; j < this.BoardSize; j++)
			if (this.SelfPonnukiArray[i][j] == true)
				this.PonnukiArray[i][j] = true;
};

// 计算某子周围的气
GoJudgement.prototype.CountLiberty = function(i, j) {
	var result = 0;

	// (i-1,j)不在棋盘外 && 没有子
	if ((i - 1) >= 0 && this.GetColor(i - 1, j) == 0)
		result++;
	// (i+1,j)不在棋盘外 && 没有子
	if ((i + 1) < this.BoardSize && this.GetColor(i + 1, j) == 0)
		result++;
	// (i,j-1)不在棋盘外 && 没有子
	if ((j - 1) >= 0 && this.GetColor(i, j - 1) == 0)
		result++;
	// (i,j+1)不在棋盘外 && 没有子
	if ((j + 1) < this.BoardSize && this.GetColor(i, j + 1) == 0)
		result++;

	return result;
};

// 计算棋盘上所有子的气, 存入数组LibertyArray中
GoJudgement.prototype.CountAllLiberty = function() {
	for ( var i = 0; i < this.BoardSize; i++)
		for ( var j = 0; j < this.BoardSize; j++)
			this.LibertyArray[i][j] = this.CountLiberty(i, j);
};

// 设置劫争点
GoJudgement.prototype.SetKo = function(i, j) {
	this.KoI = i;
	this.KoJ = j;
};

// 取得劫争点坐标i
GoJudgement.prototype.GetKoI = function() {
	return this.KoI;
};

// 取得劫争点坐标j
GoJudgement.prototype.GetKoJ = function() {
	return this.KoJ;
};

// 取得(i,j)坐标处棋子的颜色: 1 black, -1 white, 0 space
GoJudgement.prototype.GetColor = function(i, j) {
	return this.StoneArray[i][j];
};

// 设置(i,j)坐标处棋子的颜色: 1 black, -1 white, 0 space
GoJudgement.prototype.SetColor = function(i, j, color) {
	this.StoneArray[i][j] = color;
};

// 计算自提子
// param: 起始point(i,j)
// return: 0 没有死子, n 死子个数
// 递归函数
// 核心函数, GoGameObject类的精髓所在
GoJudgement.prototype.CountSelfPonnuki = function(i, j) {
	var result = 0; // 计算结果
	var count = 0;

	// 第一个条件便是此子没有气
	if (this.LibertyArray[i][j] != 0)
		return result; // 有气

	// 标记此子已经计算完毕，不必重复计算此子了
	this.LibertyFlagArray[i][j] = true;

	// (i-1,j)
	if ((i - 1) < 0) // out side
		this.AroundCountArray[i][j]++;
	else {
		if ((this.GetColor(i, j) + this.GetColor(i - 1, j)) == 0) // different color
			this.AroundCountArray[i][j]++;
		else { // same color
			if (this.LibertyFlagArray[i - 1][j] == true)  // completed
				this.AroundCountArray[i][j]++;
			else { // uncompleted
				// (i-1,j) no dead stone
				if ((count = this.CountSelfPonnuki(i - 1, j)) == 0) {
					this.SelfPonnukiArray[i][j] = false;
					return (count);
				} else { // (i-1,j) has dead stone
					this.AroundCountArray[i][j]++;
					result += count;
				}
			}
		}
	}

	// (i+1,j)
	if ((i + 1) > this.BoardSize - 1) // out side
		this.AroundCountArray[i][j]++;
	else {
		if ((this.GetColor(i, j) + this.GetColor(i + 1, j)) == 0) // different color
			this.AroundCountArray[i][j]++;
		else { // same color
			if (this.LibertyFlagArray[i + 1][j] == true) // completed
				this.AroundCountArray[i][j]++;
			else { // uncompleted
				// (i+1,j) no dead stone
				if ((count = this.CountSelfPonnuki(i + 1, j)) == 0) {
					this.SelfPonnukiArray[i][j] = false;
					return (count);
				} else { // (i+1,j) has dead stone
					this.AroundCountArray[i][j]++;
					result += count;
				}
			}
		}
	}

	// (i,j-1)
	if ((j - 1) < 0) // out side
		this.AroundCountArray[i][j]++;
	else {
		if ((this.GetColor(i, j) + this.GetColor(i, j - 1)) == 0) // different color
			this.AroundCountArray[i][j]++;
		else { // same color
			if (this.LibertyFlagArray[i][j - 1] == true) // completed
				this.AroundCountArray[i][j]++;
			else { // uncompleted
				// (i,j-1) no dead stone
				if ((count = this.CountSelfPonnuki(i, j - 1)) == 0) {
					this.SelfPonnukiArray[i][j] = false;
					return (count);
				} else { // (i,j-1) has dead stone
					this.AroundCountArray[i][j]++;
					result += count;
				}
			}
		}
	}

	// (i,j+1)
	if ((j + 1) > this.BoardSize - 1) // out side
		this.AroundCountArray[i][j]++;
	else {
		if ((this.GetColor(i, j) + this.GetColor(i, j + 1)) == 0) // different color
			this.AroundCountArray[i][j]++;
		else { // same color
			if (this.LibertyFlagArray[i][j + 1] == true) // completed
				this.AroundCountArray[i][j]++;
			else { // uncompleted
				// (i,j+1) no dead stone
				if ((count = this.CountSelfPonnuki(i, j + 1)) == 0) {
					this.SelfPonnukiArray[i][j] = false;
					return (count);
				} else { // (i,j+1) has dead stone
					this.AroundCountArray[i][j]++;
					result += count;
				}
			}
		}
	}

	// 此子死，做如下操作
	if (this.AroundCountArray[i][j] == 4) {
		this.SelfPonnukiArray[i][j] = true;
		// alert("i:"+i+",j:"+j+",AroundCount:"+__AroundCountArray[i][j]);
		result++;
		return (result);
	}

	return result;
};

// 取得自提子个数
GoJudgement.prototype.CountSelfPonnukiNum = function(i, j) {
	this.CountAllLiberty();
	this.CleanAroundCount();
	this.CleanLibertyFlag();
	this.CleanSelfLiberty();
	return this.CountSelfPonnuki(i, j);
};

// 计算周围提子
// 调用了核心函数
GoJudgement.prototype.CountPonnuki = function(i, j) {
	var result = 0;
	var count = 0;
	this.CountAllLiberty();
	this.CleanLiberty();

	if ((i - 1) >= 0) // inside
		if (this.GetColor(i, j) + this.GetColor(i - 1, j) == 0) // different color
		{
			this.CleanAroundCount();
			this.CleanLibertyFlag();
			this.CleanSelfLiberty();
			count = this.CountSelfPonnuki(i - 1, j);
			if (count > 0)
				this.AppendLiberty();
			result += count;
		}

	if ((i + 1) < this.BoardSize) // inside
		if (this.GetColor(i, j) + this.GetColor(i + 1, j) == 0) // different color
		{
			this.CleanAroundCount();
			this.CleanLibertyFlag();
			this.CleanSelfLiberty();
			count = this.CountSelfPonnuki(i + 1, j);
			if (count > 0)
				this.AppendLiberty();
			result += count;
		}

	if ((j - 1) >= 0) // inside
		if (this.GetColor(i, j) + this.GetColor(i, j - 1) == 0) // different color
		{
			this.CleanAroundCount();
			this.CleanLibertyFlag();
			this.CleanSelfLiberty();
			count = this.CountSelfPonnuki(i, j - 1);
			if (count > 0)
				this.AppendLiberty();
			result += count;
		}

	if ((j + 1) < this.BoardSize) // inside
		if (this.GetColor(i, j) + this.GetColor(i, j + 1) == 0) // different color
		{
			this.CleanAroundCount();
			this.CleanLibertyFlag();
			this.CleanSelfLiberty();
			count = this.CountSelfPonnuki(i, j + 1);
			if (count > 0)
				this.AppendLiberty();
			result += count;
		}

	return result;
};

// 打印提子列表
GoJudgement.prototype.PrintPonnukiArray = function() {
	for ( var i = 0; i < this.BoardSize; i++)
		for ( var j = 0; j < this.BoardSize; j++)
			if (this.PonnukiArray[i][j] == true)
				alert("i:" + i + ",j:" + j + " is ponnuki");
};

// 取得临时提子列表
GoJudgement.prototype.GetSelfPonnukiArry = function() {
	return this.SelfPonnukiArray;
};

// 取得提子列表
GoJudgement.prototype.GetPonnukiArray = function() {
	return this.PonnukiArray;
};
