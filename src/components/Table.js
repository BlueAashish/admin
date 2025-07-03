import React from "react";

const Table = ({ columns, data, onRowClick, className = "", actions }) => {
  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
              S.No.
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200"
              >
                {column.title}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr
              key={index}
              onClick={(e) => {
                const cell = e.target.closest("td");
                if (cell && cell === cell.parentElement.lastElementChild) {
                  return;
                }
                onRowClick && onRowClick(row);
              }}
              className={`hover:bg-gray-50 transition-colors duration-150 ease-in-out ${
                onRowClick ? "cursor-pointer" : ""
              } ${className}`}
            >
              <td className="px-6 py-4 text-sm text-gray-600 border-b border-gray-200">
                {index + 1}
              </td>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 text-sm text-gray-600 border-b border-gray-200"
                >
                  <div className="flex items-center">
                    {column.render
                      ? column.render(row[column.key])
                      : row[column.key]}
                  </div>
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-sm text-gray-600 border-b border-gray-200">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Table;
