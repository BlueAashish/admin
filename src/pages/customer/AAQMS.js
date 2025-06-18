import React from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";

const AAQMS = () => {
  const parameters = [
    {
      title: "PM2.5",
      value: "12",
      unit: "µg/m³",
      timestamp: "2024-03-15 14:30",
    },
    {
      title: "PM10",
      value: "25",
      unit: "µg/m³",
      timestamp: "2024-03-15 14:30",
    },
    { title: "SOX", value: "0.05", unit: "ppm", timestamp: "2024-03-15 14:30" },
    { title: "NOX", value: "0.08", unit: "ppm", timestamp: "2024-03-15 14:30" },
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
      parameter: "PM2.5",
      value: "12",
      unit: "µg/m³",
      status: "Good",
    },
    {
      timestamp: "2024-03-15 14:30",
      parameter: "NOX",
      value: "0.08",
      unit: "ppm",
      status: "Moderate",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Air Quality Monitoring
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {parameters.map((param, index) => (
          <Card
            key={index}
            title={param.title}
            value={param.value}
            unit={param.unit}
            timestamp={param.timestamp}
            className="bg-white"
          />
        ))}
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
                value="AAQMS-001"
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
                value="Main Monitoring Station"
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
                Last Calibration
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

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Air Quality Index</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Overall AQI</span>
            <span className="text-lg font-semibold text-green-600">
              Good (45)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: 2024-03-15 14:30
          </div>
        </div>
      </div>
    </div>
  );
};

export default AAQMS;
