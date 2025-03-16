import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";

test.describe("Navigation", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test("should display app version", async () => {
    const title = await dashboardPage.page.locator("h1").textContent();
    expect(title).toContain("Company Dashboard v");
  });

  test("should switch between tabs correctly", async () => {
    await expect(
      dashboardPage.page.locator('h3:has-text("Add Employee")')
    ).toBeVisible();

    await dashboardPage.openProjectsTab();
    await expect(
      dashboardPage.page.locator('h3:has-text("Add Project")')
    ).toBeVisible();
    await expect(
      dashboardPage.page.locator('h3:has-text("Add Employee")')
    ).not.toBeVisible();

    await dashboardPage.openAssignmentsTab();
    await expect(
      dashboardPage.page.locator('h3:has-text("Assign Employee to Project")')
    ).toBeVisible();

    await dashboardPage.openEmployeesTab();
    await expect(
      dashboardPage.page.locator('h3:has-text("Add Employee")')
    ).toBeVisible();
  });

  test("should reset form when switching tabs", async () => {
    await dashboardPage.openEmployeesTab();
    await dashboardPage.page.locator('input[name="name"]').fill("Test User");

    const inputValue = await dashboardPage.page
      .locator('input[name="name"]')
      .inputValue();
    expect(inputValue).toBe("Test User");

    await dashboardPage.openProjectsTab();

    await dashboardPage.openEmployeesTab();

    await dashboardPage.page.waitForTimeout(500);

    const nameInput = dashboardPage.page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible();
    const newValue = await nameInput.inputValue();
    expect(newValue).toBe("");
  });
});
