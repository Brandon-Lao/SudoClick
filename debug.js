function getMoney() {
	cash += 10000;
	document.getElementById("cash").innerHTML = cash;
}

function startIPO() {
	IPOStart();
	programs = 100000;
	document.getElementById("programmers").innerHTML = programmers;
}

function startShooter() {
	document.onkeypress = function(input) {
		console.log("Noting keypresses");
		console.log(input);
		switch (input.which) {
			case 38:
			charUp(); break;
			case 39:
			fireShot(); break;
			case 40:
			charDown(); break;
			default: return;
		}
	}
}
