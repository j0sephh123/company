import React from "react";
import { Employee, Project } from "../types";
import InputField from "./InputField";

type AssignmentFormData = {
  employeeId: string;
  projectId: string;
};

type AssignmentFormProps = {
  formData: AssignmentFormData;
  employees: Employee[];
  projects: Project[];
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const AssignmentForm: React.FC<AssignmentFormProps> = ({
  formData,
  employees,
  projects,
  onInputChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="form-control w-full max-w-md p-4 bg-base-200 rounded-lg"
    >
      <h3 className="text-lg font-bold mb-4">Assign Employee to Project</h3>

      <InputField
        label="Employee"
        name="employeeId"
        type="select"
        value={formData.employeeId || ""}
        onChange={onInputChange}
        required
        options={employees.map((emp) => ({ value: emp.id, label: emp.name }))}
        placeholder="Select Employee"
      />

      <InputField
        label="Project"
        name="projectId"
        type="select"
        value={formData.projectId || ""}
        onChange={onInputChange}
        required
        options={projects.map((proj) => ({ value: proj.id, label: proj.name }))}
        placeholder="Select Project"
      />

      <button type="submit" className="btn btn-primary">
        Assign
      </button>
    </form>
  );
};

export default AssignmentForm;
