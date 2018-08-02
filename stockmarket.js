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

//Share price is some function of non-liquid and liquid assets, profit earned
//Should make an IPO upgrade to initialize the stock market component, which determines
//Base share price and such.

initializeChart();