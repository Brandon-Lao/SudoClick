//Initial draw and get information from state for old stock market.
//If raise, calculate by how much and do so.
//If overflow to the right, re-draw, with new base's y being the old y, and x=0 at a new date
//If overflow to the up, then set new ceiling, and redraw?

//We could just use chart.js...
//But no.
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const canvasWidth = 600;
const canvasHeight = 300;
var currentWidth = 0;
var currentHeight = 300;
var oldCash = 0;
var marketCap = 0;

function getPercentToDraw(cash, cap) {
	return cash / cap;
}

function getHeightToDrawAt(percent) {
	let heightToDraw;
	heightToDraw = Math.max(Math.floor(canvasHeight * percent), 0); //Ensure the height we're drawing at is > 0
	//Thing is, this is assuming 100% is 300, when it's the other way around, so...
	heightToDraw = heightToDraw - canvasHeight;
	if (heightToDraw < 0) heightToDraw *= -1; //This should always fire.
	return heightToDraw;
}

/*Alright, so we can store the previous stock lines as an array.
Each object in the array needs to hold the old percentage value, and the marketCap value?
WAIT NO, ALL THEY'D NEED TO HOLD IS THE CASH VALUE THEY ASSOCIATE TO
Cause, like:
Say cash 50, market value is 100.
Then it'd be 50%.
But if we then raise the cap to 200, then it's be 25%.
So all we need to do is take the old cash value the line corresponded to, and calculate the percentage value of it
  in relation to the new market cap value.
The properties would hold their position, so... Yeah, an array would be better, probably.
When we reset, clear all lines except 5, then set five to the first line, then add the new one as line two.*/
var stockLines = new Array(6);
stockLines.fill(0);

function initializeChart() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.strokeStyle = "#FFFFFF";
	ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
	for (i = 100; i < canvasWidth; i += 100) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, canvasHeight);
		ctx.stroke();
	}
	console.log("Finished initializing");
}

function drawLine(nextHeight) {
	ctx.strokeStyle = "#33FF00";
	ctx.beginPath();
	ctx.moveTo(currentWidth, currentHeight);
	if (currentWidth + 100 > 600) {
		initializeChart();
		currentWidth = 0;
		//Change X-axis dates here.
		console.log("Resetting width.");
	}
	ctx.lineTo(currentWidth + 100, nextHeight);
	currentWidth += 100;
	currentHeight = nextHeight;
	ctx.stroke();
}

function stockMarketTick() {
	if (marketCap === 0) {
		marketCap = cash * 2;
		oldCash = cash;
	} //We only want to set marketCap this way if it's undefined.
	//Should probably be an initializer function or something.

	var percentageToDraw = getPercentToDraw(cash, marketCap); //Should give us how percentagely high we want our graph to be
	if (percentageToDraw > 1) {
		//Overflow, we need to resize the graph
		initializeChart(); //First, clear the graph.
		marketCap = cash * 2; //Raise the market cap to something that should be impossible to reach past 100%
		currentWidth = 0;
		currentHeight = 300; //Should be set to previousChartHeight later.
		stockLines.forEach(oldLine => {
			//For each old line
			if (oldLine > 0) {
				//All of them should be greater than 0.
				console.log("Drawing at point ", currentWidth / 100 - 1, "at height ", getHeightToDrawAt(getPercentToDraw(oldLine, marketCap)))
				drawLine(
					getHeightToDrawAt(getPercentToDraw(oldLine, marketCap))
				);
			}
		});
		//We wanna draw the new line anyways, but only after we resize.
	}
	percentageToDraw = getPercentToDraw(cash, marketCap) //Re-run percentage to draw, however.
	var heightToDrawAt = getHeightToDrawAt(percentageToDraw);
				console.log("Drawing at point ", currentWidth / 100 - 1, "at height ", heightToDrawAt);
	drawLine(heightToDrawAt); //DrawLine increments out currentWidth, so that'll be fine.
	stockLines[currentWidth / 100 - 1] = Math.max(cash, 1); //Store our cash value in the corresponding stockLine. Min 1, since we check for 0 in our overflow.
	oldCash = cash;
}

//Share price is some function of non-liquid and liquid assets, profit earned. Currently it's just old cash in relation to new cash.
//Should make an IPO upgrade to initialize the stock market component, which determines
//Base share price and such.

initializeChart();
// window.setInterval(function() {

// }, 180000);
//180000 = 3 minutes
