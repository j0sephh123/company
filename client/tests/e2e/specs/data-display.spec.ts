import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";

test.describe("Data Display", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test("should display employee salary with dollar sign", async () => {
    await dashboardPage.openEmployeesTab();

    const salaryCell = await dashboardPage.page
      .locator("tbody tr")
      .first()
      .locator("td:nth-child(5)");
    const salaryText = await salaryCell.textContent();

    expect(salaryText).toMatch(/^\$[\d,]+$/);
  });

  test("should display project budget with dollar sign", async () => {
    await dashboardPage.openProjectsTab();

    const budgetCell = await dashboardPage.page
      .locator("tbody tr")
      .first()
      .locator("td:nth-child(4)");
    const budgetText = await budgetCell.textContent();

    expect(budgetText).toMatch(/^\$[\d,]+$/);
  });

  test("should display project status with colored badge", async () => {
    await dashboardPage.openProjectsTab();

    const statusCell = await dashboardPage.page
      .locator("tbody tr")
      .first()
      .locator("td:nth-child(5)");
    const badge = await statusCell.locator(".badge");

    await expect(badge).toBeVisible();

    const hasClass = await badge.evaluate((el) => {
      return (
        el.classList.contains("badge-success") ||
        el.classList.contains("badge-info") ||
        el.classList.contains("badge-warning") ||
        el.classList.contains("badge-ghost")
      );
    });

    expect(hasClass).toBeTruthy();
  });
});
