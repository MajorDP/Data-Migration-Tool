import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useState } from "react";
import { getTableColumnNames } from "../services/database";

function Table({ table, handleSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [tableColumnData, setTableColumnData] = useState(null);

  const handleGetColumnData = async (tableName) => {
    setIsLoading(true);
    //TODO: Get column names of chosen table
    const { data, error } = await getTableColumnNames(tableName);

    if (data) {
      setTableColumnData(data);
    } else {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <label className="flex flex-row justify-between">
          <span className="flex flex-row items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              onChange={(e) => handleSelect(e.target.checked, table.tableName)}
            />
            {/* table names and count of rows */}
            <p className="text-[#6B7280] font-semibold">{table.tableName}</p>
            <p className="text-[#6B7280] text-sm">{table.rowCount} rows</p>
          </span>
        </label>
        {isOpen && (
          <p
            className="flex flex-row items-center cursor-pointer gap-2"
            onClick={() => setIsOpen(false)}
          >
            <span>Hide Columns</span>
            <ArrowUpIcon />
          </p>
        )}
        {!isOpen && (
          <p
            className="flex flex-row items-center cursor-pointer gap-2"
            onClick={() => {
              setIsOpen(true);
              handleGetColumnData(table.tableName);
            }}
          >
            <span>Show Columns</span>
            <ArrowDownIcon />
          </p>
        )}
      </div>

      {/* display names of tables' columns from source database here */}
      {isOpen && isLoading && <p>Loading...</p>}
      {isOpen && error && <p>{error}</p>}
      {isOpen && tableColumnData && (
        <div className="w-full bg-[#e4e4e4] mt-2">
          <ul className="w-full flex flex-row justify-between gap-16 font-bold overflow-x-auto">
            {tableColumnData.map((col) => (
              <li key={col}>{col}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Table;
