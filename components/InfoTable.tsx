import React from "react";

interface InfoTableProps {
  headers: string[];
  data: { [key: string]: string }[];
}

const InfoTable: React.FC<InfoTableProps> = ({ headers, data }) => {
  return (
    <table className="mt-4 w-full text-left table-auto shadow-lg rounded-lg overflow-hidden bg-white">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((header, index) => (
            <th
              key={index}
              className="px-4 py-3 text-sm font-medium text-gray-700"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-t border-gray-200 hover:bg-gray-50"
          >
            {headers.map((header, colIndex) => (
              <td key={colIndex} className="px-4 py-4">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InfoTable;
