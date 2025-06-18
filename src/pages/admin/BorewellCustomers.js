import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import BorewellCustomerForm from "../../forms/BorewellCustomerForm";
import { useBorewellCustomerService } from "../../services/userService";
import { useSensorService } from "../../services/sensorService";
import ConfirmationModal from "../../components/ConfirmationModal";

const BorewellCustomers = () => {
  const navigate = useNavigate();
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [sensorOptions, setSensorOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { getBorewellCustomers, deleteBorewellCustomer } =
    useBorewellCustomerService();
  const { getSensorOptions } = useSensorService();

  const columns = [
    { key: "userId.firstName", title: "Customer Name" },
    { key: "userId.companyName", title: "Company Name" },
    { key: "userId.email", title: "Email" },
    { key: "userId.phone", title: "Phone" },
    { key: "sensorName.name", title: "Sensor Name" },
    { key: "serialNo", title: "Serial No" },
    { key: "monitoringUnitId", title: "Monitoring Unit ID" },
    { key: "modelNo", title: "Model No" },
    { key: "userId.status", title: "Status" },
  ];

  useEffect(() => {
    fetchCustomers();
    fetchSensorOptions();
  }, []);

  const fetchSensorOptions = async () => {
    try {
      const options = await getSensorOptions();
      setSensorOptions(options);
    } catch (error) {
      console.error("Failed to fetch sensor options:", error);
    }
  };

  const actions = (row) => (
    <div className="flex space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(row);
        }}
        className="text-blue-500 hover:underline"
      >
        Edit
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteClick(row);
        }}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  );

  const handleEdit = (row) => {
    // Create a copy of the row with original values
    const customerToEdit = {
      ...row,
      serialNo: row._originalSerialNo, // Use original value instead of badge
    };

    setSelectedUser(customerToEdit);
    setIsEditing(true);
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    setSelectedUser(null);
    fetchCustomers();
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleDeleteClick = (row) => {
    setSelectedUser(row);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteBorewellCustomer(selectedUser._id);
      setShowDeleteModal(false);
      setSelectedUser(null);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await getBorewellCustomers();
      console.log(response);
      setCustomers(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch customers. Please try again later.");
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = (status) => (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === "Active"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {status}
    </span>
  );

  const renderSerialNo = (serialNo) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      {serialNo}
    </span>
  );

  const filteredCustomers = customers.filter((customer) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      customer.userId?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.userId?.companyName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === "" || customer.userId?.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const data = filteredCustomers.map((customer) => ({
    ...customer,
    "userId.firstName": `${customer.userId?.firstName} ${customer.userId?.lastName}`,
    "userId.companyName": customer.userId?.companyName,
    "userId.email": customer.userId?.email,
    "userId.phone": customer.userId?.phone,
    "userId.status": renderStatus(customer.userId?.status),
    "sensorName.name": customer.sensorName?.name,
    serialNo: renderSerialNo(customer.serialNo),
    _originalSerialNo: customer.serialNo, // Store original value
    actions: actions(customer),
  }));

  const handleRowClick = (customer) => {
    navigate(`/admin/borewell/${customer._id}`);
  };

  const handleAddNewCustomer = async (formData) => {
    try {
      await fetchCustomers(); // Refresh the list after adding
      setShowNewCustomerForm(false);
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading customers...</p>
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
            onClick={fetchCustomers}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold text-gray-800">Borewell Customers</h1>
      </div>

      <div className="space-y-6">
        {/* Form Section */}
        {showNewCustomerForm && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Add New Customer
                </h2>
                <button
                  onClick={() => setShowNewCustomerForm(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <BorewellCustomerForm
                onSubmit={handleAddNewCustomer}
                onCancel={() => setShowNewCustomerForm(false)}
                sensorOptions={sensorOptions}
                mode="add"
              />
            </div>
          </div>
        )}

        {isEditing && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit Customer
                </h2>
                <button
                  onClick={handleEditCancel}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <BorewellCustomerForm
                customer={selectedUser}
                onSubmit={handleEditSuccess}
                onCancel={handleEditCancel}
                sensorOptions={sensorOptions}
                mode="edit"
              />
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <button
                onClick={() => setShowNewCustomerForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                Add New Customer
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <Table
                    columns={columns}
                    data={data}
                    actions={actions}
                    onRowClick={handleRowClick}
                    className="min-w-full divide-y divide-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
      />
    </div>
  );
};

export default BorewellCustomers;
