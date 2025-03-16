import { useState } from "react";
import { generateRandomString } from "./utils";
import { Assignment, Employee, Project, Tabs } from "./types";
import employeeFactory from "./domain/employee/employeeFactory";
import projectFactory from "./domain/project/projectFactory";
import TabsComponent from "./components/TabsComponent";
import EmployeeForm from "./components/EmployeeForm";
import ProjectForm from "./components/ProjectForm";
import AssignmentForm from "./components/AssignmentForm";
import Table, { Column } from "./components/Table";
import useEditStore from "./store/editStore";
import { useEmployees, useProjects, useAssignments } from "./hooks/useQueries";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type EmployeeFormData = Omit<Employee, "id">;
type ProjectFormData = Omit<Project, "id">;
type AssignmentFormData = {
  employeeId: string;
  projectId: string;
};

type FormDataType = EmployeeFormData | ProjectFormData | AssignmentFormData;

// Create a client
const queryClient = new QueryClient();

// Wrap the app with QueryClientProvider
export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

function App() {
  // Use React Query hooks instead of useState with initial data
  const { data: employees = [] } = useEmployees();
  console.log({employees});
  
  const { data: projects = [] } = useProjects();
  const { data: assignments = [] } = useAssignments();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<Tabs>("employees");
  const [formData, setFormData] = useState<FormDataType>({} as FormDataType);
  const { editingId, setEditingId, resetEditingId } = useEditStore();

  // Mutations for data updates
  const employeeMutation = useMutation({
    mutationFn: (newEmployee: Employee) => Promise.resolve(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const projectMutation = useMutation({
    mutationFn: (newProject: Project) => Promise.resolve(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const assignmentMutation = useMutation({
    mutationFn: (newAssignment: Assignment) => Promise.resolve(newAssignment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

  const addEmployee = (employee: EmployeeFormData) => {
    const newEmployee = employeeFactory(employee);
    employeeMutation.mutate(newEmployee);
    queryClient.setQueryData(["employees"], [...employees, newEmployee]);
    resetForm();
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    employeeMutation.mutate(updatedEmployee);
    queryClient.setQueryData(
      ["employees"],
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    resetForm();
  };

  const deleteEmployee = (id: Employee["id"]) => {
    // Create a direct mutation first to update UI immediately
    const filteredEmployees = employees.filter((emp) => emp.id !== id);
    const filteredAssignments = assignments.filter((a) => a.employeeId !== id);

    // Update the cache immediately for UI consistency
    queryClient.setQueryData(["employees"], filteredEmployees);
    queryClient.setQueryData(["assignments"], filteredAssignments);

    // Then trigger the mutation for server-side effects
    employeeMutation.mutate({ id } as Employee);
  };

  const addProject = (project: ProjectFormData) => {
    const newProject = projectFactory(project);
    projectMutation.mutate(newProject);
    queryClient.setQueryData(["projects"], [...projects, newProject]);
    resetForm();
  };

  const updateProject = (updatedProject: Project) => {
    projectMutation.mutate(updatedProject);
    queryClient.setQueryData(
      ["projects"],
      projects.map((proj) =>
        proj.id === updatedProject.id ? updatedProject : proj
      )
    );
    resetForm();
  };

  const deleteProject = (id: Project["id"]) => {
    // Create a direct mutation first to update UI immediately
    const filteredProjects = projects.filter((proj) => proj.id !== id);
    const filteredAssignments = assignments.filter((a) => a.projectId !== id);

    // Update the cache immediately for UI consistency
    queryClient.setQueryData(["projects"], filteredProjects);
    queryClient.setQueryData(["assignments"], filteredAssignments);

    // Then trigger the mutation for server-side effects
    projectMutation.mutate({ id } as Project);
  };

  const addAssignment = (assignment: Assignment) => {
    const exists = assignments.some(
      (a) =>
        a.employeeId === assignment.employeeId &&
        a.projectId === assignment.projectId
    );

    if (!exists) {
      const newAssignment = {
        ...assignment,
        id: generateRandomString(8),
      };
      assignmentMutation.mutate(newAssignment);
      queryClient.setQueryData(
        ["assignments"],
        [...assignments, newAssignment]
      );
    }
    resetForm();
  };

  const deleteAssignment = (id: Assignment["id"]) => {
    assignmentMutation.mutate({ id } as Assignment);
    queryClient.setQueryData(
      ["assignments"],
      assignments.filter((a) => a.id !== id)
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (activeTab === "employees") {
      const employeeData = formData as EmployeeFormData;
      if (editingId) {
        updateEmployee({ ...employeeData, id: editingId });
      } else {
        addEmployee(employeeData);
      }
    } else if (activeTab === "projects") {
      const projectData = formData as ProjectFormData;
      if (editingId) {
        updateProject({ ...projectData, id: editingId });
      } else {
        addProject(projectData);
      }
    } else if (activeTab === "assignments") {
      const assignmentData = formData as AssignmentFormData;
      const newAssignment = {
        id: generateRandomString(8),
        employeeId: assignmentData.employeeId,
        projectId: assignmentData.projectId,
      };
      addAssignment(newAssignment);
    }
  };

  const startEditing = (item: Employee | Project) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const resetForm = () => {
    setFormData({} as FormDataType);
    resetEditingId();
  };

  const getEmployeeName = (id: Employee["id"]) => {
    const employee = employees.find((e) => e.id === id);
    return employee ? employee.name : "Unknown";
  };

  const getProjectName = (id: Project["id"]) => {
    const project = projects.find((p) => p.id === id);
    return project ? project.name : "Unknown";
  };

  const handleTabChange = (tab: Tabs) => {
    setActiveTab(tab);
    resetForm();
  };

  const renderEmployeeForm = () => (
    <EmployeeForm
      formData={formData as EmployeeFormData}
      editingId={editingId}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onReset={resetForm}
    />
  );

  const renderProjectForm = () => (
    <ProjectForm
      formData={formData as ProjectFormData}
      editingId={editingId}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onReset={resetForm}
    />
  );

  const renderAssignmentForm = () => (
    <AssignmentForm
      formData={formData as AssignmentFormData}
      employees={employees}
      projects={projects}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );

  const renderEmployees = () => {
    const columns: Column<Employee>[] = [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: "name" },
      { header: "Role", accessor: "role" },
      { header: "Department", accessor: "department" },
      {
        header: "Salary",
        accessor: (emp) => `$${emp.salary}`,
      },
      {
        header: "Actions",
        accessor: (emp) => (
          <div className="flex gap-2">
            <button onClick={() => startEditing(emp)} className="btn btn-sm">
              Edit
            </button>
            <button
              onClick={() => deleteEmployee(emp.id)}
              className="btn btn-sm btn-error"
            >
              Delete
            </button>
          </div>
        ),
      },
    ];

    return <Table data={employees} columns={columns} keyField="id" />;
  };

  const renderProjects = () => {
    const columns: Column<Project>[] = [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: "name" },
      { header: "Deadline", accessor: "deadline" },
      {
        header: "Budget",
        accessor: (proj) => `$${proj.budget.toLocaleString()}`,
      },
      {
        header: "Status",
        accessor: (proj) => (
          <span
            className={`badge ${
              proj.status === "Completed"
                ? "badge-success"
                : proj.status === "In Progress"
                ? "badge-info"
                : proj.status === "On Hold"
                ? "badge-warning"
                : "badge-ghost"
            }`}
          >
            {proj.status}
          </span>
        ),
      },
      {
        header: "Actions",
        accessor: (proj) => (
          <div className="flex gap-2">
            <button onClick={() => startEditing(proj)} className="btn btn-sm">
              Edit
            </button>
            <button
              onClick={() => deleteProject(proj.id)}
              className="btn btn-sm btn-error"
            >
              Delete
            </button>
          </div>
        ),
      },
    ];

    return <Table data={projects} columns={columns} keyField="id" />;
  };

  const renderAssignments = () => {
    const columns: Column<Assignment>[] = [
      { header: "ID", accessor: "id" },
      {
        header: "Employee",
        accessor: (assignment) => getEmployeeName(assignment.employeeId),
      },
      {
        header: "Project",
        accessor: (assignment) => getProjectName(assignment.projectId),
      },
      {
        header: "Actions",
        accessor: (assignment) => (
          <button
            onClick={() => deleteAssignment(assignment.id)}
            className="btn btn-sm btn-error"
          >
            Delete
          </button>
        ),
      },
    ];

    return <Table data={assignments} columns={columns} keyField="id" />;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Company Dashboard v{import.meta.env.VITE_APP_VERSION}
      </h1>

      <TabsComponent
        activeTab={activeTab}
        onChange={handleTabChange}
        options={[
          { value: "employees", label: "Employees" },
          { value: "projects", label: "Projects" },
          { value: "assignments", label: "Assignments" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {activeTab === "employees" && renderEmployeeForm()}
          {activeTab === "projects" && renderProjectForm()}
          {activeTab === "assignments" && renderAssignmentForm()}
        </div>

        <div className="lg:col-span-2">
          {activeTab === "employees" && renderEmployees()}
          {activeTab === "projects" && renderProjects()}
          {activeTab === "assignments" && renderAssignments()}
        </div>
      </div>
    </div>
  );
}
