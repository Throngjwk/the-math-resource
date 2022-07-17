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

}

var getTau = () => currency.value;

var getPrimaryEquation = () => {
    let result = "A_1\\sqrt{A_3} \\times t";

    return result;
}