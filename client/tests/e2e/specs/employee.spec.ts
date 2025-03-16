import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";
import { newEmployee } from "../fixtures/mocks/user-data";

test.describe("Employee Management", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test("should add a new employee", async () => {
    await dashboardPage.addEmployee(newEmployee);

    const employeeRow = await dashboardPage.getEmployeeRow(newEmployee.name);
    await expect(employeeRow).toBeVisible();

    const rowText = await employeeRow.textContent();
    expect(rowText).toContain(newEmployee.role);
    expect(rowText).toContain(newEmployee.department);
    expect(rowText).toContain(newEmployee.salary.toString());
  });

  test("should edit an existing employee", async () => {
    const targetEmployee = "Jane Doe";
    const updatedData = {
      name: "Jane Doe",
      role: "Senior Developer",
      department: "Engineering",
      salary: "95000",
    };

    await dashboardPage.editEmployee(targetEmployee, updatedData);

    const employeeRow = await dashboardPage.getEmployeeRow(targetEmployee);
    await expect(employeeRow).toBeVisible();

    const rowText = await employeeRow.textContent();
    expect(rowText).toContain(updatedData.role);
    expect(rowText).toContain(updatedData.salary);
  });

  test("should delete an employee", async () => {
    // First ensure we have an employee to delete by adding one
    const employeeToDelete = newEmployee.name;
    await dashboardPage.addEmployee(newEmployee);

    // Verify the employee exists before attempting deletion
    expect(await dashboardPage.isEmployeePresent(employeeToDelete)).toBe(true);

    const initialCount = await dashboardPage.getEmployeeCount();

    await dashboardPage.deleteEmployee(employeeToDelete);

    // Add a small wait to ensure UI updates
    await dashboardPage.page.waitForTimeout(500);

    const finalCount = await dashboardPage.getEmployeeCount();
    expect(finalCount).toBe(initialCount - 1);

    const isPresent = await dashboardPage.isEmployeePresent(employeeToDelete);
    expect(isPresent).toBe(false);
  });
});
