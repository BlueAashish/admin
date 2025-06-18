import React from "react";
import Card from "../../components/Card";

const Dashboard = () => {
  const assignedSensors = [
    {
      title: "Assigned Sensors",
      value: "8",
      unit: "devices",
      icon: (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
    {
      title: "Active Sensors",
      value: "7",
      unit: "devices",
      icon: (
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Critical Alerts",
      value: "1",
      unit: "alerts",
      icon: (
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    {
      title: "Last Update",
      value: "2",
      unit: "mins ago",
      icon: (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const recentReadings = [
    {
      title: "Water Level",
      value: "45.2",
      unit: "m",
      timestamp: "2024-03-15 14:30",
      trend: "+0.3",
      icon: (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      title: "Current Flow",
      value: "120",
      unit: "L/min",
      timestamp: "2024-03-15 14:30",
      trend: "-5",
      icon: (
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "pH Level",
      value: "7.2",
      unit: "",
      timestamp: "2024-03-15 14:30",
      trend: "0",
      icon: (
        <svg
          className="w-6 h-6 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "PM2.5",
      value: "12",
      unit: "µg/m³",
      timestamp: "2024-03-15 14:30",
      trend: "-2",
      icon: (
        <svg
          className="w-6 h-6 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
    },
  ];

  const sensorStatus = [
    {
      type: "Borewell Sensors",
      sensors: [
        {
          id: "DWLR-001",
          status: "Active",
          lastReading: "45.2m",
          lastUpdate: "2 mins ago",
        },
        {
          id: "DWLR-002",
          status: "Active",
          lastReading: "42.8m",
          lastUpdate: "5 mins ago",
        },
      ],
    },
    {
      type: "Water Analyzer",
      sensors: [
        {
          id: "WA-001",
          status: "Critical",
          lastReading: "pH: 6.8",
          lastUpdate: "1 min ago",
        },
        {
          id: "WA-002",
          status: "Active",
          lastReading: "pH: 7.2",
          lastUpdate: "3 mins ago",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assignedSensors.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {stat.unit}
                  </span>
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Readings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Recent Sensor Readings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentReadings.map((reading, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {reading.icon}
                </div>
                <span
                  className={`text-sm font-medium ${
                    reading.trend.startsWith("+")
                      ? "text-green-600"
                      : reading.trend.startsWith("-")
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {reading.trend}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">
                {reading.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {reading.value}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {reading.unit}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-2">{reading.timestamp}</p>
            </div>
          ))}
        </div> */}
        <h1>graphs according to sensors</h1>
      </div>

      {/* Sensor Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Sensor Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sensorStatus.map((group, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-medium text-gray-700">{group.type}</h3>
              <div className="space-y-3">
                {group.sensors.map((sensor, sensorIndex) => (
                  <div key={sensorIndex} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{sensor.id}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {sensor.lastReading}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            sensor.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {sensor.status}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          {sensor.lastUpdate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
