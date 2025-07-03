import useApi from "../hooks/useApi";

export const useUserSensorReadingService = () => {
  const api = useApi();

  const getUserSensorReadings = async () => {
    return await api.get(
      `sensor-readings/user/all`
    );
  };

  return {
    getUserSensorReadings,
  };
};