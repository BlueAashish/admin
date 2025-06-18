import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { useSensorReadingService } from "../../services/sensorReadingService";

const SensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getSensorReadings } = useSensorReadingService();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSensorReadings();
  }, []);

  const fetchSensorReadings = async () => {
    try {
      setLoading(true);
      const response = await getSensorReadings("MU004");
      setSensorData(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch sensor readings:", err);
      setError("Failed to fetch sensor readings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleRowClick = (row) => {
    navigate("/admin/sensor-data/detail", { state: { sensorData: row } });
  };

  const columns = [
    {
      key: "userId",
      title: "User Email",
      render: (userId) => userId?.email || "N/A",
    },
    {
      key: "monitoringUnitId",
      title: "Monitoring Unit",
    },
    {
      key: "currentFlow",
      title: "Current Flow",
      render: (value) => `${value} L/min`,
    },
    {
      key: "status",
      title: "Status",
      render: () => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      ),
    },
    {
      key: "updatedAt",
      title: "Last Updated",
      render: (date) => formatDate(date),
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Sensor Data</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Sensor Data</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchSensorReadings}
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Sensor Data</h1>
        <button
          onClick={fetchSensorReadings}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          Refresh
        </button>
      </div>

      {/* Sensors Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <Table
            columns={columns}
            data={sensorData}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SensorData;
