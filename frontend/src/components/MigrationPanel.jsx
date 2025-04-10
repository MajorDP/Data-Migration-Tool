import { MoveHorizontalIcon } from "lucide-react";
import DBForm from "./DBForm";
import TableData from "./TableData";
import { connectTargetDb, migrateTables } from "../services/database";
import { useState } from "react";

function MigrationPanel({ sourceDBData }) {
  const [selectedTables, setSelectedTables] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSelect = (isChecked, tableName) => {
    if (isChecked) {
      setSelectedTables((prev) => [...prev, tableName]);
    } else {
      setSelectedTables((prev) => prev.filter((table) => table !== tableName));
    }
  };

  const handleMigrateData = async () => {
    const { success, error } = await migrateTables(selectedTables);

    if (success) {
      setMessage(
        selectedTables.length > 1
          ? "Selected tables migrated successfully."
          : "Selected table migrated successfully."
      );

      setTimeout(() => {
        setMessage(null);
      }, 2000);
      setError(null);
    } else {
      setError(error);
    }
  };

  const handleConnectTarget = async (e, dbCredentials) => {
    e.preventDefault();

    const { success, error } = await connectTargetDb(dbCredentials);

    if (success) {
      setError(null);
      setIsConnected(true);
    } else {
      setIsConnected(false);
      setError(error);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <DBForm type="Target" handleSubmit={handleConnectTarget} />
      <TableData dbData={sourceDBData} handleSelect={handleSelect} />
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}
      {message && (
        <p className="text-center text-green-500 font-semibold">{message}</p>
      )}
      <button
        className="disabled:bg-gray-700 disabled:hover:scale-100 disabled:cursor-default m-auto bg-[#3B82F6] hover:bg-[#1D4ED8] cursor-pointer hover:scale-105 duration-200 w-fit px-6 py-3 rounded-md text-[#FFFFFF] text-xl flex items-center gap-2"
        onClick={handleMigrateData}
        disabled={selectedTables.length === 0 || !isConnected}
      >
        Migrate Selected Data <MoveHorizontalIcon />
      </button>
    </div>
  );
}

export default MigrationPanel;
