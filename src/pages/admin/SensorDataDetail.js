import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SensorDataDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sensorData = location.state?.sensorData;

  if (!sensorData) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">No sensor data found</p>
          <button
            onClick={() => navigate("/admin/sensor-data")}
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Back to Sensor Data
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Sensor Data Details</h1>
        <button
          onClick={() => navigate("/admin/sensor-data")}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Back to List
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {/* User Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">User Email</p>
                <p className="font-medium">
                  {sensorData.userId?.email || "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-medium">{sensorData.userId?._id || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Sensor Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Sensor Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Monitoring Unit ID</p>
                <p className="font-medium">{sensorData.monitoringUnitId}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Sensor ID</p>
                <p className="font-medium">{sensorData.sensorId}</p>
              </div>
            </div>
          </div>

          {/* Water Parameters */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Water Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Water Level</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.waterLevel} m
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Total Flow</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.totalFlow} L
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Current Flow</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.currentFlow} L/min
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">COD</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.cod} mg/L
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">BOD</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.bod} mg/L
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">pH</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.ph}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">TDS</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.tds} mg/L
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Temperature</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.temperature} °C
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">EC</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.ec} µS/cm
                </p>
              </div>
            </div>
          </div>

          {/* Air Quality Parameters */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Air Quality Parameters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-600">PM2.5</p>
                <p className="text-xl font-bold text-orange-700">
                  {sensorData.pm25} µg/m³
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-600">PM10</p>
                <p className="text-xl font-bold text-orange-700">
                  {sensorData.pm10} µg/m³
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-600">SOx</p>
                <p className="text-xl font-bold text-orange-700">
                  {sensorData.sox} ppm
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-600">NOx</p>
                <p className="text-xl font-bold text-orange-700">
                  {sensorData.nox} ppm
                </p>
              </div>
            </div>
          </div>

          {/* Additional Parameters */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Additional Parameters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600">TOC</p>
                <p className="text-xl font-bold text-purple-700">
                  {sensorData.toc} mg/L
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600">TSS</p>
                <p className="text-xl font-bold text-purple-700">
                  {sensorData.tss} mg/L
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600">Turbidity</p>
                <p className="text-xl font-bold text-purple-700">
                  {sensorData.turbidity} NTU
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600">Chlorine</p>
                <p className="text-xl font-bold text-purple-700">
                  {sensorData.chlorine} mg/L
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600">Dissolved Oxygen</p>
                <p className="text-xl font-bold text-purple-700">
                  {sensorData.dissolvedOxygen} mg/L
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600">ORP</p>
                <p className="text-xl font-bold text-purple-700">
                  {sensorData.orp} mV
                </p>
              </div>
            </div>
          </div>

          {/* Timestamp */}
          <div className="mt-8 pt-4 border-t">
            <p className="text-sm text-gray-600">Last Updated</p>
            <p className="font-medium">{formatDate(sensorData.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorDataDetail;
