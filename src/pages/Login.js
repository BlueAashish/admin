import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import Logo from "../components/Logo";
import Button from "../components/Button";
import useApi from "../hooks/useApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const api = useApi();

  const handleSubmit =  async(e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    try {
        const res = await api.post("/auth/login", {
          email, password
        });
        console.log(res);
        
        // Assuming response: { token, role }
        if (res.token && res.user.role) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("role", res.user.role);
          if (res.user.role === "admin") {
            navigate("/admin/dashboard");
          } else if (res.user.role === "client") {
            navigate("/client/dashboard");
          } else {
            setError("Unknown user role");
          }
        } else {
          setError("Invalid response from server");
        }
    } catch (error) {
        setError(
          error?.response?.data?.message || error?.message || "Login failed"
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <AuthCard>
        <Logo />
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Sign in to your account
        </h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-blue-700 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-blue-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-6 relative">
            <label className="block mb-1 text-blue-700 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-blue-200 px-3 py-2 pr-16 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-blue-600 text-sm focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <Button type="submit" className="w-full" size="md">
            Login
          </Button>
        </form>
      </AuthCard>
    </div>
  );
};

export default Login;
