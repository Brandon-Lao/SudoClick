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
    const programmerCost = Math.floor(10 * Math.pow(1.1, programmers));
    if (cash >= programmerCost) {
        programmers = programmers + 1;
        cash = cash - programmerCost;
        document.getElementById("programmers").innerHTML = programmers;
        document.getElementById("cash").innerHTML = cash;
    }
    var nextCost = Math.floor(10 * Math.pow(1.1, programmers));
    document.getElementById("programmercost").innerHTML = nextCost;
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
    codeClick(programmers / 1000);
}, 1);

function saveGame() {
    var save = {
    code: code,
    programs: programs,
    cash: cash,
    programmers: programmers
};
    localStorage.setItem("save", JSON.stringify(save));
}

function loadGame() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.code !== "undefined") code = savegame.code;
    if (typeof savegame.programs !== "undefined") programs = savegame.programs;
    if (typeof savegame.cash !== "undefined") cash = savegame.cash;
    if (typeof savegame.programmers !== "undefined") programmers = savegame.programmers;
}
