import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";

test.describe("Cancel Button Functionality", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test("cancel button should reset employee edit form", async () => {
    await dashboardPage.openEmployeesTab();
    
    const row = await dashboardPage.page.locator('tbody tr').first();
    await row.locator('button', { hasText: 'Edit' }).click();
    
    await dashboardPage.page.locator('input[name="role"]').fill("Changed Role");
    
    await dashboardPage.page.getByRole('button', { name: 'Cancel' }).click();
    
    const addButton = dashboardPage.page.getByRole('button', { name: 'Add' });
    await expect(addButton).toBeVisible();
    
    const roleInput = dashboardPage.page.locator('input[name="role"]');
    const roleValue = await roleInput.inputValue();
    expect(roleValue).toBe("");
  });
  
  test("cancel button should reset project edit form", async () => {
    await dashboardPage.openProjectsTab();
    
    const row = await dashboardPage.page.locator('tbody tr').first();
    await row.locator('button', { hasText: 'Edit' }).click();
    
    await dashboardPage.page.locator('input[name="budget"]').fill("99999");
    
    await dashboardPage.page.getByRole('button', { name: 'Cancel' }).click();
    
    const addButton = dashboardPage.page.getByRole('button', { name: 'Add' });
    await expect(addButton).toBeVisible();
    
    const budgetInput = dashboardPage.page.locator('input[name="budget"]');
    const budgetValue = await budgetInput.inputValue();
    expect(budgetValue).toBe("");
  });
});