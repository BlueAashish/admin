import { z } from "zod";

export const borewellCustomerSchema = z.object({
  userId: z.string().min(1, "User selection is required"),
  sensorName: z.string().min(1, "Sensor name is required"),
  serialNo: z.string().min(1, "Serial number is required"),
  installationDate: z.string().min(1, "Installation date is required"),
  longitude: z.string().nullable().optional(),
  latitude: z.string().nullable().optional(),
  imeiNo: z.string().min(1, "IMEI number is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  modelNo: z.string().min(1, "Model number is required"),
  plan: z.string().min(1, "Plan selection is required"),
  companyAddress: z.string().min(1, "Company address is required"),
  // monitoringUnitId: z.string().min(1, "Monitoring unit ID is required"),
});
