import { Assignment, Employee, Project } from "./types";

export const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Jane Doe",
    role: "Developer",
    department: "Engineering",
    salary: 85000,
  },
  {
    id: "2",
    name: "John Smith",
    role: "Designer",
    department: "Design",
    salary: 75000,
  },
  {
    id: "3",
    name: "Sarah Johnson",
    role: "Manager",
    department: "Engineering",
    salary: 110000,
  },
];

export const initialProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    deadline: "2023-12-15",
    budget: 25000,
    status: "In Progress",
  },
  {
    id: "2",
    name: "Mobile App",
    deadline: "2024-03-30",
    budget: 80000,
    status: "Planning",
  },
];

export function generateRandomString(length: number = 10): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

// Updated to return promises with timeouts
export function getInitialEmployees(): Promise<Employee[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialEmployees);
    }, 1000);
  });
}

export function getInitialProjects(): Promise<Project[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialProjects);
    }, 1000);
  });
}

export function getInitialAssignments(): Promise<Assignment[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", employeeId: "1", projectId: "1" },
        { id: "2", employeeId: "2", projectId: "1" },
        { id: "3", employeeId: "3", projectId: "1" },
        { id: "4", employeeId: "1", projectId: "2" },
      ]);
    }, 1000);
  });
}
