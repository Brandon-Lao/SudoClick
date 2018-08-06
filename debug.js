function getMoney() {
	cash += 10000;
	document.getElementById("cash").innerHTML = cash;
}

function startIPO() {
	IPOStart();
	programs = 100000;
	document.getElementById("programs").innerHTML = programs;
	document.getElementById("readout1").innerHTML = "You're big enough. Time to IPO and make the real bucks.";
}

function startShooter() {
	var div1 = document.getElementById("sidescroller");
	div1.hidden = false;
	var div2 = document.getElementById("sidescrollergraphics");
	div2.hidden = false;
	var div3 = document.getElementById("sidescrollerbar");
	div3.hidden = false;
	document.getElementById("readout1").innerHTML = "So the SEC won't let me be? We'll see about that.";
	initialRender();
}
