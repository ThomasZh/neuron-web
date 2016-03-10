// GomokuJudgement.js
// thomas.h.zhang
// 2012-05-14

__Five_in_A_Row = 5;

// Gomoku(Five-in-A-Row) Judgement
function GomokuJudgement(boardSize, stoneArray) {
	this.BoardSize = boardSize; // default is 15*15
	this.StoneArray = stoneArray; // 1 black, -1 white, 0 space
}

GomokuJudgement.prototype.Init = function(i, j) {
};

GomokuJudgement.prototype.Success = function(i, j) {
	var num;
	num = this.Horizontal(i, j);
	if (num == __Five_in_A_Row)
		return __Five_in_A_Row;

	num = this.Vertical(i, j);
	if (num == __Five_in_A_Row)
		return __Five_in_A_Row;

	num = this.LeftSlash(i, j);
	if (num == __Five_in_A_Row)
		return __Five_in_A_Row;

	num = this.RightSlash(i, j);
	if (num == __Five_in_A_Row)
		return __Five_in_A_Row;

	return 0;
};

// compute horizontal: '-'
GomokuJudgement.prototype.Horizontal = function(i, j) {
	if ((i - 4) >= 0) {
		var num = this.GetColor(i - 4, j) + this.GetColor(i - 3, j)
				+ this.GetColor(i - 2, j) + this.GetColor(i - 1, j)
				+ this.GetColor(i, j);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i - 3) >= 0 && (i + 1) < this.BoardSize) {
		var num = this.GetColor(i - 3, j) + this.GetColor(i - 2, j)
				+ this.GetColor(i - 1, j) + this.GetColor(i, j)
				+ this.GetColor(i + 1, j);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i - 2) >= 0 && (i + 2) < this.BoardSize) {
		var num = this.GetColor(i - 2, j) + this.GetColor(i - 1, j)
				+ this.GetColor(i, j) + this.GetColor(i + 1, j)
				+ this.GetColor(i + 2, j);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i - 1) >= 0 && (i + 3) < this.BoardSize) {
		var num = this.GetColor(i - 1, j) + this.GetColor(i, j)
				+ this.GetColor(i + 1, j) + this.GetColor(i + 2, j)
				+ this.GetColor(i + 3, j);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i + 4) < this.BoardSize) {
		var num = this.GetColor(i, j) + this.GetColor(i + 1, j)
				+ this.GetColor(i + 2, j) + this.GetColor(i + 3, j)
				+ this.GetColor(i + 4, j);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}

	return 0;
};

// compute vertical: '|'
GomokuJudgement.prototype.Vertical = function(i, j) {
	if ((j - 4) >= 0) {
		var num = this.GetColor(i, j - 4) + this.GetColor(i, j - 3)
				+ this.GetColor(i, j - 2) + this.GetColor(i, j - 1)
				+ this.GetColor(i, j);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((j - 3) >= 0 && (j + 1) < this.BoardSize) {
		var num = this.GetColor(i, j - 3) + this.GetColor(i, j - 2)
				+ this.GetColor(i, j - 1) + this.GetColor(i, j)
				+ this.GetColor(i, j + 1);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((j - 2) >= 0 && (j + 2) < this.BoardSize) {
		var num = this.GetColor(i, j - 2) + this.GetColor(i, j - 1)
				+ this.GetColor(i, j) + this.GetColor(i, j + 1)
				+ this.GetColor(i, j + 2);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((j - 1) >= 0 && (j + 3) < this.BoardSize) {
		var num = this.GetColor(i, j - 1) + this.GetColor(i, j)
				+ this.GetColor(i, j + 1) + this.GetColor(i, j + 2)
				+ this.GetColor(i, j + 3);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((j + 4) < this.BoardSize) {
		var num = this.GetColor(i, j) + this.GetColor(i, j + 1)
				+ this.GetColor(i, j + 2) + this.GetColor(i, j + 3)
				+ this.GetColor(i, j + 4);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}

	return 0;
};

// compute left slash: '\'
GomokuJudgement.prototype.LeftSlash = function(i, j) {
	if ((i - 4) >= 0 && (j - 4) >= 0) {
		var num = this.GetColor(i - 4, j - 4) + this.GetColor(i - 3, j - 3)
				+ this.GetColor(i - 2, j - 2) + this.GetColor(i - 1, j - 1)
				+ this.GetColor(i, j);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i - 3) >= 0 && (i + 1) < this.BoardSize && (j - 3) >= 0
			&& (j + 1) < this.BoardSize) {
		var num = this.GetColor(i - 3, j - 3) + this.GetColor(i - 2, j - 2)
				+ this.GetColor(i - 1, j - 1) + this.GetColor(i, j)
				+ this.GetColor(i + 1, j + 1);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i - 2) >= 0 && (i + 2) < this.BoardSize && (j - 2) >= 0
			&& (j + 2) < this.BoardSize) {
		var num = this.GetColor(i - 2, j - 2) + this.GetColor(i - 1, j - 1)
				+ this.GetColor(i, j) + this.GetColor(i + 1, j + 1)
				+ this.GetColor(i + 2, j + 2);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i - 1) >= 0 && (i + 3) < this.BoardSize && (j - 1) >= 0
			&& (j + 3) < this.BoardSize) {
		var num = this.GetColor(i - 1, j - 1) + this.GetColor(i, j)
				+ this.GetColor(i + 1, j + 1) + this.GetColor(i + 2, j + 2)
				+ this.GetColor(i + 3, j + 3);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i + 4) < this.BoardSize && (j + 4) < this.BoardSize) {
		var num = this.GetColor(i, j) + this.GetColor(i + 1, j + 1)
				+ this.GetColor(i + 2, j + 2) + this.GetColor(i + 3, j + 3)
				+ this.GetColor(i + 4, j + 4);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}

	return 0;
};

// compute right slash: '/'
GomokuJudgement.prototype.RightSlash = function(i, j) {
	if ((i - 4) >= 0 && (j + 4) < this.BoardSize) {
		var num = this.GetColor(i - 4, j + 4) + this.GetColor(i - 3, j + 3)
				+ this.GetColor(i - 2, j + 2) + this.GetColor(i - 1, j + 1)
				+ this.GetColor(i, j);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i - 3) >= 0 && (i + 1) < this.BoardSize && (j + 3) < this.BoardSize
			&& (j - 1) >= 0) {
		var num = this.GetColor(i - 3, j + 3) + this.GetColor(i - 2, j + 2)
				+ this.GetColor(i - 1, j + 1) + this.GetColor(i, j)
				+ this.GetColor(i + 1, j - 1);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i - 2) >= 0 && (i + 2) < this.BoardSize && (j + 2) < this.BoardSize
			&& (j - 2) >= 0) {
		var num = this.GetColor(i - 2, j + 2) + this.GetColor(i - 1, j + 1)
				+ this.GetColor(i, j) + this.GetColor(i + 1, j - 1)
				+ this.GetColor(i + 2, j - 2);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i - 1) >= 0 && (i + 3) < this.BoardSize && (j + 1) < this.BoardSize
			&& (j - 3) >= 0) {
		var num = this.GetColor(i - 1, j + 1) + this.GetColor(i, j)
				+ this.GetColor(i + 1, j - 1) + this.GetColor(i + 2, j - 2)
				+ this.GetColor(i + 3, j - 3);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}
	if ((i + 4) < this.BoardSize && (j - 4) >= 0) {
		var num = this.GetColor(i, j) + this.GetColor(i + 1, j - 1)
				+ this.GetColor(i + 2, j - 2) + this.GetColor(i + 3, j - 3)
				+ this.GetColor(i + 4, j - 4);
		if (Math.abs(num) == __Five_in_A_Row)
			return __Five_in_A_Row;
	}

	return 0;
};

// 1 black, -1 white, 0 space
GomokuJudgement.prototype.GetColor = function(i, j) {
	return this.StoneArray[i][j];
};

// 1 black, -1 white, 0 space
GomokuJudgement.prototype.SetColor = function(i, j, color) {
	this.StoneArray[i][j] = color;
};
