import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "while (sky == liver);";
var name = "The Math Resource";
var description = "AN FEATURE HERE.";
var authors = "Throngjwk";
var version = 1;

var currency;

var init = () => {
    currency = theory.createCurrency("n", "n");
    currency2 = theory.createCurrency("t", "t");

    ///////////////////
    // Regular Upgrades

    // a1
    {
        let getDesc = (level) => "A_1=" + getA1(level).toString(0);
        a1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(10, Math.log2(2))));
        a1.getDescription = (_) => Utils.getMath(getDesc(a1.level));
        a1.getInfo = (amount) => Utils.getMathTo(getDesc(a1.level), getDesc(a1.level + amount));
    }

    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "Im After Played!", "Reach 1 A1 Level.", () => a1.level > 0);
    achievement2 = theory.createAchievement(1, "Trough", "Reach 5 A1 Level.", () => a1.level > 4);
    achievement3 = theory.createAchievement(1, "Im Thousands", "Make n(t) => 1,000", () => currency.value > 1e3);
    achievement4 = theory.createAchievement(1, "Nice", "Make n(t) => 69,420", () => currency.value > 69420);

    updateAvailability();
}

var updateAvailability = () => {
    //COOL
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * currency2.value * bonus * getA1(a1.level)
    currency2.value += dt
}

var getPrimaryEquation = () => {
    let result = "\\dot{n} = A_1\\sqrt{A_3}";

    result += " \\times t"

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.164) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.164}}{3}";
var getTau = () => currency.value;

var getA1 = (level) => BigNumber.from(level)

init();