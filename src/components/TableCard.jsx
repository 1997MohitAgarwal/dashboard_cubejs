import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const TableCard = ({ title, description, data, datatableProperties }) => {
  // Ensure tableData is an array, default to empty if data or data[0].data is undefined
  const tableData = data[0]?.data || [];
  console.log(data, "data");
  console.log(tableData, "tD");

  // Pagination state
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Calculate the data to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = tableData.slice(startIndex, endIndex);

  // Filter visible columns based on columnsVisible
  const visibleColumns = datatableProperties.columnOrder.filter(
    (col) => datatableProperties.columnsVisible[col]
  );

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 h-full shadow-none">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3 overflow-hidden">
        <div className="flex justify-between items-center w-full">
        <div className="flex flex-col min-w-0">
          <h3 className="text-xl font-medium">
            {title}
          </h3>
          <p className="text-xs text-gray-500 truncate">{description}</p>
        </div>
        <button className="px-3 inline-flex py-1.5 text-sm bg-teal-800 text-white rounded-xl">Filters(1)<ChevronDown className="ml-2"/></button>
        </div>
      </div>

      {/* Table Section */}
      {tableData.length === 0 ? (
        <p className="text-xs text-gray-500 text-center py-2">No data available</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-300">
                  {visibleColumns.map((col) => (
                    <th
                      key={col}
                      className="py-2 px-3 text-xs bg-gray-200 text-gray-500 font-bold whitespace-nowrap"
                    >
                      {col
                        .replace("blinkit_insights_sku.", "")
                        .replace("blinkit_insights_city.", "")
                        .replace("blinkit_scraping_stream.", "")
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:text-gray-700 transition-colors">
                    {visibleColumns.map((col) => (
                      <td
                        key={col}
                        className={`py-2 px-3 whitespace-nowrap ${
                          col === "blinkit_insights_sku.name" || "blinkit_insights_city.name" ? "text-xs text-gray-600" : "text-xs text-gray-400"
                        }`}
                      >
                        {row[col] !== undefined && row[col] !== null ? row[col] : "N/A"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          {tableData.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Previous
              </button>

              <span className="text-xs text-gray-600">Page {currentPage} of {totalPages}</span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TableCard;