import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { Bank, Expression, Money, Sum } from "./main.ts";

Deno.test(function testMultiplication() {
  const five: Money = Money.dollar(5);

  assertEquals(five.times(2).equals(Money.dollar(10)), true);
  assertEquals(five.times(3).equals(Money.dollar(15)), true);
});

Deno.test(function testEquals() {
  assertEquals((Money.dollar(5)).equals(Money.dollar(5)), true);
  assertEquals((Money.dollar(5)).equals(Money.dollar(6)), false);

  assertEquals((Money.franc(5)).equals(Money.dollar(5)), false);
});

Deno.test(function testFrancMultiplication() {
  const five = Money.franc(5);

  assertEquals(five.times(2).equals(Money.franc(10)), true);
  assertEquals(five.times(3).equals(Money.franc(15)), true);
});

Deno.test(function testCurrency() {
  assertEquals(Money.dollar(1).currency(), "USD");
  assertEquals(Money.franc(1).currency(), "CHF");
});

Deno.test(function testSimpleAddition() {
  const five: Money = Money.dollar(5);
  const sum: Expression = five.plus(five);

  const bank = new Bank();
  const reduced: Money = bank.reduce(sum, "USD");

  assertEquals(Money.dollar(10).equals(reduced), true);
});

Deno.test(function testPlusReturnsSum() {
  const five: Money = Money.dollar(5);
  const result: Expression = five.plus(five);
  const sum: Sum = <Sum> result;

  assertEquals(sum.augend.equals(five), true);
  assertEquals(sum.addend.equals(five), true);
});

Deno.test(function testReduceSum() {
  const sum: Expression = new Sum(Money.dollar(3), Money.dollar(4));
  const bank = new Bank();
  const result: Money = bank.reduce(sum, "USD");

  assertEquals(result.equals(Money.dollar(7)), true);
});

Deno.test(function testReduceMoney() {
  const bank = new Bank();
  const result: Money = bank.reduce(Money.dollar(3), "USD");

  assertEquals(result.equals(Money.dollar(3)), true);
});

Deno.test(function testReduceMoneyDifferentCurrency() {
  const bank = new Bank();
  bank.addRate("CHF", "USD", 2);

  const result = bank.reduce(Money.franc(2), "USD");
  assertEquals(result.equals(Money.dollar(1)), true);
});
