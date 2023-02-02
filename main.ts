export class Money {
  protected amount = 0;

  static dollar(amount: number): Dollar {
    return new Dollar(amount);
  }

  equals(obj: unknown): boolean {
    const money = <Money> obj;

    return this.amount === money.amount && (this.constructor === money.constructor);
  }
}

export class Dollar extends Money {
  constructor(amount: number) {
    super();

    this.amount = amount;
  }

  times(multiplier: number): Money {
    return new Dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super();

    this.amount = amount;
  }

  times(multiplier: number): Money {
    return new Franc(this.amount * multiplier);
  }
}


// TODO 
// 
// - [ ] $5 + 10 CHF = $10 if rate is 2:1
// - [x] $5 * 2 = $10
// - [x] Make `amount` private.
// - [x] Dollar side effects?
// - [ ] Money rounding?
// - [x] equals()
// - [ ] hashCode()
// - [ ] Equal null
// - [ ] Equal object
// - [x] 5 CHF * 2 = 10 CHF
// - [ ] Dollar/Franc duplication
// - [x] Common equals
// - [ ] Common times
// - [x] Compare Francs with Dollars
// - [ ] Currency?
