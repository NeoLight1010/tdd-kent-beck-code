export class Dollar {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }
}


// TODO 
// 
// - [ ] $5 + 10 CHF = $10 if rate is 2:1
// - [x] $5 * 2 = $10
// - [ ] Make `amount` private.
// - [x] Dollar side effects?
// - [ ] Money rounding?
// - [ ] equals()
// - [ ] hashCode()
