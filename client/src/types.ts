export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  salary: number;
};

export type Project = {
  id: string;
  name: string;
  deadline: string;
  budget: number;
  status: string;
};

export type Assignment = {
  id: string;
  employeeId: string;
  projectId: string;
};

export type Tabs = "employees" | "projects" | "assignments";
