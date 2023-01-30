import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { Dollar } from "./main.ts";

Deno.test(function testMultiplication() {
  const five = new Dollar(5);

  let product = five.times(2);
  assertEquals(product.equals(new Dollar(10)), true);

  product = five.times(3);
  assertEquals(product.equals(new Dollar(15)), true);
});

Deno.test(function testEquals() {
  assertEquals((new Dollar(5)).equals(new Dollar(5)), true);
  assertEquals((new Dollar(5)).equals(new Dollar(6)), false);
});
