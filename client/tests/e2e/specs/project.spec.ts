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
      status: "On Hold",
    };

    await dashboardPage.editProject(targetProject, updatedData);

    const projectRow = await dashboardPage.getProjectRow(targetProject);
    await expect(projectRow).toBeVisible();
    await expect(projectRow).toContainText(updatedData.deadline);
    await expect(projectRow).toContainText(updatedData.budget);
    await expect(projectRow).toContainText(updatedData.status);
  });

  test("should delete a project", async () => {
    // First ensure we have a project to delete by adding one if it doesn't exist
    const projectToDelete = newProject.name;

    // Check if the project already exists
    if (!(await dashboardPage.isProjectPresent(projectToDelete))) {
      await dashboardPage.addProject(newProject);
    }

    // Verify the project exists before attempting deletion
    expect(await dashboardPage.isProjectPresent(projectToDelete)).toBe(true);

    const initialCount = await dashboardPage.getProjectCount();
    await dashboardPage.deleteProject(projectToDelete);

    // Add a small wait to ensure UI updates
    await dashboardPage.page.waitForTimeout(500);

    const finalCount = await dashboardPage.getProjectCount();
    expect(finalCount).toBe(initialCount - 1);

    const isPresent = await dashboardPage.isProjectPresent(projectToDelete);
    expect(isPresent).toBe(false);
  });
});
