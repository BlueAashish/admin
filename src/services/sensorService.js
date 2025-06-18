import useApi from "../hooks/useApi";

export const useSensorService = () => {
  const api = useApi();

  const getSensors = async () => {
    return await api.get("/sensors");
  };

  const getSensor = async (id) => {
    return await api.get(`/sensors/${id}`);
  };

  const createSensor = async (sensorData) => {
    return await api.post("/sensors", sensorData);
  };

  const updateSensor = async (id, sensorData) => {
    return await api.put(`/sensors/${id}`, sensorData);
  };

  const deleteSensor = async (id) => {
    return await api.delete(`/sensors/${id}`);
  };

  const getSensorOptions = async () => {
    const response = await getSensors();
    return response.data.map((sensor) => ({
      id: sensor._id,
      name: sensor.name,
      model: sensor.model,
      type: sensor.type,
    }));
  };

  return {
    getSensors,
    getSensor,
    createSensor,
    updateSensor,
    deleteSensor,
    getSensorOptions,
  };
};
