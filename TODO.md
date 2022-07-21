# TODO
In ```TheMathResource.js``` in copy than letter:
```js
  // b1
  {
        let getDesc = (level) => "B_1=" + getB1(level).toString(0);
        b1 = theory.createUpgrade(3, currency, new FirstFreeCost(new ExponentialCost(1e10, Math.log2(123456))));
        b1.getDescription = (_) => Utils.getMath(getDesc(b1.level));
        b1.getInfo = (amount) => Utils.getMathTo(getDesc(b1.level), getDesc(b1.level + amount));
  }
```
##### LETS FIND!