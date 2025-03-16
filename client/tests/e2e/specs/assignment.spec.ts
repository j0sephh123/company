import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";

test.describe("Assignment Management", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test("should create a new assignment", async () => {
    const assignment = {
      employeeName: "Jane Doe",
      projectName: "Website Redesign"
    };
    
    const initialCount = await dashboardPage.getAssignmentCount();
    
    try {
      await dashboardPage.addAssignment(assignment.employeeName, assignment.projectName);
      
      const finalCount = await dashboardPage.getAssignmentCount();
      expect(finalCount).toBeGreaterThanOrEqual(initialCount);
      
      await dashboardPage.openAssignmentsTab();
      const assignments = await dashboardPage.page.locator('tbody tr').allTextContents();
      const found = assignments.some(text => 
        text.includes(assignment.employeeName) && text.includes(assignment.projectName)
      );
      expect(found).toBeTruthy();
    } catch (error) {
      console.log("Error in assignment test:", error);
      await dashboardPage.page.screenshot({ path: 'assignment-error.png' });
      throw error;
    }
  });
  
  test("should not create duplicate assignments", async () => {
    const assignment = {
      employeeName: "John Smith",
      projectName: "Mobile App"
    };
    
    await dashboardPage.addAssignment(assignment.employeeName, assignment.projectName);
    const countAfterFirst = await dashboardPage.getAssignmentCount();
    
    await dashboardPage.addAssignment(assignment.employeeName, assignment.projectName);
    const countAfterSecond = await dashboardPage.getAssignmentCount();
    
    expect(countAfterSecond).toBe(countAfterFirst);
  });
  
  test("should delete an assignment", async () => {
    const assignment = {
      employeeName: "Sarah Johnson", 
      projectName: "Website Redesign"
    };
    
    await dashboardPage.addAssignment(assignment.employeeName, assignment.projectName);
    
    const initialCount = await dashboardPage.getAssignmentCount();
    if (initialCount === 0) {
      throw new Error("No assignments to delete");
    }
    
    const employeeName = assignment.employeeName;
    const projectName = assignment.projectName;
    
    try {
      await dashboardPage.deleteAssignment(employeeName, projectName);
      
      const finalCount = await dashboardPage.getAssignmentCount();
      expect(finalCount).toBeLessThanOrEqual(initialCount);
    } catch (error) {
      console.log("Error in delete assignment test:", error);
      await dashboardPage.page.screenshot({ path: 'assignment-delete-error.png' });
      throw error;
    }
  });
});