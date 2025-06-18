import { z } from "zod";

export const sensorSchema = z.object({
  name: z.string().min(1, "Sensor name is required"),
  model: z.string().min(1, "Model is required"),
  type: z.string().min(1, "Type is required"),
  status: z.string().min(1, "Status is required"),
});

export const SENSOR_TYPES = [
  { value: "water_level", label: "Water Level" },
  { value: "water_quality", label: "Water Quality" },
  { value: "flow_rate", label: "Flow Rate" },
  { value: "pressure", label: "Pressure" },
  { value: "temperature", label: "Temperature" },
  { value: "multi_parameter", label: "Multi-Parameter" },
];

export const SENSOR_STATUS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "maintenance", label: "Maintenance" },
  { value: "calibration", label: "Calibration" },
];
