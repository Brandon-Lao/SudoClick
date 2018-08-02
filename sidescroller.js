var xBorder = 51;
var yBorder = 10;
var gameArea;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function replaceSpace(gameTile, newSprite) {
	gameTile.sprite = newSprite.sprite;
	gameTile.empty = newSprite.empty;
}

var character = {
	charX: 0,
	charY: 0,
	sprite: "@",
	health: 0,
	empty: false
};

function takeDamage(damage) {
	character.health = Math.max(character.health - damage, 0);
};

const emptySpace = {
	sprite: ".",
	empty: true
};

const projectile = {
	sprite: "O",
	empty: false
};

const hackShot = {
	sprite: ">",
	empty: false
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

function detectCollisions(incomingY, incomingX, incomingSprite) {
	if (gameArea[incomingY][incomingX].empty) {
		return true;
	} else {
		switch (incomingSprite) {
			case "@":
				switch (gameArea[incomingY][incomingX].sprite) {
					case "O":
						console.log("Oof ouch owie!");
						takeDamage(1);
						return true;
					case "$":
						console.log("Got money");
						cash += 50;
						document.getElementById("cash").innerHTML = cash;
						return true;
					default:
						return false;
				}
			case "O":
				switch (gameArea[incomingY][incomingX].sprite) {
					case "@":
						console.log("Oof ouch owie!");
						takeDamage(1);
						return false;
					default:
						return false;
				}
			case ">":
				switch (gameArea[incomingY][incomingX].sprite) {
					case "O":
						replaceSpace(gameArea[incomingY][incomingX], emptySpace);
						return false;
					default:
						return false;
				}
			default:
				return false;
		}
	}
}

function charDown() {
	if (
		character.charY + 1 < yBorder &&
		detectCollisions(character.charY + 1, character.charX, character.sprite)
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
		detectCollisions(character.charY - 1, character.charX, character.sprite)
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
	character.charX = 0;
	character.charY = 0;
	//Redraws the area each time we want to make a move, not the best, should figure out a way to change that.
	document.getElementById("sidescrollergraphics").innerHTML = "";
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

function moveNPCs() {
	gameArea.forEach((yCoord, yIndex) => {
		yCoord.forEach((xCoord, xIndex) => {
			switch (xCoord.sprite) {
				case "O":
					if (
						gameArea[yIndex][xIndex - 1] !== undefined &&
						detectCollisions(yIndex, xIndex - 1, projectile.sprite)
					) {
						replaceSpace(gameArea[yIndex][xIndex - 1], projectile);
						replaceSpace(gameArea[yIndex][xIndex], emptySpace);
					} else {
						replaceSpace(gameArea[yIndex][xIndex], emptySpace);
					}
					break;
				case ">":
					if (
						gameArea[yIndex][xIndex + 1] !== undefined &&
						detectCollisions(yIndex, xIndex + 1, hackShot.sprite)
					) {
						console.log("Going forward.")
						replaceSpace(gameArea[yIndex][xIndex + 1], hackShot);
						replaceSpace(gameArea[yIndex][xIndex], emptySpace);
					} else {
						replaceSpace(gameArea[yIndex][xIndex], emptySpace);
					}
					break;
				default:
					break;
			}
		});
	});
}

initialRender();

var runState;
var runStatus = false;

function jackIn() {
	if (!runStatus) {
		runStatus = true;
		character.health += 3;
		runState = window.setInterval(function() {
			if (character.health === 0) {jackOut()}
				else {
			gameArea[getRandomInt(0, yBorder)][xBorder - 1].sprite = "O";
			gameArea[getRandomInt(0, yBorder)][1].sprite = ">";
			moveNPCs();
			render();}
		}, 1000);
	}
}

function jackOut() {
	clearInterval(runState);
	runStatus = false;
	initialRender();
}
