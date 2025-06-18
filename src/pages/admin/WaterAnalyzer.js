import React from "react";
import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";

const WaterAnalyzer = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gradient-to-br from-teal-50 to-cyan-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-6 py-3 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
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

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Water Analyzer Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-xl rounded-xl">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4 border-gray-200">
              Water Quality Parameters
            </h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-gray-700">pH Level</p>
                <p className="font-bold text-green-600 text-lg">7.2</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Turbidity</p>
                <p className="font-bold text-yellow-600 text-lg">2.5 NTU</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Dissolved Oxygen</p>
                <p className="font-bold text-blue-600 text-lg">6.8 mg/L</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Temperature</p>
                <p className="font-bold text-purple-600 text-lg">25°C</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="shadow-xl rounded-xl">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4 border-gray-200">
              Chemical Analysis
            </h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Chlorine</p>
                <p className="font-bold text-green-600 text-lg">0.5 mg/L</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Total Hardness</p>
                <p className="font-bold text-yellow-600 text-lg">150 mg/L</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Alkalinity</p>
                <p className="font-bold text-blue-600 text-lg">120 mg/L</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">TDS</p>
                <p className="font-bold text-purple-600 text-lg">300 mg/L</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="shadow-xl rounded-xl">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4 border-gray-200">
              Quality Status
            </h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Overall Quality</p>
                <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full">
                  Good
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Compliance Status</p>
                <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-200 rounded-full">
                  Compliant
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Last Updated</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Next Analysis</p>
                <p className="text-sm text-gray-600">In 4 hours</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Placeholder for Data Visualization */}
        <Card className="shadow-xl rounded-xl md:col-span-2 lg:col-span-3">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4 border-gray-200">
              Data Trends and Visualizations
            </h3>
            <div className="text-gray-600 italic">
              <p>
                Charts and graphs showing historical water quality data, trends,
                and comparisons.
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 text-sm">
                <li>Historical pH, Turbidity, DO, and Temperature trends</li>
                <li>Comparison of chemical parameters over time</li>
                <li>Compliance status history</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WaterAnalyzer;
