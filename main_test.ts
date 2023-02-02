import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { Dollar, Franc, Money } from "./main.ts";

Deno.test(function testMultiplication() {
  const five: Money = Money.dollar(5);

  assertEquals(five.times(2).equals(new Dollar(10)), true);
  assertEquals(five.times(3).equals(new Dollar(15)), true);
});

Deno.test(function testEquals() {
  assertEquals((new Dollar(5)).equals(new Dollar(5)), true);
  assertEquals((new Dollar(5)).equals(new Dollar(6)), false);

  assertEquals((new Franc(5)).equals(new Franc(5)), true);
  assertEquals((new Franc(5)).equals(new Franc(6)), false);

  assertEquals((new Franc(5)).equals(new Dollar(5)), false);
});

Deno.test(function testFrancMultiplication() {
  const five = new Franc(5);

  assertEquals(five.times(2).equals(new Franc(10)), true);
  assertEquals(five.times(3).equals(new Franc(15)), true);
});
