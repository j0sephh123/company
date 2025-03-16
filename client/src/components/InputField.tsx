import React from "react";

type InputFieldProps = {
  label: string;
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: "text" | "number" | "date" | "select";
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  options = [],
  placeholder = "",
}) => {
  return (
    <div className="mb-4">
      <label className="label">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>

      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="select select-bordered w-full"
          required={required}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="input input-bordered w-full"
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;
