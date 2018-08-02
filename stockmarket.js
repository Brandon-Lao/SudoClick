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
	const difference = cash - oldCash; //Our profits/losses.
	var marketCap = oldCash * 2; //The top of the chart.
	if (oldCash === 0) marketCap = cash * 2 //Failsafe in case we end a quarter with no money.
	console.log(marketCap)
	//Cash = oldCash means we draw at 50%. Higher and we draw as a percentage from 50-100%, less and it's 50-0%.
	//Thus cash/marketCap = % value that we want to draw at.
	//But we draw in the opposite direction (higher numbers mean lower on the graph...)
	const newCap = cash / marketCap;
	console.log(newCap);
	if (newCap > 1) {
		/*Overflow! We'll need to resize the graph, make a new market cap, rescale the older lines to fit in with the new scale!
		Oh the humanity!
		Since I'm probably not getting this done for today: future me.
		You'll probably want to store the width-heights for all nodes on the graph as variables.
		Thing is, say we rise from 0-50 with a cap of 100, that's a 50% raise.
		Then we overflow from 50-150.
		Well now our previous draw has gone from a 50% raise to a 33% raise.
		So the nextHeights will have to be modified by...
		Oh good lord, what -would- they be modified by. You should probably put in a help ticket.
		If worse comes to worst, you can just keep the old values, unmodified, but if you go from 0-100, then 0-200 then it'd just be a straight line at the cap.

		You know what the worst thing is? You can't ignore this problem. Growth in incremental games is always explosive in some way.
		*/
	}
	if (newCap > 0.5) {
		const upperPercentage = newCap - 0.5 * 2;
		console.log(upperPercentage)
		const nextY = Math.floor(150-(150*upperPercentage));
		console.log(nextY);
		drawLine(nextY);
	}
	if (newCap === 0.5) {
		console.log("Same height.")
		drawLine(currentHeight);
	}
	else {
		const lowerPercentage = newCap - 0.5 * 2;
		console.log(lowerPercentage);
		const nextY = Math.floor(150+(150*lowerPercentage));
		console.log(nextY);
		drawLine(nextY);
	}
	oldCash = cash;
}

//Share price is some function of non-liquid and liquid assets, profit earned
//Should make an IPO upgrade to initialize the stock market component, which determines
//Base share price and such.

initializeChart()
// window.setInterval(function() {
   
// }, 180000);
//180000 = 3 minutes
