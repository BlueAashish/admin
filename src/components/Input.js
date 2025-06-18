import React from "react";

const Input = React.forwardRef(
  ({ label, error, type = "text", ...props }, ref) => {
    return (
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={props.name}
        >
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error ? "border-red-500" : ""
          }`}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-xs italic">{error.message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
