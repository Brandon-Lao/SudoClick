//Initial draw and get information from state for old stock market.
//If raise, calculate by how much and do so.
//If overflow to the right, re-draw, with new base's y being the old y, and x=0 at a new date
//If overflow to the up, then set new ceiling, and redraw?

//We could just use chart.js...
//But no.
const canvasWidth = 600;
const canvasHeight = 300;
var currentWidth = 0;
var currentHeight = 300;
var oldStock = 0;
var stockPrice = 0;
var marketCap = 0;
var stocksIssued = 0;
var stocksOwned = 0;
var stockModifier = 0;
var ctx;
var canvas;

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
var stockValues = new Array(6);
stockValues.fill({
	color: "",
	price: 0,
});

function initializeChart() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.strokeStyle = "#FFFFFF";
	ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
	for (i = 100; i <= canvasWidth; i += 100) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, canvasHeight);
		ctx.stroke();
	}
}

function drawLine(nextHeight) {
	ctx.strokeStyle = "#33FF00";
	ctx.beginPath();
	if (currentWidth + 100 > 600) {
		initializeChart();
		ctx.strokeStyle = "#33FF00"; //Have to reset style.
		currentWidth = 0;
		currentHeight = getHeightToDrawAt(
			getPercentToDraw(stockLines[5], marketCap)
		);
		stockLines.fill(0);stockValues.fill({ color: "", price: 0});
	}
	ctx.moveTo(currentWidth, currentHeight);
	ctx.lineTo(currentWidth + 100, nextHeight);
	currentWidth += 100;
	currentHeight = nextHeight;
	ctx.stroke();
}

function stockMarketTick() {
	stockPrice = getStockPrice();
	if (marketCap === 0) {
		marketCap = stockPrice * 2;
		oldStock = stockPrice;
	}
	var percentageToDraw = getPercentToDraw(stockPrice, marketCap); //Should give us how percentagely high we want our graph to be
	if (percentageToDraw > 1) {
		//Overflow, we need to resize the graph
		initializeChart(); //First, clear the graph.
		marketCap = stockPrice * 2; //Raise the market cap to something that should be impossible to reach past 100%
		currentWidth = 0;
		currentHeight = 300; //Should be set to previousChartHeight later.
		stockLines.forEach((oldLine, index) => {
			//For each old line
			if (oldLine > 0) {
				drawLine(
					getHeightToDrawAt(getPercentToDraw(oldLine, marketCap))
				);
				ctx.fillStyle = stockValues[index].color; //Need to store stockValue as well
				ctx.fillText(
					stockValues[index].price.toLocaleString("en", {
						style: "currency",
						currency: "USD"
					}),
					currentWidth - 100,
					20
				);
			}
		});
		//We wanna draw the new line anyways, but only after we resize.
	}
	percentageToDraw = getPercentToDraw(stockPrice, marketCap); //Re-run percentage to draw, however.
	var heightToDrawAt = getHeightToDrawAt(percentageToDraw);
	drawLine(heightToDrawAt); //DrawLine increments out currentWidth, so that'll be fine.
	ctx.font = "20px serif";
	if (stockPrice > oldStock) {
		ctx.fillStyle = "#00FF00";
	}
	if (stockPrice < oldStock) {
		ctx.fillStyle = "#FF4500";
	}
	if (stockPrice === oldStock) {
		ctx.fillStyle = "#FFFFFF";
	}
	ctx.fillText(
		stockPrice.toLocaleString("en", { style: "currency", currency: "USD" }),
		currentWidth - 100,
		20
	);
	stockValues[currentWidth / 100 - 1].color = ctx.fillStyle;
	stockValues[currentWidth / 100 - 1].price = stockPrice;
	stockLines[currentWidth / 100 - 1] = Math.max(stockPrice, 1); //Store our cash value in the corresponding stockLine. Min 1, since we check for 0 in our overflow.
	oldStock = stockPrice;
}

//Share price is some function of non-liquid and liquid assets, profit earned. Currently it's just old cash in relation to new cash.
//Should make an IPO upgrade to initialize the stock market component, which determines
//Base share price and such.

function IPOStart() {
	stocksIssued = 100000;
	stocksOwned = 50000;
	var canvasElement = document.createElement("canvas");
	canvasElement.id = "canvas";
	canvasElement.height = 300;
	canvasElement.width = 600;
	var canvasDiv = document.createElement("div");
	canvasDiv.id = "stockmarket";
	canvasDiv.appendChild(canvasElement);
	var middle = document.getElementById("centerscreen");
	middle.appendChild(canvasDiv);
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	initializeChart();
	var buttonDiv = document.createElement("div");
	var buyButton = document.createElement("button");
	buyButton.onclick = function() {
		buyStock();
	};
	buyButton.appendChild(document.createTextNode("Buy (1000)"));
	var sellButton = document.createElement("button");
	sellButton.onclick = function() {
		sellStock();
	};
	sellButton.appendChild(document.createTextNode("Sell (1000)"));
	var raiseStockButton = document.createElement("button");
	raiseStockButton.appendChild(
		document.createTextNode("Raise Stock Price {1000 programs}")
	);
	raiseStockButton.onclick = function() {
		raiseStock();
	};
	buttonDiv.appendChild(buyButton);
	buttonDiv.appendChild(sellButton);
	buttonDiv.appendChild(raiseStockButton);
	canvasDiv.appendChild(buttonDiv);

	window.setInterval(function() {
		stockMarketTick();
	}, 2000);
}

function getStockPrice() {
	netAssets =
		cash +
		costOfProgrammers +
		stockPrice * stocksOwned -
		(stocksIssued - stocksOwned) * stockPrice;
	return ((netAssets / Math.max(stocksIssued, 1)) + stockModifier).toFixed(2);
}

function buyStock() {
	if (stockPrice * 1000 < cash) {
		cash -= stockPrice * 1000;
		stocksOwned += 1000;
		document.getElementById("cash").innerHTML = Math.floor(cash);
	}
}

function sellStock() {
	if (stocksOwned >= 1000) {
		stocksOwned -= 1000;
		cash += 1000 * stockPrice;
		document.getElementById("cash").innerHTML = Math.floor(cash);
	}
}

function raiseStock() {
	if (programs >= 1000) {
		programs -= 1000;
		stockModifier += 0.5;
		document.getElementById("programs").innerHTML = programs;
	}
}

//Take old stock price. Get net total assets. Add or subtract by profits?
//Or could just be net assets / stocks issued.
//Then modified. Yeah, that could work.
