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

const emptySpace = {
	sprite: ".",
	empty: true
};

const projectile = {
	sprite: "O",
	empty: false
};

const hackShot1 = {
	sprite: ">",
	empty: false
};

const hackShot2 = {
	sprite: ")",
	empty: false
};

function setHealth(healthMod) {
	character.health = Math.max(character.health + healthMod, 0);
	document.getElementById("characterhealth").innerHTML = character.health;
}

function fireShot() {
	replaceSpace(gameArea[character.charY][character.charX + 1], hackShot1);
}

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
						setHealth(-1);
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
						setHealth(-1);
						return false;
					case ">":
						replaceSpace(
							gameArea[incomingY][incomingX],
							emptySpace
						);
						replaceSpace(
							gameArea[incomingY][incomingX - 1],
							emptySpace
						);
						return false;
					default:
						return false;
				}
			case ">":
				switch (gameArea[incomingY][incomingX].sprite) {
					case "O":
						replaceSpace(
							gameArea[incomingY][incomingX],
							emptySpace
						);
						replaceSpace(
							gameArea[incomingY][incomingX - 1],
							emptySpace
						);
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
	if (runStatus) { //Should find a cleaner way of checking run status before functions are accessable.
		if (
			character.charY + 1 < yBorder &&
			detectCollisions(
				character.charY + 1,
				character.charX,
				character.sprite
			)
		) {
			replaceSpace(
				gameArea[character.charY][character.charX],
				emptySpace
			);
			character.charY += 1;
		}
		replaceSpace(gameArea[character.charY][character.charX], character);
		render();
	}
}

function charUp() {
	if (runStatus) {
		if (
			character.charY - 1 >= 0 &&
			detectCollisions(
				character.charY - 1,
				character.charX,
				character.sprite
			)
		) {
			replaceSpace(
				gameArea[character.charY][character.charX],
				emptySpace
			);
			character.charY -= 1;
		}
		replaceSpace(gameArea[character.charY][character.charX], character);
		render();
	}
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
						detectCollisions(yIndex, xIndex + 1, hackShot1.sprite)
					) {
						replaceSpace(gameArea[yIndex][xIndex + 1], hackShot2);
						replaceSpace(gameArea[yIndex][xIndex], emptySpace);
					} else {
						replaceSpace(gameArea[yIndex][xIndex], emptySpace);
					}
					break;
				/*This is a bit of a hacky (har har) solution: When we parse through the area, it's top to bottom, left to right.
					Problem with that is that our shot moves forward, and we immediately re-parse that shot. Thus, we use hackShot2, which
					is only parsed after hackShot1 as an 'inbetween' shot. hackShot2 itself does nothing except check if we're at the end,
					else, it just turns back into hackShot1. */
				case ")":
					if (gameArea[yIndex][xIndex + 1] !== undefined) {
						replaceSpace(gameArea[yIndex][xIndex], hackShot1);
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
		setHealth(3);
		runState = window.setInterval(function() {
			gameArea[getRandomInt(0, yBorder)][xBorder - 1].sprite = "O";
			moveNPCs();
			render();
		}, 100);
	}
}

function jackOut() {
	clearInterval(runState);
	runStatus = false;
	initialRender();
}
