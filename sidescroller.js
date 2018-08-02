var xBorder = 51;
var yBorder = 17;
var gameArea;

function replaceSpace(gameTile, newSprite) {
	gameTile.sprite = newSprite.sprite;
	gameTile.empty = newSprite.empty;
}

var character = {
	charX: 0,
	charY: 0,
	sprite: "@",
	empty: false
};

var emptySpace = {
	sprite: ".",
	empty: true
};

function initializeGameArea() {
	gameArea = new Array(yBorder); //Y
	for (let i = 0; i < xBorder; i++) {
		gameArea[i] = new Array(xBorder); //X
	}
	for (let i = 0; i < yBorder; i++) {
		//Probably can do this in one loop, will have to optimize.
		for (let j = 0; j < xBorder; j++) {
			gameArea[i][j] = new Object();
			replaceSpace(gameArea[i][j], emptySpace);
		}
	}
}

function detectCollisions(incomingY, incomingX) {
	if (gameArea[incomingY][incomingX].empty) {
		return true;
	} else {
		switch (gameArea[incomingY][incomingX].sprite) {
			case "$":
				console.log("Get money");
				return true;
			default:
				return false;
		}
	}
}

function charDown() {
	if (
		character.charY + 1 < yBorder &&
		detectCollisions(character.charY + 1, character.charX)
	) {
		replaceSpace(gameArea[character.charY][character.charX], emptySpace);
		character.charY += 1;
	}
	replaceSpace(gameArea[character.charY][character.charX], character);
	render();
}

function charUp() {
	if (
		character.charY - 1 >= 0 &&
		detectCollisions(character.charY - 1, character.charX)
	) {
		replaceSpace(gameArea[character.charY][character.charX], emptySpace);
		character.charY -= 1;
	}
	replaceSpace(gameArea[character.charY][character.charX], character);
	render();
}

function initialRender() {
	initializeGameArea();
	gameArea[0][0].sprite = character.sprite;
	gameArea[5][0].sprite = "$";
	gameArea[5][0].empty = false;
	//Redraws the area each time we want to make a move, not the best, should figure out a way to change that.
	gameArea.forEach(xCoord => {
		xCoord.forEach(yCoord => {
			document.getElementById("sidescrollergraphics").innerHTML +=
				yCoord.sprite;
		});
		document.getElementById("sidescrollergraphics").innerHTML += "\n";
	});
}

function render() {
	document.getElementById("sidescrollergraphics").innerHTML = "";
	gameArea.forEach(xCoord => {
		xCoord.forEach(yCoord => {
			document.getElementById("sidescrollergraphics").innerHTML +=
				yCoord.sprite;
		});
		document.getElementById("sidescrollergraphics").innerHTML += "\n";
	});
}

initialRender();
