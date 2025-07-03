import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const fieldLabels = {
  monitoringUnitId: "Monitoring Unit ID",
  sensorId: "Sensor ID",
  userId: "User ID",
  waterLevel: "Water Level (m)",
  totalFlow: "Total Flow (L)",
  currentFlow: "Current Flow (L/min)",
  cod: "COD (mg/L)",
  bod: "BOD (mg/L)",
  ph: "pH",
  tds: "TDS (mg/L)",
  temperature: "Temperature (°C)",
  ec: "EC (µS/cm)",
  toc: "TOC (mg/L)",
  tss: "TSS (mg/L)",
  turbidity: "Turbidity (NTU)",
  chlorine: "Chlorine (mg/L)",
  dissolvedOxygen: "Dissolved Oxygen (mg/L)",
  orp: "ORP (mV)",
  sox: "SOx (ppm)",
  nox: "NOx (ppm)",
  pm25: "PM2.5 (µg/m³)",
  pm10: "PM10 (µg/m³)",
  readingTimestamp: "Reading Timestamp",
  createdAt: "Created At",
  updatedAt: "Updated At",
};

const waterFields = [
  "waterLevel",
  "totalFlow",
  "currentFlow",
  "cod",
  "bod",
  "ph",
  "tds",
  "temperature",
  "ec",
];
const airFields = ["pm25", "pm10", "sox", "nox"];
const additionalFields = [
  "toc",
  "tss",
  "turbidity",
  "chlorine",
  "dissolvedOxygen",
  "orp",
];
const idFields = [
  "monitoringUnitId",
  "sensorId",
  "userId",
  "readingTimestamp",
  "createdAt",
  "updatedAt",
];

function formatValue(key, value) {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  )
    return null;
  if (typeof value === "object") return null;
  if (
    key.toLowerCase().includes("date") ||
    key.toLowerCase().includes("timestamp")
  ) {
    return new Date(value).toLocaleString();
  }
  return value;
}

const Section = ({ title, fields, data, bg }) => {
  const items = fields
    .map((key) => ({ key, value: formatValue(key, data[key]) }))
    .filter((item) => item.value !== null);
  if (items.length === 0) return null;
  return (
    <div className={`${bg} p-4 rounded-lg mb-6`}>
      <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(({ key, value }) => (
          <div key={key} className="mb-2">
            <div className="text-sm text-gray-500 font-medium">
              {fieldLabels[key] || key}
            </div>
            <div className="text-lg text-gray-800 font-semibold break-all">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BorewellSensorDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sensorData = location.state?.sensorData;

  if (!sensorData) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">No sensor data found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Borewell Sensor Details
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Back
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <Section
          title="Identification"
          fields={idFields}
          data={sensorData}
          bg="bg-gray-50"
        />
        <Section
          title="Water Parameters"
          fields={waterFields}
          data={sensorData}
          bg="bg-blue-50"
        />
        <Section
          title="Air Quality Parameters"
          fields={airFields}
          data={sensorData}
          bg="bg-orange-50"
        />
        <Section
          title="Additional Parameters"
          fields={additionalFields}
          data={sensorData}
          bg="bg-purple-50"
        />
      </div>
    </div>
  );
};

export default BorewellSensorDetail;
