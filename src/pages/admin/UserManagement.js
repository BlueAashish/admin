import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import NewUserForm from "../../forms/NewUserForm";
import EditUserForm from "../../forms/EditUserForm";
import UserDetailsPanel from "../../components/UserDetailsPanel";
import { useUserService } from "../../services/userService";
import ConfirmationModal from "../../components/ConfirmationModal";

const UserManagement = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { getUsers, deleteUser } = useUserService();

  const columns = [
    { key: "firstName", title: "Name" },
    { key: "email", title: "Email" },
    { key: "phone", title: "Phone" },
    { key: "role", title: "Role" },
    { key: "status", title: "Status" },
  ];

  const [data, setData] = useState();
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const response = await getUsers(data);
    console.log(response.data);
    setData(response.data);
  };

  const handleNewUser = (userData) => {
    console.log("New user data:", userData);
    setShowForm(false);
    fetchUsers();
  };

  const handleRowClick = (row) => {
    if (!isEditing && !showDeleteModal) {
      setSelectedUser(row);
      setShowDetails(true);
    }
  };

  const actions = (row) => (
    <div className="flex space-x-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSelectedUser(row);
          setIsEditing(true);
          setShowDetails(false);
        }}
        className="text-blue-500 hover:underline"
      >
        Edit
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSelectedUser(row);
          setShowDeleteModal(true);
          setShowDetails(false);
        }}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  );

  const handleEditSuccess = () => {
    setIsEditing(false);
    setSelectedUser(null);
    setShowDetails(false);
    fetchUsers();
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setSelectedUser(null);
    setShowDetails(false);
  };

  const handleDelete = async () => {
    try {
      if (selectedUser) {
        await deleteUser(selectedUser._id);
        await fetchUsers();
        setShowDeleteModal(false);
        setSelectedUser(null);
        setShowDetails(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
      </div>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="flex flex-wrap space-x-4">
              <input
                type="text"
                placeholder="Search users..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Hide Form" : "Add New User"}
            </button>
          </div>

          {showForm && <NewUserForm onSubmit={handleNewUser} />}
          {isEditing && (
            <EditUserForm
              user={selectedUser}
              onSuccess={handleEditSuccess}
              onCancel={handleEditCancel}
            />
          )}

          <Table
            columns={columns}
            data={data}
            actions={actions}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
          setShowDetails(false);
        }}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
      />

      {showDetails && (
        <UserDetailsPanel
          user={selectedUser}
          onClose={() => {
            setShowDetails(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
