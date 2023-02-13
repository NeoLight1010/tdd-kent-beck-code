export class Money implements Expression {
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

  times(multiplier: number): Expression {
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

  plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  reduce(bank: Bank, to: string): Money {
    const rate = bank.rate(this._currency, to);

    return new Money(this.amount / rate, to);
  }

  toString(): string {
    return this.amount.toString() + " " + this._currency;
  }
}

export interface Expression {
  reduce(bank: Bank, to: string): Money;

  plus(addend: Expression): Expression;

  times(multiplier: number): Expression;
}

export class Sum implements Expression {
  augend: Expression;
  addend: Expression;

  constructor(augend: Expression, addend: Expression) {
    this.augend = augend;
    this.addend = addend;
  }

  reduce(bank: Bank, to: string): Money {
    const amount = this.augend.reduce(bank, to).amount +
      this.addend.reduce(bank, to).amount;
    return new Money(amount, to);
  }

  plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  times(multiplier: number): Expression {
    return new Sum(
      this.augend.times(multiplier),
      this.addend.times(multiplier),
    );
  }
}

export class Bank {
  private rates: Map<string, number> = new Map();

  addRate(from_: string, to: string, rate: number): void {
    this.rates.set(this.seralizeExhangeRate(from_, to), rate);
  }

  rate(from_: string, to: string): number {
    if (from_ === to) {
      return 1;
    }

    return this.rates.get(this.seralizeExhangeRate(from_, to)) || 0;
  }

  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
  }

  private seralizeExhangeRate(from_: string, to: string): string {
    return JSON.stringify([from_, to]);
  }
}

// TODO
//
// - [x] $5 + 10 CHF = $10 if rate is 2:1
// - [x] $5 + $5 = $10
// - [x] Return Money from $5 + $5
// - [x] Bank.reduce(Money)
// - [x] Reduce Money with conversion
// - [x] Reduce(Bank, String)
// - [x] Sum.plus
// - [x] Expression.times
//
// - [ ] Money rounding?
// - [ ] hashCode()
// - [ ] Equal null
// - [ ] Equal object
// - [ ] Delete testFrancMultiplication?
