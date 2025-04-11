import { ArrowRight, Database } from "lucide-react";

import { useState } from "react";

function DBForm({ type, handleSubmit }) {
  const [formData, setFormData] = useState({
    dbType: "MySQL",
    host: "localhost",
    port: "3306",
    dbName: "datamig",
    dbUsername: "root",
    dbPassword: "123123",
  });

  const handleChange = (e, type) => {
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [type]: value };
    });
  };

  const isFormIncomplete = Object.values(formData).some(
    (value) => value.trim() === ""
  );

  return (
    <form className="flex flex-col mb-5 m-2 w-1/2">
      <div className="flex flex-row justify-center gap-5 ">
        <div className="border border-[#E5E7EB] p-5 m-5 w-full">
          <h2 className="flex flex-row text-xl items-center gap-2 font-semibold pb-5">
            <Database className="w-6 h-6 text-[#3B82F6]" />
            {type} Database
          </h2>
          <div className="flex flex-col gap-5">
            <label>
              <p className="text-[#6B7280] font-semibold">Database Type</p>
              <select
                className="w-full border border-[#E5E7EB] rounded-md"
                value={formData.dbType}
                onChange={(e) => handleChange(e, "dbType")}
              >
                <option value="MySQL">MySQL</option>
              </select>
            </label>
            <label>
              <p className="text-[#6B7280] font-semibold">Host</p>
              <input
                className="w-full border border-[#E5E7EB] rounded-md"
                value={formData.host}
                onChange={(e) => handleChange(e, "host")}
              />
            </label>
            <label>
              <p className="text-[#6B7280] font-semibold">Port</p>
              <input
                className="w-full border border-[#E5E7EB] rounded-md"
                value={formData.port}
                onChange={(e) => handleChange(e, "port")}
              />
            </label>
            <label>
              <p className="text-[#6B7280] font-semibold">Database Name</p>
              <input
                className="w-full border border-[#E5E7EB] rounded-md"
                value={formData.dbName}
                onChange={(e) => handleChange(e, "dbName")}
              />
            </label>
            <label>
              <p className="text-[#6B7280] font-semibold">Username</p>
              <input
                className="w-full border border-[#E5E7EB] rounded-md"
                value={formData.dbUsername}
                onChange={(e) => handleChange(e, "dbUsername")}
              />
            </label>
            <label>
              <p className="text-[#6B7280] font-semibold">Password</p>
              <input
                className="w-full border border-[#E5E7EB] rounded-md"
                value={formData.dbPassword}
                onChange={(e) => handleChange(e, "dbPassword")}
              />
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="disabled:bg-gray-700 disabled:hover:scale-100 disabled:cursor-default m-auto bg-[#3B82F6] hover:bg-[#1D4ED8] cursor-pointer hover:scale-105 duration-200 w-fit px-6 py-3 rounded-md text-[#FFFFFF] text-xl flex items-center gap-2"
        onClick={(e) => handleSubmit(e, formData)}
        disabled={isFormIncomplete}
      >
        {type === "Source" ? "Connect Source" : "Connect Target"}{" "}
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
}

export default DBForm;
