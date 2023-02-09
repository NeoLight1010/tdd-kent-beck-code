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
}

export class Sum implements Expression {
  augend: Money;
  addend: Money;

  constructor(augend: Money, addend: Money) {
    this.augend = augend;
    this.addend = addend;
  }

  reduce(bank: Bank, to: string): Money {
    const amount = this.augend.amount + this.addend.amount;
    return new Money(amount, to);
  }
}

export class Bank {
  private rates: Map<string, number> = new Map();

  addRate(from_: string, to: string, rate: number): void {
    const key = JSON.stringify([from_, to]);

    this.rates.set(key, rate);
  }

  rate(from_: string, to: string): number {
    return this.rates.get(JSON.stringify([from_, to])) || 0;
  }

  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
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
