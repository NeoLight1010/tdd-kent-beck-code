export class Dollar {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  times(multiplier: number): Dollar {
    this.amount *= multiplier;

    return new Dollar(0);
  }
}
