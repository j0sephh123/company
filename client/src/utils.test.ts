import { describe, it, expect } from 'vitest'
import { getInitialAssignments } from "./utils";

describe("getInitialAssignments", () => {
  it("should return an array of assignments", () => {
    const assignments = getInitialAssignments();
    expect(assignments).toBeInstanceOf(Array);
  });

  it("should return an array with the correct number of assignments", () => {
    const assignments = getInitialAssignments();
    expect(assignments).toHaveLength(4);
  });

  it("should return assignments with the correct properties", () => {
    const assignments = getInitialAssignments();
    assignments.forEach((assignment) => {
      expect(assignment).toHaveProperty("id");
      expect(assignment).toHaveProperty("employeeId");
      expect(assignment).toHaveProperty("projectId");
    });
  });

  it("should return assignments with the correct data types", () => {
    const assignments = getInitialAssignments();
    assignments.forEach((assignment) => {
      expect(typeof assignment.id).toBe("number");
      expect(typeof assignment.employeeId).toBe("number");
      expect(typeof assignment.projectId).toBe("number");
    });
  });
});
