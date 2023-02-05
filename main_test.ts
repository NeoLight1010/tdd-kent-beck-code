import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { Money } from "./main.ts";

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
