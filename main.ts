export abstract class Money {
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

  abstract times(multiplier: number):  Money;

  currency(): string {
    return this._currency;
  }


  equals(obj: unknown): boolean {
    const money = <Money> obj;

    return this.amount === money.amount && (this.constructor === money.constructor);
  }

}

export class Dollar extends Money {
  times(multiplier: number): Money {
    return Money.dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  times(multiplier: number): Money {
    return Money.franc(this.amount * multiplier);
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
