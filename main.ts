export class Dollar {
  amount: number;

  constructor(amount: number) {
    this.amount = amount * 2;
  }

  times(multiplier: number): void {}
}

if (import.meta.main) {
  console.log("Hello World!");
}
