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

    // a2
    {
        let getDesc = (level) => "A_2=" + getA2(level).toString(0);
        a2 = theory.createUpgrade(1, currency, new ExponentialCost(1e5, Math.log2(2.5)));
        a2.getDescription = (_) => Utils.getMath(getDesc(a2.level));
        a2.getInfo = (amount) => Utils.getMathTo(getDesc(a2.level), getDesc(a2.level + amount));
    }

    // a3
    {
        let getDesc = (level) => "A_3=" + getA3(level).toString(0);
        a3 = theory.createUpgrade(2, currency, new ExponentialCost(1e9, Math.log2(2.5)));
        a3.getDescription = (_) => Utils.getMath(getDesc(a3.level));
        a3.getInfo = (amount) => Utils.getMathTo(getDesc(a3.level), getDesc(a3.level + amount));
    }

    // b1
    {
        let getDesc = (level) => "B_1=" + getB1(level).toString(0);
        b1 = theory.createUpgrade(3, currency, new FirstFreeCost(new ExponentialCost(1e10, Math.log2(123456))));
        b1.getDescription = (_) => Utils.getMath(getDesc(b1.level));
        b1.getInfo = (amount) => Utils.getMathTo(getDesc(b1.level), getDesc(b1.level + amount));
    }

    // b2
    {
        let getDesc = (level) => "B_2=" + getB1(level).toString(0);
        b2 = theory.createUpgrade(4, currency, new FirstFreeCost(new ExponentialCost(1e24, Math.log2(123456789))));
        b2.getDescription = (_) => Utils.getMath(getDesc(b2.level));
        b2.getInfo = (amount) => Utils.getMathTo(getDesc(b2.level), getDesc(b2.level + amount));
    }

    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "Im After Played!", "Reach 1 A1 Level.", () => a1.level > 0);
    achievement2 = theory.createAchievement(1, "Trough", "Reach 5 A1 Level.", () => a1.level > 4);
    achievement3 = theory.createAchievement(2, "Im Thousands", "Make n(t) => 1,000", () => currency.value > 1e3);
    achievement4 = theory.createAchievement(3, "Nice", "Make n(t) => 69,420", () => currency.value > 69420);
    achievement5 = theory.createAchievement(4, "A2 Mulit?", "Reach 1 A2 Level.", () => a2.level > 0);
    achievement6 = theory.createAchievement(5, "Im Millions", "Make n(t) => 1,000,000", () => currency.value > 1e6);
    achievement7 = theory.createAchievement(6, "Defalut This!", "Reach 10 A2 Level.", () => a2.level > 9);
    achievement8 = theory.createAchievement(7, "Im Billions (Unlock I)", "Make n(t) => 1e9 Reward: Unlock new Upgrades.", () => currency.value > 1e9);
    achievement9 = theory.createAchievement(8, "A3 Mulit?", "Reach 1 A3 Level.", () => a3.level > 0);
    achievement10 = theory.createAchievement(9, "Last of Kind long", "Reach 4 A3 Level. Reward: Unlock New Letter.", () => a3.level > 3);
    achievement11 = theory.createAchievement(10, "B1 Power await", "Reach 1 B1 Level.", () => b1.level > 0);
    achievement12 = theory.createAchievement(11, "Dialogue Squared", "Make n(t) => 1e20", () => currency.value > 1e9);
    achievement13 = theory.createAchievement(12, "5 B1 (QoL I & Unlock II)", "Reach 5 B1 Level. Reward:t Exponent by 0.5 and Unlock new B2.", () => b1.level > 4);

    updateAvailability();
}

var updateAvailability = () => {
    a3.isAvailable = currency.value > 1e9;
    b1.isAvailable = a3.level > 3
    b2.isAvailable = b1.level > 4
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * currency2.value * bonus * getA1(a1.level) * BigNumber.from(256).pow(getB1(b1.level))
    currency2.value += dt
}

var getPrimaryEquation = () => {
    let result = "\\dot{n} = A_1";

    if (b1.level > 3) result += "^{B_2}"

    result += " \\times t"

    if (b1.level > 3) result += "^{1.5}"

    if (a3.level > 3) result += " \\times 256^{B_1}"

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.097) / BigNumber.from(36).sqrt();
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.096}}{\\sqrt{36}}";
var getTau = () => currency.value;

var getA1 = (level) => BigNumber.from(level) * getA2(a2.level)
var getA2 = (level) => BigNumber.from(level + 1) * getA3(a3.level)
var getA3 = (level) => BigNumber.from(level + 1)
var getB1 = (level) => BigNumber.from(level)
var getB2 = (level) => BigNumber.from(level + 1)

init();