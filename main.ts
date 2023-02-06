export class Money {
  protected amount = 0;
  protected _currency = "";

  static dollar(amount: number): Money {
    return new Money(amount, "USD");
  }

  static franc(amount: number): Money {
    return new Money(amount, "CHF");
  }

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this._currency = currency;
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this._currency);
  }

  currency(): string {
    return this._currency;
  }

  equals(obj: unknown): boolean {
    const money = <Money> obj;

    return this.amount === money.amount &&
      (this.currency() === money.currency());
  }

  plus(addend: Money): Money {
    return new Money(this.amount + addend.amount, this._currency);
  }

  toString(): string {
    return this.amount.toString() + " " + this._currency;
  }
}

// TODO
//
// - [ ] $5 + 10 CHF = $10 if rate is 2:1
// - [ ] $5 + $5 = $10
// - [ ] Money rounding?
// - [ ] hashCode()
// - [ ] Equal null
// - [ ] Equal object
// - [ ] Delete testFrancMultiplication?
