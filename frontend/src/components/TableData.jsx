import { Database } from "lucide-react";

import Table from "./Table";

function TableData({ dbData, handleSelect }) {
  return (
    <div className="border border-[#E5E7EB] m-5 p-5 w-full">
      <h2 className="flex flex-row text-xl items-center gap-2 font-semibold pb-5">
        <Database className="w-6 h-6 text-[#3B82F6]" />
        Source Table Data
      </h2>
      <div className="flex flex-col gap-5">
        {dbData.map((table, index) => (
          <Table table={table} handleSelect={handleSelect} key={index} />
        ))}
      </div>
    </div>
  );
}

export default TableData;
