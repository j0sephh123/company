// tests/e2e/pages/dashboard.page.ts
import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly employeesTab: Locator;
  readonly nameInput: Locator;
  readonly roleInput: Locator;
  readonly departmentInput: Locator;
  readonly salaryInput: Locator;
  readonly submitButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.employeesTab = page.locator('button.tab:has-text("Employees")');
    this.nameInput = page.locator('input[name="name"]');
    this.roleInput = page.locator('input[name="role"]');
    this.departmentInput = page.locator('input[name="department"]');
    this.salaryInput = page.locator('input[name="salary"]');
    this.submitButton = page.locator('form button[type="submit"]');
  }

  async goto() {
    // Use relative URL for better environment flexibility
    await this.page.goto('/company/');
  }

  async openEmployeesTab() {
    await this.employeesTab.click();
  }

  async addEmployee(employee: {
    name: string;
    role: string;
    department: string;
    salary: string;
  }) {
    await this.nameInput.fill(employee.name);
    await this.roleInput.fill(employee.role);
    await this.departmentInput.fill(employee.department);
    await this.salaryInput.fill(employee.salary);
    await this.submitButton.click();
  }

  async getEmployeeRow(name: string) {
    return this.page.locator(`tbody tr:has-text("${name}")`);
  }

  async deleteEmployee(name: string) {
    const row = await this.getEmployeeRow(name);
    await row.locator('button.delete-btn').click();
    // If there's a confirmation dialog, handle it here
    // await this.page.locator('button.confirm-delete').click();
  }
}