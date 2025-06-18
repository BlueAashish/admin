import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBorewellCustomerService } from "../../services/userService";
import { Card } from "../../components/Card";

const BorewellCustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBorewell, setSelectedBorewell] = useState(null);
  const { getBorewellCustomerById } = useBorewellCustomerService();

  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      setLoading(true);
      const response = await getBorewellCustomerById(id);
      setCustomer(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch customer details. Please try again later.");
      console.error("Error fetching customer details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-800 font-medium">{error}</p>
          <button
            onClick={fetchCustomerDetails}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-800 font-medium">Customer not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const renderMetricCard = (
    title,
    value,
    unit = "",
    icon = null,
    trend = null
  ) => (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {value}
            {unit && (
              <span className="text-base text-gray-500 ml-1">{unit}</span>
            )}
          </p>
          {trend && (
            <div
              className={`flex items-center mt-2 text-sm font-medium ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="mr-1">{trend > 0 ? "↑" : "↓"}</span>
              <span>{Math.abs(trend)}% from last reading</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-blue-100 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );

  const renderQualityIndicator = (quality) => {
    const colors = {
      Good: "bg-green-200 text-green-800",
      Fair: "bg-yellow-200 text-yellow-800",
      Poor: "bg-red-200 text-red-800",
    };
    return (
      <span
        className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold ${colors[quality]}`}
      >
        {quality}
      </span>
    );
  };

  const renderBorewellCard = (borewell) => {
    const isSelected = selectedBorewell === borewell.id;

    return (
      <div
        className={`bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-200 ${
          isSelected ? "ring-2 ring-blue-500" : "hover:shadow-2xl"
        }`}
      >
        <div
          className="p-6 cursor-pointer flex justify-between items-start"
          onClick={() => setSelectedBorewell(isSelected ? null : borewell.id)}
        >
          {/* Basic Information (Always Visible) */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Borewell {borewell.id}
            </h3>
            <p className="text-gray-700 mt-2 flex items-center text-lg">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {borewell.location}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <span
              className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold ${
                borewell.status === "Active"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {borewell.status}
            </span>
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-600">Installed</p>
              <p className="font-semibold text-gray-800">
                {borewell.installationDate}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-600">Last Reading</p>
              <p className="font-semibold text-gray-800">
                {borewell.lastReading.date}
              </p>
            </div>
            <svg
              className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 ${
                isSelected ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Expanded Details (Visible when selected) */}
        {isSelected && (
          <div className="p-6 border-t border-gray-200">
            <div className="space-y-8">
              {/* Latest Readings */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 flex items-center mb-5">
                  <svg
                    className="w-6 h-6 mr-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Latest Readings
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {renderMetricCard(
                    "Water Level",
                    borewell.lastReading.waterLevel,
                    "",
                    null,
                    -0.7
                  )}
                  {renderMetricCard(
                    "Flow Rate",
                    borewell.lastReading.flowRate,
                    "",
                    null,
                    4.2
                  )}
                  {renderMetricCard(
                    "pH Level",
                    borewell.lastReading.ph,
                    "",
                    null,
                    1.4
                  )}
                  {renderMetricCard(
                    "Turbidity",
                    borewell.lastReading.turbidity,
                    "",
                    null,
                    -5.0
                  )}
                </div>
              </div>

              {/* Reading History */}
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-blue-600"
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
                    Reading History
                  </h4>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    <span>View All Readings</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  {borewell.readings.map((reading, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {reading.date}
                        </p>
                        <div className="flex items-center mt-1 space-x-4">
                          <p className="text-sm text-gray-700">
                            Water Level: {reading.waterLevel}
                          </p>
                          <p className="text-sm text-gray-700">
                            Flow Rate: {reading.flowRate}
                          </p>
                          <p className="text-sm text-gray-700">
                            pH: {reading.ph}
                          </p>
                          <p className="text-sm text-gray-700">
                            Turbidity: {reading.turbidity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {renderQualityIndicator(reading.quality)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Placeholder for Data Visualization */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 flex items-center mb-5">
                  <svg
                    className="w-6 h-6 mr-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Borewell Specific Data Visualizations
                </h4>
                <div className="text-gray-600 italic p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p>
                    Insert charts and graphs here to visually represent this
                    borewell's data trends.
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 text-sm">
                    <li>Historical Water Level Trends for this Borewell</li>
                    <li>Flow Rate Analysis for this Borewell</li>
                    <li>
                      Water Quality Parameter Trends (pH, Turbidity, etc.) for
                      this Borewell
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
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

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customer Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">
                  {customer.userId?.firstName} {customer.userId?.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Company</p>
                <p className="font-medium">{customer.userId?.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{customer.userId?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{customer.userId?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    customer.userId?.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {customer.userId?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Sensor Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
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
              Sensor Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Sensor Name</p>
                <p className="font-medium">{customer.sensorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Serial No</p>
                <p className="font-medium">{customer.serialNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Model No</p>
                <p className="font-medium">{customer.modelNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">IMEI No</p>
                <p className="font-medium">{customer.imeiNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mobile Number</p>
                <p className="font-medium">{customer.mobileNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Plan</p>
                <p className="font-medium">{customer.plan}</p>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Location Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Longitude</p>
                <p className="font-medium">{customer.longitude}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Latitude</p>
                <p className="font-medium">{customer.latitude}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Company Address</p>
                <p className="font-medium">{customer.companyAddress}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Installation Date</p>
                <p className="font-medium">
                  {new Date(customer.installationDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monitoring Unit ID</p>
                <p className="font-medium">{customer.monitoringUnitId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created At</p>
                <p className="font-medium">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Updated At</p>
                <p className="font-medium">
                  {new Date(customer.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borewells Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <svg
            className="w-6 h-6 mr-3 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Borewells
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {customer?.borewells?.map((borewell) => (
            <div key={borewell.id}>{renderBorewellCard(borewell)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorewellCustomerDetail;
