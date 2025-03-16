import { describe, it, expect } from 'vitest'
import { sum } from "./utils";

describe("sum", () => {
  it("should add two numbers correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
