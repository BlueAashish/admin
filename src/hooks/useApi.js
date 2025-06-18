import { useState, useCallback } from "react";
import axios from "axios";
import API_CONFIG from "../config/api";

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Create axios instance with default config
  const api = axios.create(API_CONFIG);

  // Add request interceptor for authentication
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem("token");
        // window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  const execute = useCallback(
    async ({
      endpoint,
      method = "GET",
      body = null,
      params = null,
      onSuccess = null,
      onError = null,
    }) => {
      try {
        setLoading(true);
        setError(null);
        setStatus(null);

        const config = {
          method,
          url: endpoint,
          params,
          ...(body !== null && { data: body }),
        };

        const response = await api(config);
        setData(response.data);
        setStatus(response.status);

        if (onSuccess) {
          onSuccess(response.data);
        }

        return response.data;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "An error occurred";
        setError(errorMessage);
        setStatus(err.response?.status);

        if (onError) {
          onError(err);
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  // Convenience methods for common HTTP methods
  const get = useCallback(
    (endpoint, params = null, onSuccess = null, onError = null) => {
      return execute({ endpoint, method: "GET", params, onSuccess, onError });
    },
    [execute]
  );

  const post = useCallback(
    (endpoint, body = null, onSuccess = null, onError = null) => {
      return execute({ endpoint, method: "POST", body, onSuccess, onError });
    },
    [execute]
  );

  const put = useCallback(
    (endpoint, body = null, onSuccess = null, onError = null) => {
      return execute({ endpoint, method: "PUT", body, onSuccess, onError });
    },
    [execute]
  );

  const patch = useCallback(
    (endpoint, body = null, onSuccess = null, onError = null) => {
      return execute({ endpoint, method: "PATCH", body, onSuccess, onError });
    },
    [execute]
  );

  const del = useCallback(
    (endpoint, onSuccess = null, onError = null) => {
      return execute({ endpoint, method: "DELETE", onSuccess, onError });
    },
    [execute]
  );

  // Reset all states
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setStatus(null);
  }, []);

  return {
    data,
    error,
    loading,
    status,
    execute,
    get,
    post,
    put,
    patch,
    delete: del,
    reset,
  };
};

export default useApi;
