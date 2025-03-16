import { describe, it, expect } from "vitest";
import { getInitialAssignments } from "./utils";

describe("getInitialAssignments", () => {
  it("should return a promise that resolves to an array of assignments", async () => {
    const assignmentsPromise = getInitialAssignments();
    expect(assignmentsPromise).toBeInstanceOf(Promise);

    const assignments = await assignmentsPromise;
    expect(assignments).toBeInstanceOf(Array);
  });

  it("should return a promise that resolves to an array with the correct number of assignments", async () => {
    const assignments = await getInitialAssignments();
    expect(assignments).toHaveLength(4);
  });

  it("should return assignments with the correct properties", async () => {
    const assignments = await getInitialAssignments();
    assignments.forEach((assignment) => {
      expect(assignment).toHaveProperty("id");
      expect(assignment).toHaveProperty("employeeId");
      expect(assignment).toHaveProperty("projectId");
    });
  });

  it("should return assignments with the correct data types", async () => {
    const assignments = await getInitialAssignments();
    assignments.forEach((assignment) => {
      expect(typeof assignment.id).toBe("string");
      expect(typeof assignment.employeeId).toBe("string");
      expect(typeof assignment.projectId).toBe("string");
    });
  });
});
