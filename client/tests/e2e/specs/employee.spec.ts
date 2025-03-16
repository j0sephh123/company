// tests/e2e/employee.spec.ts
import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('Employee Management', () => {
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test('should add a new employee', async () => {
    // Test data
    const newEmployee = {
      name: 'Test Employee',
      role: 'QA Engineer',
      department: 'Quality Assurance',
      salary: '90000'
    };

    // Navigate to employees tab and add employee
    await dashboardPage.openEmployeesTab();
    await dashboardPage.addEmployee(newEmployee);
    
    // Verify employee exists and details are correct
    const employeeRow = await dashboardPage.getEmployeeRow(newEmployee.name);
    await expect(employeeRow).toBeVisible();
    await expect(employeeRow).toContainText(newEmployee.role);
    await expect(employeeRow).toContainText(newEmployee.department);
    await expect(employeeRow).toContainText(newEmployee.salary);
  });
});