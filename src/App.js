import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import Dashboard from "./pages/admin/Dashboard";
import WaterAnalyzer from "./pages/admin/WaterAnalyzer";
import UserManagement from "./pages/admin/UserManagement";
import BorewellCustomers from "./pages/admin/BorewellCustomers";
import BorewellCustomerDetail from "./pages/admin/BorewellCustomerDetail";
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerBorewell from "./pages/customer/Borewell";
import CustomerAAQMS from "./pages/customer/AAQMS";
import SensorManagement from "./pages/admin/SensorManagement";
import Plans from "./pages/admin/Plans";
import SensorData from "./pages/admin/SensorData";
import SensorDataDetail from "./pages/admin/SensorDataDetail";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import BorewellSensorDetail from "./pages/customer/BorewellSensorDetail";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              token && localStorage.getItem("role") === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/client/dashboard" replace />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route element={<RequireAuth allowedRole="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="water-analyzer" element={<WaterAnalyzer />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="borewell" element={<BorewellCustomers />} />
              <Route path="borewell/:id" element={<BorewellCustomerDetail />} />
              <Route path="sensors" element={<SensorManagement />} />
              <Route path="sensor-data" element={<SensorData />} />
              <Route path="sensor-data/detail" element={<SensorDataDetail />} />
              <Route path="plans" element={<Plans />} />
              {/* Add more admin routes here */}
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRole="client" />}>
            <Route path="/client" element={<CustomerLayout />}>
              <Route index element={<Navigate to="/client/dashboard" replace />} />
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="borewell" element={<CustomerBorewell />} />
              <Route path="aaqms" element={<CustomerAAQMS />} />
              <Route path="borewell/detail" element={<BorewellSensorDetail />} />

            </Route>
          </Route>
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
