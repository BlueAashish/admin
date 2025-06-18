import useApi from "../hooks/useApi";

export const useSensorReadingService = () => {
  const api = useApi();

  const getSensorReadings = async (monitoringUnitId) => {
    return await api.get(
      `/sensor-readings?monitoringUnitId=${monitoringUnitId}`
    );
  };

  return {
    getSensorReadings,
  };
};
