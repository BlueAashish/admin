import { z } from "zod";

export const sensorSchema = z.object({
  name: z.string().min(1, "Sensor name is required"),
  model: z.string().min(1, "Model is required"),
  type: z.string().min(1, "Type is required"),
  status: z.string().min(1, "Status is required"),
});

export const SENSOR_TYPES = [
  { value: "flowmeter_telemetry", label: "Flowmeter with Telemetry" },
  { value: "piezometer_dwlr", label: "Piezometer with DWLR" },
  { value: "water_analyzer", label: "Water Analyzer" },
  { value: "aaqms", label: "AAQMS" },
];

export const SENSOR_STATUS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "maintenance", label: "Maintenance" },
  { value: "calibration", label: "Calibration" },
];
