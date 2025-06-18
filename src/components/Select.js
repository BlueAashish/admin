import React from "react";

const Select = React.forwardRef(
  ({ label, options, error, disabled = false, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={props.name}
        >
          {label}
        </label>
        <select
          ref={ref}
          disabled={disabled}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error ? "border-red-500" : ""
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          {...props}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-red-500 text-xs italic">{error.message}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
