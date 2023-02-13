import { assertEquals as denoAssertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { Bank, Expression, Money, Sum } from "./main.ts";

Deno.test(function testMultiplication() {
  const five: Money = Money.dollar(5);

  assertEquals(five.times(2), Money.dollar(10));
  assertEquals(five.times(3), Money.dollar(15));
});

Deno.test(function testEquals() {
  assertEquals(Money.dollar(5), Money.dollar(5));
  assertNotEquals(Money.dollar(5), Money.dollar(6));

  assertNotEquals(Money.franc(5), Money.dollar(5));
});

Deno.test(function testFrancMultiplication() {
  const five = Money.franc(5);

  assertEquals(five.times(2), Money.franc(10));
  assertEquals(five.times(3), Money.franc(15));
});

Deno.test(function testCurrency() {
  denoAssertEquals(Money.dollar(1).currency(), "USD");
  denoAssertEquals(Money.franc(1).currency(), "CHF");
});

Deno.test(function testSimpleAddition() {
  const five: Money = Money.dollar(5);
  const sum: Expression = five.plus(five);

  const bank = new Bank();
  const reduced: Money = bank.reduce(sum, "USD");

  assertEquals(Money.dollar(10), reduced);
});

Deno.test(function testPlusReturnsSum() {
  const five: Money = Money.dollar(5);
  const result: Expression = five.plus(five);
  const sum: Sum = <Sum> result;

  assertEquals(sum.augend, five);
  assertEquals(sum.addend, five);
});

Deno.test(function testReduceSum() {
  const sum: Expression = new Sum(Money.dollar(3), Money.dollar(4));
  const bank = new Bank();
  const result: Money = bank.reduce(sum, "USD");

  assertEquals(result, Money.dollar(7));
});

Deno.test(function testReduceMoney() {
  const bank = new Bank();
  const result: Money = bank.reduce(Money.dollar(3), "USD");

  assertEquals(result, Money.dollar(3));
});

Deno.test(function testReduceMoneyDifferentCurrency() {
  const bank = new Bank();
  bank.addRate("CHF", "USD", 2);

  const result = bank.reduce(Money.franc(2), "USD");
  assertEquals(result, Money.dollar(1));
});

Deno.test(function testIdentityRate() {
  denoAssertEquals(new Bank().rate("USD", "USD"), 1);
});

Deno.test(function testMixedAddition() {
  const fiveDollars: Expression = Money.dollar(5);
  const tenFrancs: Expression = Money.franc(10);

  const bank = new Bank();
  bank.addRate("CHF", "USD", 2);

  const result = bank.reduce(fiveDollars.plus(tenFrancs), "USD");
  assertEquals(result, Money.dollar(10));
});

Deno.test(function testSumPlusMoney() {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);

  const bank = new Bank();
  bank.addRate("CHF", "USD", 2);

  const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks);
  const result = bank.reduce(sum, "USD");

  assertEquals(result, Money.dollar(15));
});

Deno.test(function testSumTimes() {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);

  const bank = new Bank();
  bank.addRate("CHF", "USD", 2);

  const sum = new Sum(fiveBucks, tenFrancs).times(2);
  const result = bank.reduce(sum, "USD");

  assertEquals(result, Money.dollar(20));
});

function assertEquals(actual: any, expected: any): void {
  denoAssertEquals(
    actual.equals(expected),
    true,
    `${actual} should be equal to ${expected}`,
  );
}

function assertNotEquals(actual: any, expected: any): void {
  denoAssertEquals(
    actual.equals(expected),
    false,
    `${actual} should not be equal to ${expected}`,
  );
}
