<!-- You know I'm starting to realize that this project is literally the exact opposite of what Stackathon's supposed to be.
Learn a new code, library, or feature? Nope, reinforces and goes through the most basics of languages we've learned.
Have an MPV that's hard, but eventually reachable? Nope. MPV takes 15 minutes to code. The rest? Oof. -->

# THINGS TO DO:

+ Implement upgrades on the currently existing buildings.
+ Add in a different resource independent of the current loop.
+ Ability to add in different modules to do different things.

+ Set things into different script files, and just generally tidy up that code.

# CSS THINGS TO DO:
+ Make it so that the columns actually appear right and aren't just mucked together as they are right now.
+ Make the console take up the entirety of the top, and allow it to have a log of stuff instead of just one.

# STOCK MARKET THINGS TO DO:
+ After that, we should be able to buy/sell our own treasury stock, which affects market value.
+ Finally, we should be able to influence the stock market by spending resources (code, programs) on it.

# SIDE SCROLLER (hack.the.net) THINGS TO DO:
+ Be able to upgrade our netrunner, increase the difficulty of our enemies.
+ Have stuff to actually get during a run: score? Cash drops?
+ Could just have code+= something during the jackIn interval?


# IDEAS FOR LATER ELEMENTS:

+ Remember that thing in...Hacknet, was it called? One of the programs in there could be used as a sort of
	cryptominer mini-game for this. I'll write down a proper thing, but in a bunch of garbled letters you constantly filter
	until you get a code word, you enter the code word, get <TERMINIOLOGY>coin.
	Preferably this is after you crash the stock market and cash starts to inflate and be more worthless.
	Or run an actual cryptominer on the client's machine. (Yeah no)

+ Some kind of simulated combat thing? Maybe too ambitious, I'll get back to that.

# CURRENT TALKABLE PROBLEMS:

A. HTML/Javascript accepts everything. .innterHTML? That's fine. Array overflowing? That's fine.
B. Write out EVERY case. There's a lot to be considered.
C. Scalability: what's trash code today can cost you a lot later on, especially when you needa add new features. (not really something new, but wow did it get reinforced)
D. Gods I hate this stock market graph.

#QUARENTINED CODE:
	//You know what, ignore this tick for now. I wanna keep it for the comments, but I'm not using it.
function bleh() {
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
	
	oldCash = cash;
}
