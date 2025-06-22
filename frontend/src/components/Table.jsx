import React from 'react';

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-md">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {col.accessor ? col.accessor(row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        className="border px-2 py-1 rounded hover:bg-gray-100"
                        onClick={() => onEdit(rowIndex)}
                      >
                        📝
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="border px-2 py-1 rounded hover:bg-gray-100"
                        onClick={() => onDelete(rowIndex)}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
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
