import React from "react";
import Table from "../../components/Table";

const UserManagement = () => {
  const columns = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "role", title: "Role" },
    { key: "status", title: "Status" },
  ];

  const data = [
    {
      name: "Customer User 1",
      email: "user1@customer.com",
      role: "Standard User",
      status: "Active",
    },
    {
      name: "Customer User 2",
      email: "user2@customer.com",
      role: "Viewer",
      status: "Active",
    },
    {
      name: "Customer User 3",
      email: "user3@customer.com",
      role: "Standard User",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">
        Associated Users
      </h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default UserManagement;
