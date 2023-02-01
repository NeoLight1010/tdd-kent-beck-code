export class Money {
  protected amount = 0;

  equals(obj: unknown): boolean {
    const money = <Money> obj;

    return this.amount === money.amount;
  }
}

export class Dollar extends Money {
  constructor(amount: number) {
    super();

    this.amount = amount;
  }

  times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super();

    this.amount = amount;
  }

  times(multiplier: number): Franc {
    return new Franc(this.amount * multiplier);
  }

  equals(obj: unknown): boolean {
    const franc = <Franc> obj;

    return this.amount === franc.amount;
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
// - [ ] Common equals
// - [ ] Common times
