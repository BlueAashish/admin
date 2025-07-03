import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { useUserSensorReadingService } from "../../services/sensorForuser";
import { useNavigate } from "react-router-dom";

const Borewell = () => {
  const { getUserSensorReadings } = useUserSensorReadingService();
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUserSensorReadings();
        // Log the response to help with mapping
        console.log("Sensor Readings Response:", response);
        setSensorData(response.data || []);
      } catch (err) {
        setError("Failed to fetch sensor readings");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const dwlrData = sensorData
    .filter(
      (item) => item.type === "piezometer_dwlr" || item.title === "Water Level"
    )
    .map((reading) => ({
      title: "Water Level",
      value: reading.waterLevel || reading.value,
      unit: reading.unit || "m",
      timestamp: reading.timestamp || reading.updatedAt,
    }));

  const flowmeterData = sensorData
    .filter(
      (item) =>
        item.type === "flowmeter_telemetry" || item.title === "Current Flow"
    )
    .map((reading) => [
      {
        title: "Totalizer",
        value: reading.totalFlow || reading.totalizer,
        unit: "L",
        timestamp: reading.timestamp || reading.updatedAt,
      },
      {
        title: "Today's Flow",
        value: reading.todaysFlow || reading.todays_flow,
        unit: "L",
        timestamp: reading.timestamp || reading.updatedAt,
      },
      {
        title: "Current Flow",
        value: reading.currentFlow || reading.value,
        unit: "L/min",
        timestamp: reading.timestamp || reading.updatedAt,
      },
    ])
    .flat();

  const historyColumns = [
    { key: "timestamp", title: "Timestamp" },
    { key: "parameter", title: "Parameter" },
    { key: "value", title: "Value" },
    { key: "unit", title: "Unit" },
    { key: "status", title: "Status" },
  ];

  // Example: Map history from sensorData (adjust as needed)
  const historyData = sensorData.map((reading) => ({
    timestamp: reading.timestamp || reading.updatedAt,
    parameter: reading.title || reading.type || "Reading",
    value: reading.value || reading.waterLevel || reading.currentFlow,
    unit: reading.unit || (reading.type === "piezometer_dwlr" ? "m" : "L/min"),
    status: reading.status || "Normal",
  }));

  // Table columns for summary
  const summaryColumns = [
    { key: "monitoringUnitId", title: "Monitoring Unit ID" },
    { key: "sensorId", title: "Sensor ID" },
    {
      key: "waterLevel",
      title: "Water Level",
      render: (v) => (v !== null ? v + " m" : "-"),
    },
    {
      key: "totalFlow",
      title: "Total Flow",
      render: (v) => (v !== null ? v + " L" : "-"),
    },
    {
      key: "currentFlow",
      title: "Current Flow",
      render: (v) => (v !== null ? v + " L/min" : "-"),
    },
    {
      key: "updatedAt",
      title: "Timestamp",
      render: (v) => (v ? new Date(v).toLocaleString() : "-"),
    },
  ];

  const handleRowClick = (row) => {
    navigate("/client/borewell/detail", { state: { sensorData: row } });
  };

  if (loading) {
    return <div className="p-6">Loading sensor data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

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
        <h2 className="text-xl font-semibold mb-4">Sensor Summary</h2>
        <Table
          columns={summaryColumns}
          data={sensorData}
          onRowClick={handleRowClick}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          DWLR (Digital Water Level Recorder)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dwlrData.length > 0 ? (
            dwlrData.map((reading, index) => (
              <Card
                key={index}
                title={reading.title}
                value={reading.value}
                unit={reading.unit}
                timestamp={reading.timestamp}
                className="bg-gray-50"
              />
            ))
          ) : (
            <div className="text-gray-500">No DWLR data available</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Flowmeter/Telemetry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flowmeterData.length > 0 ? (
            flowmeterData.map((reading, index) => (
              <Card
                key={index}
                title={reading.title}
                value={reading.value}
                unit={reading.unit}
                timestamp={reading.timestamp}
                className="bg-gray-50"
              />
            ))
          ) : (
            <div className="text-gray-500">No Flowmeter data available</div>
          )}
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
                value={sensorData[0]?.deviceId || "DWLR-001"}
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
                value={sensorData[0]?.location || "Main Borewell"}
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
                {sensorData[0]?.status || "Active"}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Maintenance
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={sensorData[0]?.lastMaintenance || "2024-03-01"}
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
