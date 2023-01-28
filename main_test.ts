import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";
import { Dollar } from "./main.ts";

Deno.test(function testMultiplication() {
  const five = new Dollar(5);

  five.times(2);

  assertEquals(five.amount, 10);
});
