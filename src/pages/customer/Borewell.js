import React from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";

const Borewell = () => {
  const dwlrData = [
    {
      title: "Water Level",
      value: "45.2",
      unit: "m",
      timestamp: "2024-03-15 14:30",
    },
  ];

  const flowmeterData = [
    {
      title: "Totalizer",
      value: "12500",
      unit: "L",
      timestamp: "2024-03-15 14:30",
    },
    {
      title: "Today's Flow",
      value: "850",
      unit: "L",
      timestamp: "2024-03-15 14:30",
    },
    {
      title: "Current Flow",
      value: "120",
      unit: "L/min",
      timestamp: "2024-03-15 14:30",
    },
  ];

  const historyColumns = [
    { key: "timestamp", title: "Timestamp" },
    { key: "parameter", title: "Parameter" },
    { key: "value", title: "Value" },
    { key: "unit", title: "Unit" },
    { key: "status", title: "Status" },
  ];

  const historyData = [
    {
      timestamp: "2024-03-15 14:30",
      parameter: "Water Level",
      value: "45.2",
      unit: "m",
      status: "Normal",
    },
    {
      timestamp: "2024-03-15 14:30",
      parameter: "Current Flow",
      value: "120",
      unit: "L/min",
      status: "Normal",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Borewell Monitoring
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          DWLR (Digital Water Level Recorder)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dwlrData.map((reading, index) => (
            <Card
              key={index}
              title={reading.title}
              value={reading.value}
              unit={reading.unit}
              timestamp={reading.timestamp}
              className="bg-gray-50"
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Flowmeter/Telemetry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flowmeterData.map((reading, index) => (
            <Card
              key={index}
              title={reading.title}
              value={reading.value}
              unit={reading.unit}
              timestamp={reading.timestamp}
              className="bg-gray-50"
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Readings History</h2>
        <Table columns={historyColumns} data={historyData} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Device Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Device ID
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value="DWLR-001"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value="Main Borewell"
                readOnly
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Maintenance
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value="2024-03-01"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Borewell;
