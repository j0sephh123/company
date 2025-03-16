import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";

test.describe("Form Validation", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test("employee form should require all fields", async () => {
    await dashboardPage.openEmployeesTab();

    await dashboardPage.page.locator('button[type="submit"]').click();

    const nameInput = dashboardPage.page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible(); // Form still visible

    const isValid = await nameInput.evaluate(
      (el) => (el as HTMLInputElement).validity.valid
    );
    expect(isValid).toBeFalsy();
  });

  test("project form should validate date input", async () => {
    await dashboardPage.openProjectsTab();

    await dashboardPage.page.locator('input[name="name"]').fill("Test Project");
    await dashboardPage.page.locator('input[name="budget"]').fill("5000");
    await dashboardPage.page
      .locator('select[name="status"]')
      .selectOption("Planning");

    await dashboardPage.page.locator('button[type="submit"]').click();

    const nameInput = dashboardPage.page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible(); // Form still visible

    const dateInput = dashboardPage.page.locator('input[name="deadline"]');
    const isValid = await dateInput.evaluate(
      (el) => (el as HTMLInputElement).validity.valid
    );
    expect(isValid).toBeFalsy();
  });

  test("assignment form should require selections", async () => {
    await dashboardPage.openAssignmentsTab();

    await dashboardPage.page.locator('button[type="submit"]').click();

    const employeeSelect = dashboardPage.page.locator(
      'select[name="employeeId"]'
    );
    await expect(employeeSelect).toBeVisible(); // Form still visible

    const isValid = await employeeSelect.evaluate(
      (el) => (el as HTMLSelectElement).validity.valid
    );
    expect(isValid).toBeFalsy();
  });
});
