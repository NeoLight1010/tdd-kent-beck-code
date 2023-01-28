export class Dollar {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  times(multiplier: number): void {
    this.amount *= multiplier;
  }
}

if (import.meta.main) {
  console.log("Hello World!");
}
