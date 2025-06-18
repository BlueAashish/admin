import { newUserSchema } from "../schemas/userSchema";
import useApi from "../hooks/useApi";

export const useUserService = () => {
  const api = useApi();

  const createUser = async (userData) => {
    return api.post("/users", userData);
  };

  const getUsers = async (params) => {
    return api.get("/users", params);
  };

  const updateUser = async (userId, userData) => {
    return api.put(`/users/${userId}`, userData);
  };

  const deleteUser = async (userId) => {
    return api.delete(`users/${userId}`);
  };

  return {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
  };
};

export const useBorewellCustomerService = () => {
  const api = useApi();

  const createBorewellCustomer = async (customerData) => {
    return api.post("borewell", customerData);
  };

  const getBorewellCustomers = async (params) => {
    return api.get("/borewell", { params });
  };

  const updateBorewellCustomer = async (customerId, customerData) => {
    return api.put(`/borewell/${customerId}`, customerData);
  };

  const deleteBorewellCustomer = async (customerId) => {
    return api.delete(`/borewell/${customerId}`);
  };
  const getBorewellCustomerById = async (customerId) => {
    return api.get(`/borewell/${customerId}`);
  };

  return {
    createBorewellCustomer,
    getBorewellCustomers,
    updateBorewellCustomer,
    deleteBorewellCustomer,
    getBorewellCustomerById,
  };
};
