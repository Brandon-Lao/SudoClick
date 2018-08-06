/*Alright, what do we need in this upgrades model. What will our upgrades look like?
Well, for starters, upgrades need a name, cost, and effect, that's simple.
But, we should also have a property to keep track if they've already been called: don't want to redisplay the same upgrade.
Can be a numerical function: 0 for criteria not met, 1 for critera met, 2 for bought.

Then, we should a function that checks whether an upgrade is purchasable or not.
If it should be, then document.createElement("button")
button.onClick(buyUpgrade(upgradeObject))
button.id = ...
Etc etc
Then appendChild to the upgrades div component

Oi, Universal Paperclips has given me a right proper model.
(Funny, how this game was inspired by Candy Box but Universal Paperclips, which I didn't even finish, is helping so much with the code.)
Price tag is just a string with an actual cost being a boolean that checks the values
I.E: .cost = {return cash >= 750 && programs >= 25}
Requirement can similarly be a function that we just check: {return cash>=750}

*/

var upgradeArray = [];

const dummyUpgrade = {
	name: "String",
	id: "TruncatedStr", //For setting the id of the button element.
	description: "String",
	revealCond: function() {
		return true;
	},
	buyableCond: function() {
		return true;
	}, //If the element isn't buyable, we grey out the button.
	costString: "A cost tag to put on the button element.",
	revealFlag: 0,
	purchase: function() {
		//Do stuff there.
		this.revealFlag = 2; //Sets upgrade to be archived.
	}
};

const upgrade1 = {
	name: "Coffee Pots",
	id: "coffee1", //For setting the id of the button element.
	description:
		"Boost up co-worker productivity with the only non-illegal stimulant on the non-black market. Programmers can code two extra lines of code per second.",
	revealCond: function() {
		return programmers >= 1;
	},
	buyableCond: function() {
		return cash >= 500;
	}, //If the element isn't buyable, we grey out the button.
	costString: "{this.cash >= 500;}",
	revealFlag: 0,
	purchase: function() {
		if (this.buyableCond()) {
			programmerModifier += 2;
			cash -= 500;
			document.getElementById("cash").innerHTML = cash;
			document.getElementById("readout1").innerHTML =
				"Nothing like the smell of freshly made coffee pots in the morning.";
			this.revealFlag = 2;
			var upgradeDiv = document.getElementById("coffee1");
			upgradeDiv.remove();
		}
	}
};

upgradeArray.push(upgrade1); //Probably a more efficent way of doing this, but hey.

const upgrade2 = {
	name: "Coffee.",
	id: "coffee2", //For setting the id of the button element.
	description: "I knew we forgot something. Doubles worker productivity.",
	revealCond: function() {
		return upgrade1.revealFlag === 2;
	},
	buyableCond: function() {
		return cash >= 200;
	}, //If the element isn't buyable, we grey out the button.
	costString: "{this.cash >= 200}",
	revealFlag: 0,
	purchase: function() {
		if (this.buyableCond()) {
			cash -= 200;
			document.getElementById("cash").innerHTML = cash;
			document.getElementById("readout1").innerHTML =
				"Nothing like the smell of freshly made coffee in freshly made coffee pots in the morning.";
			programmerMultiplier *= 2;
			this.revealFlag = 2;
			var upgradeDiv = document.getElementById("coffee2");
			upgradeDiv.remove();
		}
	}
}; //Should probably setTimeout in upgrade1 to return something for upgrade 2 to show up.

upgradeArray.push(upgrade2);

//Insertion code repurposed from Universal Paperclips.
function insertUpgrade(upgrade) {
	var element = document.createElement("button");
	element.setAttribute("id", upgrade.id);

	element.onclick = function() {
		upgrade.purchase();
	};
	element.setAttribute("class", "projectButton");

	var span = document.createElement("span");
	element.appendChild(span);

	var title = document.createTextNode(upgrade.name);
	span.appendChild(title);

	var cost = document.createTextNode(" | " + upgrade.costString);
	element.appendChild(cost);

	var div = document.createElement("div");
	element.appendChild(div);

	var description = document.createTextNode(upgrade.description);
	element.appendChild(description);

	document.getElementById("upgrades").appendChild(element);
}

function checkUpgrades() {
	upgradeArray.forEach(upgrade => {
		if (upgrade.revealCond() && upgrade.revealFlag === 0) {
			insertUpgrade(upgrade);
			upgrade.revealFlag = 1;
		}
	});
}
