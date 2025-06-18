import useApi from "../hooks/useApi";

export const usePlanService = () => {
  const api = useApi();

  const getPlans = async () => {
    try {
      const response = await api.get("/plans");
      return response;
    } catch (error) {
      console.error("Error in getPlans:", error);
      throw error;
    }
  };

  const getPlan = async (id) => {
    try {
      const response = await api.get(`/plans/${id}`);
      return response;
    } catch (error) {
      console.error("Error in getPlan:", error);
      throw error;
    }
  };

  const createPlan = async (planData) => {
    try {
      const response = await api.post("/plans", planData);
      return response;
    } catch (error) {
      console.error("Error in createPlan:", error);
      throw error;
    }
  };

  const updatePlan = async (id, planData) => {
    try {
      const response = await api.put(`/plans/${id}`, planData);
      return response;
    } catch (error) {
      console.error("Error in updatePlan:", error);
      throw error;
    }
  };

  const deletePlan = async (id) => {
    try {
      const response = await api.delete(`/plans/${id}`);
      return response;
    } catch (error) {
      console.error("Error in deletePlan:", error);
      throw error;
    }
  };

  const getPlanOptions = async () => {
    try {
      const response = await getPlans();
      return response.data.map((plan) => ({
        id: plan._id,
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        features: plan.features,
      }));
    } catch (error) {
      console.error("Error in getPlanOptions:", error);
      throw error;
    }
  };

  return {
    getPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
    getPlanOptions,
  };
};
