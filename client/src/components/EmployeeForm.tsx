import React from "react";
import { Employee } from "../types";
import InputField from "./InputField";

type EmployeeFormData = Omit<Employee, "id">;

type EmployeeFormProps = {
  formData: EmployeeFormData;
  editingId: string | null;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
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
        {editingId ? "Edit Employee" : "Add Employee"}
      </h3>

      <InputField
        label="Name"
        name="name"
        value={formData.name || ""}
        onChange={onInputChange}
        required
      />

      <InputField
        label="Role"
        name="role"
        value={formData.role || ""}
        onChange={onInputChange}
        required
      />

      <InputField
        label="Department"
        name="department"
        value={formData.department || ""}
        onChange={onInputChange}
        required
      />

      <InputField
        label="Salary"
        name="salary"
        type="number"
        value={formData.salary || ""}
        onChange={onInputChange}
        required
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

export default EmployeeForm;
