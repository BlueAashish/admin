import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/borewell", label: "Assigned Sensors" },
  { to: "/admin/users", label: "User Management" },
  { to: "/admin/sensors", label: "Sensor Management" },
  { to: "/admin/sensor-data", label: "Sensor Data" },
  { to: "/admin/plans", label: "Subscription Plans" },
];

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar links={adminLinks} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title="Admin Panel">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Admin User</span>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Logout
            </button>
          </div>
        </Navbar>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
