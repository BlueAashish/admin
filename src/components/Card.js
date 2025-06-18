import React from "react";

const Card = ({ title, value, unit, timestamp, className = "", children }) => {
  if (children) {
    return (
      <div className={`bg-white shadow rounded-lg ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`bg-white shadow rounded p-4 flex flex-col gap-2 ${className}`}
    >
      <div className="text-gray-500 text-xs">{title}</div>
      <div className="text-2xl font-bold">
        {value} {unit}
      </div>
      {timestamp && <div className="text-xs text-gray-400">{timestamp}</div>}
    </div>
  );
};

export { Card };
export default Card;
