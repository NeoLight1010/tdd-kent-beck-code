export class Money {
  amount = 0;
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

  plus(addend: Money): Expression {
    return new Sum(this, addend);
  }

  reduce(to: string): Money {
    return this;
  }

  toString(): string {
    return this.amount.toString() + " " + this._currency;
  }
}

export interface Expression {
  reduce(to: string): Money;
}

export class Sum {
  augend: Money;
  addend: Money;

  constructor(augend: Money, addend: Money) {
    this.augend = augend;
    this.addend = addend;
  }

  reduce(to: string): Money {
    const amount = this.augend.amount + this.addend.amount;
    return new Money(amount, to);
  }
}

export class Bank {
  reduce(source: Expression, to: string): Money {
    return source.reduce(to);
  }
}

// TODO
//
// - [ ] $5 + 10 CHF = $10 if rate is 2:1
// - [ ] $5 + $5 = $10
// - [ ] Return Money from $5 + $5
// - [x] Bank.reduce(Money)
// - [ ] Reduce Money with converstion
// - [ ] Reduce(Bank, String)
//
// - [ ] Money rounding?
// - [ ] hashCode()
// - [ ] Equal null
// - [ ] Equal object
// - [ ] Delete testFrancMultiplication?
