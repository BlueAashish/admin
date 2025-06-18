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

  // Parse reading history
  const readingHistory =
    sensorData.readingHistory
      ?.map((reading) => {
        try {
          return JSON.parse(reading);
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean) || [];

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

          {/* Current Readings */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Current Readings</h2>
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
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">TOC</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.toc} mg/L
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">TSS</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.tss} mg/L
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Turbidity</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.turbidity} NTU
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Chlorine</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.chlorine} mg/L
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Dissolved Oxygen</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.dissolvedOxygen} mg/L
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">ORP</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.orp} mV
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">SOx</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.sox} ppm
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">NOx</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.nox} ppm
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">PM2.5</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.pm25} µg/m³
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">PM10</p>
                <p className="text-xl font-bold text-blue-700">
                  {sensorData.pm10} µg/m³
                </p>
              </div>
            </div>
          </div>

          {/* Daily Flow Data */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Daily Flow Data</h2>
            <div className="space-y-4">
              {sensorData.dailyFlowData?.map((day, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">{formatDate(day.date)}</p>
                    <p className="text-sm text-gray-600">
                      Total Flow: {day.totalFlow} L
                    </p>
                  </div>
                  {day.readings.length > 0 ? (
                    <div className="space-y-2">
                      {day.readings.map((reading, rIndex) => (
                        <div
                          key={rIndex}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-600">
                            {formatDate(reading.timestamp)}
                          </span>
                          <span className="font-medium">
                            {reading.flow} L/min
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No readings for this day
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reading History */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Reading History</h2>
            <div className="space-y-4">
              {readingHistory.map((reading, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">
                      {formatDate(reading.readingTimestamp)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Flow: {reading.currentFlow} L/min
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Total Flow:</span>
                      <span className="ml-2 font-medium">
                        {reading.totalFlow} L
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Water Level:</span>
                      <span className="ml-2 font-medium">
                        {reading.waterLevel} m
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">COD:</span>
                      <span className="ml-2 font-medium">
                        {reading.cod} mg/L
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">BOD:</span>
                      <span className="ml-2 font-medium">
                        {reading.bod} mg/L
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">pH:</span>
                      <span className="ml-2 font-medium">{reading.ph}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">TDS:</span>
                      <span className="ml-2 font-medium">
                        {reading.tds} mg/L
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Temperature:</span>
                      <span className="ml-2 font-medium">
                        {reading.temperature} °C
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">EC:</span>
                      <span className="ml-2 font-medium">
                        {reading.ec} µS/cm
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">TOC:</span>
                      <span className="ml-2 font-medium">
                        {reading.toc} mg/L
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">TSS:</span>
                      <span className="ml-2 font-medium">
                        {reading.tss} mg/L
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Turbidity:</span>
                      <span className="ml-2 font-medium">
                        {reading.turbidity} NTU
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Chlorine:</span>
                      <span className="ml-2 font-medium">
                        {reading.chlorine} mg/L
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Dissolved Oxygen:</span>
                      <span className="ml-2 font-medium">
                        {reading.dissolvedOxygen} mg/L
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">ORP:</span>
                      <span className="ml-2 font-medium">{reading.orp} mV</span>
                    </div>
                    <div>
                      <span className="text-gray-600">SOx:</span>
                      <span className="ml-2 font-medium">
                        {reading.sox} ppm
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">NOx:</span>
                      <span className="ml-2 font-medium">
                        {reading.nox} ppm
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">PM2.5:</span>
                      <span className="ml-2 font-medium">
                        {reading.pm25} µg/m³
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">PM10:</span>
                      <span className="ml-2 font-medium">
                        {reading.pm10} µg/m³
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timestamps */}
          <div className="mt-8 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Created At</p>
                <p className="font-medium">
                  {formatDate(sensorData.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium">
                  {formatDate(sensorData.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorDataDetail;
