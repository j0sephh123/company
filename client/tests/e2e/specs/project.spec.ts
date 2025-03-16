import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";
import { newProject } from "../fixtures/mocks/project-data";

test.describe("Project Management", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.openProjectsTab();
  });

  test("should add a new project", async () => {
    await dashboardPage.addProject(newProject);
    
    const projectRow = await dashboardPage.getProjectRow(newProject.name);
    await expect(projectRow).toBeVisible();
    await expect(projectRow).toContainText(newProject.deadline);
    await expect(projectRow).toContainText(newProject.budget.toString());
    await expect(projectRow).toContainText(newProject.status);
  });

  test("should edit an existing project", async () => {
    const targetProject = "Website Redesign";
    const updatedData = {
      name: "Website Redesign",
      deadline: "2023-12-30",
      budget: "35000",
      status: "On Hold"
    };
    
    await dashboardPage.editProject(targetProject, updatedData);
    
    const projectRow = await dashboardPage.getProjectRow(targetProject);
    await expect(projectRow).toBeVisible();
    await expect(projectRow).toContainText(updatedData.deadline);
    await expect(projectRow).toContainText(updatedData.budget);
    await expect(projectRow).toContainText(updatedData.status);
  });
  
  test("should delete a project", async () => {
    const projectToDelete = "Mobile App";
    
    const initialCount = await dashboardPage.getProjectCount();
    await dashboardPage.deleteProject(projectToDelete);
    
    const finalCount = await dashboardPage.getProjectCount();
    expect(finalCount).toBe(initialCount - 1);
    
    const deleted = await dashboardPage.isProjectPresent(projectToDelete);
    expect(deleted).toBe(false);
  });
});