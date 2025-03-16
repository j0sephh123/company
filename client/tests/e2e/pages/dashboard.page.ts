/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/dashboard.page.ts
import { Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForSelector('.tabs');
  }

  async openEmployeesTab() {
    await this.page.locator('.tabs button', { hasText: 'Employees' }).click();
    await this.page.waitForSelector('form');
  }
  
  async openProjectsTab() {
    await this.page.locator('.tabs button', { hasText: 'Projects' }).click();
    await this.page.waitForSelector('form');
  }
  
  async openAssignmentsTab() {
    await this.page.locator('.tabs button', { hasText: 'Assignments' }).click();
    await this.page.waitForSelector('form');
  }

  async addEmployee(employee: any) {
    await this.openEmployeesTab();
    await this.page.locator('input[name="name"]').fill(employee.name);
    await this.page.locator('input[name="role"]').fill(employee.role);
    await this.page.locator('input[name="department"]').fill(employee.department);
    await this.page.locator('input[name="salary"]').fill(employee.salary.toString());
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(100);
  }

  async getEmployeeRow(name: string) {
    return this.page.locator('tbody tr', { hasText: name }).first();
  }
  
  async editEmployee(name: string, updatedData: any) {
    await this.openEmployeesTab();
    const row = await this.getEmployeeRow(name);
    await row.locator('button', { hasText: 'Edit' }).click();
    
    if (updatedData.role) {
      await this.page.locator('input[name="role"]').fill(updatedData.role);
    }
    if (updatedData.department) {
      await this.page.locator('input[name="department"]').fill(updatedData.department);
    }
    if (updatedData.salary) {
      await this.page.locator('input[name="salary"]').fill(updatedData.salary.toString());
    }
    
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(100);
  }
  
  async deleteEmployee(name: string) {
    await this.openEmployeesTab();
    const row = await this.getEmployeeRow(name);
    await row.locator('button', { hasText: 'Delete' }).click();
    await this.page.waitForTimeout(100);
  }

  async getEmployeeCount() {
    await this.openEmployeesTab();
    return this.page.locator('tbody tr').count();
  }
  
  async isEmployeePresent(name: string) {
    await this.openEmployeesTab();
    const count = await this.page.locator('tbody tr', { hasText: name }).count();
    return count > 0;
  }
  
  async addProject(project: any) {
    await this.openProjectsTab();
    await this.page.locator('input[name="name"]').fill(project.name);
    await this.page.locator('input[name="deadline"]').fill(project.deadline);
    await this.page.locator('input[name="budget"]').fill(project.budget.toString());
    await this.page.locator('select[name="status"]').selectOption(project.status);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(100);
  }
  
  async getProjectRow(name: string) {
    return this.page.locator('tbody tr', { hasText: name }).first();
  }
  
  async editProject(name: string, updatedData: any) {
    await this.openProjectsTab();
    const row = await this.getProjectRow(name);
    await row.locator('button', { hasText: 'Edit' }).click();
    
    if (updatedData.deadline) {
      await this.page.locator('input[name="deadline"]').fill(updatedData.deadline);
    }
    if (updatedData.budget) {
      await this.page.locator('input[name="budget"]').fill(updatedData.budget.toString());
    }
    if (updatedData.status) {
      await this.page.locator('select[name="status"]').selectOption(updatedData.status);
    }
    
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(100);
  }
  
  async deleteProject(name: string) {
    await this.openProjectsTab();
    const row = await this.getProjectRow(name);
    await row.locator('button', { hasText: 'Delete' }).click();
    await this.page.waitForTimeout(100);
  }
  
  async getProjectCount() {
    await this.openProjectsTab();
    return this.page.locator('tbody tr').count();
  }
  
  async isProjectPresent(name: string) {
    await this.openProjectsTab();
    const count = await this.page.locator('tbody tr', { hasText: name }).count();
    return count > 0;
  }
  
  async addAssignment(employeeName: string, projectName: string) {
    await this.openAssignmentsTab();
    await this.page.locator('select[name="employeeId"]').selectOption({ label: employeeName });
    await this.page.locator('select[name="projectId"]').selectOption({ label: projectName });
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(100);
  }
  
  async getAssignmentRow(employeeName: string, projectName: string) {
    return this.page.locator('tbody tr', { hasText: employeeName })
      .filter({ hasText: projectName })
      .first();
  }
  
  async deleteAssignment(employeeName: string, projectName: string) {
    await this.openAssignmentsTab();
    const row = await this.getAssignmentRow(employeeName, projectName);
    await row.locator('button', { hasText: 'Delete' }).click();
    await this.page.waitForTimeout(100);
  }
  
  async getAssignmentCount() {
    await this.openAssignmentsTab();
    return this.page.locator('tbody tr').count();
  }
}