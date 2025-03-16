import React from "react";
import { Project } from "../types";
import InputField from "./InputField";

type ProjectFormData = Omit<Project, "id">;

type ProjectFormProps = {
  formData: ProjectFormData;
  editingId: string | null;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
};

const ProjectForm: React.FC<ProjectFormProps> = ({
  formData,
  editingId,
  onInputChange,
  onSubmit,
  onReset,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="form-control w-full max-w-md p-4 bg-base-200 rounded-lg"
    >
      <h3 className="text-lg font-bold mb-4">
        {editingId ? "Edit Project" : "Add Project"}
      </h3>

      <InputField
        label="Name"
        name="name"
        value={formData.name || ""}
        onChange={onInputChange}
        required
      />

      <InputField
        label="Deadline"
        name="deadline"
        type="date"
        value={formData.deadline || ""}
        onChange={onInputChange}
        required
      />

      <InputField
        label="Budget"
        name="budget"
        type="number"
        value={formData.budget || ""}
        onChange={onInputChange}
        required
      />

      <InputField
        label="Status"
        name="status"
        type="select"
        value={formData.status || ""}
        onChange={onInputChange}
        required
        options={[
          { value: "Planning", label: "Planning" },
          { value: "In Progress", label: "In Progress" },
          { value: "On Hold", label: "On Hold" },
          { value: "Completed", label: "Completed" },
        ]}
        placeholder="Select Status"
      />

      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button type="button" onClick={onReset} className="btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
