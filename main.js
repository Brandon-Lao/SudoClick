var code = 0;
var programs = 0;
var cash = 0;
var programmers = 0;
var codeCost = 20;

function refreshValues() { //Will have to work on replacing all those back down with just this. May be a bit inefficent. though.
    document.getElementById("code").innerHTML = Math.floor(code);
    document.getElementById("programs").innerHTML = Math.floor(programs);
    document.getElementById("cash").innerHTML = Math.floor(cash);
    document.getElementById("programmers").innerHTML = Math.floor(programmers);
    document.getElementById("codeCost").innerHTML = Math.floor(codeCost);
}

function codeClick(number) {
    code = code + number;
    document.getElementById("code").innerHTML = Math.floor(code);
}

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

function sellProgram() {
    if (programs > 0) {
        programs -= 1;
        cash += 10+Math.floor(getRandomInt(0,42));
        document.getElementById("programs").innerHTML = programs;
        document.getElementById("cash").innerHTML = cash;
    }
}

function hideUpgrades() {
    if (code < 20 && document.getElementById("compilecode").hidden) { //Should change this so instead of it being hidden, it inserts it instead.
        document.getElementById("compilecode").hidden = true;
    } else {
        document.getElementById("compilecode").hidden = false;
        document.getElementById("readout1").innerHTML =
            "Got enough code. Can compile it, now. And sell it.";
    }
}

hideUpgrades();

window.setInterval(function() {
    hideUpgrades();
    if (character.health === 0) jackOut(); //More immediate than the 100ms delay in sidescroller.
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
    refreshValues();
    hideUpgrades();
}
