var code = 0;
var programs = 0;
var cash = 0;

function codeClick(number) {
    code = code + number;
    document.getElementById("code").innerHTML = Math.floor(code);
}

var programmers = 0;
var codeCost = 20;

function compileCode() {
    if (code >= codeCost) {
        programs += 1;
        code -= codeCost;
        document.getElementById("programs").innerHTML = programs;
        document.getElementById("code").innerHTML = code;
    }
}

function buyProgrammer() {
    const programmerCost = Math.floor(10 * Math.pow(1.1, programmers)); //works out the cost of this cursor
    if (cash >= programmerCost) {
        //checks that the player can afford the cursor
        programmers = programmers + 1; //increases number of cursors
        cash = cash - programmerCost; //removes the cookies spent
        document.getElementById("programmers").innerHTML = programmers; //updates the number of cursors for the user
        document.getElementById("cash").innerHTML = cash; //updates the number of cookies for the user
    }
    var nextCost = Math.floor(10 * Math.pow(1.1, programmers)); //works out the cost of the next cursor
    document.getElementById("programmerCost").innerHTML = nextCost; //updates the cursor cost for the user
}

function hideUpgrades() {
    if (code < 20 && document.getElementById("compilecode").hidden) {
        document.getElementById("compilecode").hidden = true;
    } else {
        document.getElementById("compilecode").hidden = false;
        document.getElementById("readout1").innerHTML =
            "Got enough code. Can compile it, now.";
    }
}

function stockMarket() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 300);
    ctx.lineTo(600, 300);
    ctx.lineTo(600, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
}

hideUpgrades();

window.setInterval(function() {
    stockMarket();
    hideUpgrades();
    codeClick(programmers/1000);
}, 1);

var save = {
    code: code,
    programs: programs,
    cash: cash,
    programmers: programmers
};

function saveGame() {
    localStorage.setItem("save", JSON.stringify(save));
}

function loadGame() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.code !== "undefined") code = savegame.code;
    if (typeof savegame.programs !== "undefined") programs = savegame.programs;
    if (typeof savegame.cash !== "undefined") cash = savegame.cash;
    if (typeof savegame.programmers !== "undefined")
        programmers = savegame.programmers;
}
