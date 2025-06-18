import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import SensorForm from "../../forms/SensorForm";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useSensorService } from "../../services/sensorService";

const SensorManagement = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { getSensors, createSensor, updateSensor, deleteSensor } =
    useSensorService();

  const columns = [
    { key: "name", title: "Name" },
    { key: "model", title: "Model" },
    { key: "type", title: "Type" },
    { key: "status", title: "Status" },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSensors();
  }, []);

  const fetchSensors = async () => {
    try {
      const response = await getSensors();
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch sensors:", error);
    }
  };

  const handleNewSensor = async (sensorData) => {
    try {
      await createSensor(sensorData);
      await fetchSensors();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create sensor:", error);
    }
  };

  const handleEdit = (sensor) => {
    const sensorToEdit = {
      ...sensor,
      status: sensor._originalStatus || sensor.status, // Use original value if available, fallback to current statush/
    };
    setSelectedSensor(sensorToEdit);
    setIsEditing(true);
    setShowDetails(false);
  };

  const handleEditSuccess = async (sensorData) => {
    try {
      await updateSensor(selectedSensor._id, sensorData);
      await fetchSensors();
      setIsEditing(false);
      setSelectedSensor(null);
    } catch (error) {
      console.error("Failed to update sensor:", error);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setSelectedSensor(null);
  };

  const handleDeleteClick = (sensor) => {
    setSelectedSensor(sensor);
    setShowDeleteModal(true);
    setShowDetails(false);
  };

  const handleDelete = async () => {
    try {
      if (selectedSensor) {
        await deleteSensor(selectedSensor._id);
        await fetchSensors();
        setShowDeleteModal(false);
        setSelectedSensor(null);
      }
    } catch (error) {
      console.error("Failed to delete sensor:", error);
    }
  };

  const handleRowClick = (sensor) => {
    if (!isEditing && !showDeleteModal) {
      setSelectedSensor(sensor);
      setShowDetails(true);
    }
  };

  const actions = (row) => (
    <div className="flex space-x-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleEdit(row);
        }}
        className="text-blue-500 hover:underline"
      >
        Edit
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDeleteClick(row);
        }}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  );

  const filteredData = data.filter((sensor) => {
    const matchesSearch =
      searchTerm === "" ||
      sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sensor.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || sensor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const tableData = filteredData.map((sensor) => ({
    ...sensor,
    _originalStatus: sensor.status, // Store original status value
    status: (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          sensor.status === "active"
            ? "bg-green-100 text-green-800"
            : sensor.status === "maintenance"
            ? "bg-yellow-100 text-yellow-800"
            : sensor.status === "calibration"
            ? "bg-blue-100 text-blue-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}
      </span>
    ),
    actions: actions(sensor),
  }));

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-blue-100 min-h-screen">
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
        <h1 className="text-3xl font-bold text-gray-800">Sensor Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="flex flex-wrap space-x-4">
              <input
                type="text"
                placeholder="Search sensors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
                <option value="calibration">Calibration</option>
              </select>
            </div>
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Hide Form" : "Add New Sensor"}
            </button>
          </div>

          {showForm && (
            <div className="mb-8">
              <SensorForm
                onSubmit={handleNewSensor}
                onCancel={() => setShowForm(false)}
                mode="add"
              />
            </div>
          )}

          {isEditing && (
            <div className="mb-8">
              <SensorForm
                sensor={selectedSensor}
                onSubmit={handleEditSuccess}
                onCancel={handleEditCancel}
                mode="edit"
              />
            </div>
          )}

          <Table
            columns={columns}
            data={tableData}
            actions={actions}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedSensor(null);
        }}
        onConfirm={handleDelete}
        title="Delete Sensor"
        message={`Are you sure you want to delete ${selectedSensor?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default SensorManagement;
