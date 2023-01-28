import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { Dollar } from "./main.ts";

Deno.test(function testMultiplication() {
  const five = new Dollar(5);

  let product = five.times(2);
  assertEquals(product.amount, 10);

  product = five.times(3);
  assertEquals(product.amount, 15);
});
