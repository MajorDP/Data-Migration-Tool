import { useState } from "react";
import TableData from "./components/TableData";
import DBForm from "./components/DBForm";
import { MoveHorizontalIcon } from "lucide-react";
import { getSourceDBMetadata } from "./services/database";
import MigrationPanel from "./components/MigrationPanel";

function App() {
  const [sourceDBData, setSourceDBData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnectSource = async (e, dbCredentials) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await getSourceDBMetadata(dbCredentials);

    if (data) {
      setSourceDBData(data);
      setError(null);
    } else {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="m-10">
      <div className="bg-[#FFFFFF] w-full md:w-[90%] m-auto rounded-md border border-[#E5E7EB]">
        <div className="p-5">
          <h1 className="text-center text-4xl font-bold text-[#111827] ">
            DataMig
          </h1>

          <h2 className="text-center text-2xl font-semibold text-[#7e7e7e]">
            Migrate data from one database to another
          </h2>
        </div>
        {!sourceDBData && (
          <div className="flex flex-row justify-center">
            <DBForm type="Source" handleSubmit={handleConnectSource} />
          </div>
        )}

        {sourceDBData && <MigrationPanel sourceDBData={sourceDBData} />}
        {isLoading && <p>Loading...</p>}
        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
}

export default App;
