import React from "react";
import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";

// Assume you have an icon library or define SVGs here
// Example placeholder icons (replace with actual icons if using a library):
const icons = {
  customers:
    '<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292m0 5.292a4 4 0 110 5.292M1.937 8H3.28a7 7 0 0110.49 0H22.063m0 8H20.72a7 7 0 01-10.49 0H1.937" /></svg>',
  sensors:
    '<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.318-.68-9-1.745M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a2 2 0 100-4 2 2 0 000 4zm8-2a2 2 0 100-4 2 2 0 000 4zM4 10a2 2 0 100-4 2 2 0 000 4z" /></svg>',
  alerts:
    '<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>',
  revenue:
    '<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h.01M17 16l4-4m0 0l-4-4m4 4H7m4 2v-4" /></svg>',
  waterLevel:
    '<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  flowRate:
    '<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
  ph: '<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l2-2m0 0l2-2m-2 2l-2 2m2 2l2-2m7-10a2 2 0 11-4 0 2 2 0 014 0zM19 10v1.5a2.5 2.5 0 01-2.5 2.5h-1.5m-6 4h.01M7 16h.01" /></svg>',
  turbidity:
    '<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
};

const Dashboard = () => {
  const navigate = useNavigate();

  const kpiStats = [
    {
      title: "Total Customers",
      value: "150",
      color: "blue",
      icon: icons.customers,
    },
    {
      title: "Active Sensors",
      value: "45",
      color: "green",
      icon: icons.sensors,
    },
    { title: "Active Alerts", value: "3", color: "red", icon: icons.alerts },
    {
      title: "Total Revenue",
      value: "₹2.5M",
      color: "purple",
      icon: icons.revenue,
    },
  ];

  const sensorStats = [
    { title: "Total Sensors", value: "24", unit: "devices", color: "blue" },
    { title: "Active Sensors", value: "20", unit: "devices", color: "green" },
    { title: "Total Users", value: "15", unit: "users", color: "purple" },
    { title: "Active Alerts", value: "3", unit: "alerts", color: "red" },
  ];

  const recentReadings = [
    {
      title: "Water Level",
      value: "45.2",
      unit: "m",
      timestamp: "2024-03-15 14:30",
      icon: icons.waterLevel,
    },
    {
      title: "Current Flow",
      value: "120",
      unit: "L/min",
      timestamp: "2024-03-15 14:30",
      icon: icons.flowRate,
    },
    {
      title: "pH Level",
      value: "7.2",
      unit: "",
      timestamp: "2024-03-15 14:30",
      icon: icons.ph,
    },
    {
      title: "PM2.5",
      value: "12",
      unit: "µg/m³",
      timestamp: "2024-03-15 14:30",
      icon: icons.turbidity, // Using turbidity icon as a placeholder
    },
  ];

  const getTextColorClass = (color) => {
    switch (color) {
      case "blue":
        return "text-blue-600";
      case "green":
        return "text-green-600";
      case "purple":
        return "text-purple-600";
      case "red":
        return "text-red-600";
      default:
        return "text-gray-800";
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Active":
        return "text-green-800 bg-green-200";
      case "Warning":
        return "text-yellow-800 bg-yellow-200";
      case "Critical":
        return "text-red-800 bg-red-200";
      case "Info":
        return "text-blue-800 bg-blue-200";
      case "New":
        return "text-green-800 bg-green-200"; // Assuming 'New' is a positive status
      default:
        return "text-gray-700 bg-gray-200";
    }
  };

  return (
    <div className="p-10 bg-gradient-to-br from-blue-100 via-white to-purple-100 min-h-screen animate-fadeIn">
      <button
        onClick={() => navigate(-1)}
        className="mb-10 px-8 py-3 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-3 text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="text-5xl font-extrabold text-gray-900 mb-12 drop-shadow-sm">
        Dashboard Overview
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 animate-slideInFromTop">
        {kpiStats.map((stat, index) => (
          <Card
            key={index}
            className={`bg-white p-8 shadow-2xl rounded-2xl border-t-8 border-${stat.color}-500 transition-transform transform hover:scale-105 duration-300 relative overflow-hidden`}
          >
            {/* Subtle background element */}
            <div
              className={`absolute top-0 right-0 w-16 h-16 bg-${stat.color}-100 rounded-bl-full opacity-75`}
            ></div>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-lg font-semibold text-gray-700">
                {stat.title}
              </h3>
              {/* Render icon with larger size */}
              {stat.icon && (
                <div dangerouslySetInnerHTML={{ __html: stat.icon }}></div>
              )}
            </div>
            <p
              className={`text-5xl font-bold ${getTextColorClass(
                stat.color
              )} relative z-10`}
            >
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Recent Activities and Quick Stats - Using a Flex Container for better control */}
      <div className="flex flex-col lg:flex-row gap-10 mb-12">
        <Card className="bg-white p-8 shadow-2xl rounded-2xl lg:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Recent Activities
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">
                  New customer registered
                </p>
                <p className="text-sm text-gray-600 mt-1">2 hours ago</p>
              </div>
              <span
                className={`px-4 py-1 text-xs font-bold rounded-full ${getStatusColorClass(
                  "New"
                )}`}
              >
                New
              </span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">
                  Sensor alert triggered
                </p>
                <p className="text-sm text-gray-600 mt-1">5 hours ago</p>
              </div>
              <span
                className={`px-4 py-1 text-xs font-bold rounded-full ${getStatusColorClass(
                  "Alert"
                )}`}
              >
                Alert
              </span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">
                  System maintenance completed
                </p>
                <p className="text-sm text-gray-600 mt-1">1 day ago</p>
              </div>
              <span
                className={`px-4 py-1 text-xs font-bold rounded-full ${getStatusColorClass(
                  "Info"
                )}`}
              >
                Info
              </span>
            </div>
          </div>
        </Card>

        <Card className="bg-white p-8 shadow-2xl rounded-2xl lg:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Quick Stats
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer">
              <p className="text-gray-800 font-medium">Water Quality Index</p>
              <p className="font-bold text-green-600 text-lg">85%</p>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer">
              <p className="text-gray-800 font-medium">System Uptime</p>
              <p className="font-bold text-blue-600 text-lg">99.9%</p>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer">
              <p className="text-gray-800 font-medium">Data Accuracy</p>
              <p className="font-bold text-purple-600 text-lg">98%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Placeholder for Charts/Graphs */}
      <div className="mb-12">
        <Card className="bg-white p-8 shadow-2xl rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Data Visualizations
          </h3>
          <div className="text-gray-600 italic">
            {/* Placeholder for charts (e.g., line charts for sensor data trends, bar charts for comparisons) */}
            <p>
              Insert charts and graphs here to visually represent sensor data
              trends, comparisons, and key metrics over time.
            </p>
            <p className="mt-2">Visualizations could include:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Historical Water Level Trends</li>
              <li>Flow Rate Analysis</li>
              <li>pH and Turbidity Levels over time</li>
              <li>Sensor Status Distribution Chart</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Sensor Stats and Recent Readings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-slideInFromRight">
        <Card className="bg-white p-8 shadow-2xl rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Overall Sensor Stats
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sensorStats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 p-5 rounded-lg border border-gray-200 transition-transform transform hover:scale-105 duration-300 cursor-pointer"
              >
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p
                  className={`text-3xl font-bold ${getTextColorClass(
                    stat.color
                  )}`}
                >
                  {stat.value}
                  {stat.unit && (
                    <span className="text-base text-gray-500 ml-1">
                      {stat.unit}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white p-8 shadow-2xl rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Recent Sensor Readings
          </h3>
          <div className="space-y-6">
            {recentReadings.map((reading, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer"
              >
                <div className="flex items-center">
                  {/* Render icon if available */}
                  {reading.icon && (
                    <div
                      dangerouslySetInnerHTML={{ __html: reading.icon }}
                      className="mr-4 text-opacity-75"
                    ></div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{reading.title}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {reading.timestamp}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-blue-600 text-xl">
                  {reading.value}
                  {reading.unit && (
                    <span className="text-base text-gray-500 ml-1">
                      {reading.unit}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sensor Status Overview */}
      <div className="mt-10 animate-slideInFromBottom">
        <Card className="bg-white p-8 shadow-2xl rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Sensor Status Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 mb-4 text-lg">
                Borewell Sensors
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-800 pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer">
                  <span className="font-medium">DWLR-001</span>
                  <span
                    className={`px-4 py-1 text-xs font-bold rounded-full ${getStatusColorClass(
                      "Active"
                    )}`}
                  >
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-800 pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer">
                  <span className="font-medium">DWLR-002</span>
                  <span
                    className={`px-4 py-1 text-xs font-bold rounded-full ${getStatusColorClass(
                      "Warning"
                    )}`}
                  >
                    Warning
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 mb-4 text-lg">
                Water Analyzer
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-800 pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer">
                  <span className="font-medium">WA-001</span>
                  <span
                    className={`px-4 py-1 text-xs font-bold rounded-full ${getStatusColorClass(
                      "Active"
                    )}`}
                  >
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-800 pb-4 border-b border-gray-200 last:border-b-0 transition-colors duration-200 hover:bg-gray-50 rounded-md px-3 py-2 -mx-3 cursor-pointer">
                  <span className="font-medium">WA-002</span>
                  <span
                    className={`px-4 py-1 text-xs font-bold rounded-full ${getStatusColorClass(
                      "Critical"
                    )}`}
                  >
                    Critical
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Potential area for more detailed sensor data or tables */}
      <div className="mt-10">
        <Card className="bg-white p-8 shadow-2xl rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Detailed Sensor Data
          </h3>
          <div className="text-gray-600 italic">
            <p>
              This section could include sortable and filterable tables of raw
              sensor data or more detailed views of specific sensor types.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
