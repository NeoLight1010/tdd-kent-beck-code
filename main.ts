export class Money {
  protected amount = 0;
  protected _currency = "";

  static dollar(amount: number): Money {
    return new Dollar(amount, "USD");
  }

  static franc(amount: number): Franc {
    return new Franc(amount, "CHF");
  }

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this._currency = currency;
  }

  times(multiplier: number): Money {
    return new Money(0, "");
  }

  currency(): string {
    return this._currency;
  }

  equals(obj: unknown): boolean {
    const money = <Money> obj;

    return this.amount === money.amount &&
      (this.currency() === money.currency());
  }

  toString(): string {
    return this.amount.toString() + " " + this._currency;
  }
}

export class Dollar extends Money {
  times(multiplier: number): Money {
    return new Dollar(this.amount * multiplier, this._currency);
  }
}

export class Franc extends Money {
  times(multiplier: number): Money {
    return new Franc(this.amount * multiplier, this._currency);
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
// - [x] Currency?
// - [ ] Delete testFrancMultiplication?
//
// Personal TODO
// - [ ] Don't export Franc and Dollar
