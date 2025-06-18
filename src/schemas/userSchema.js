import { z } from "zod";

export const newUserSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  companyName: z.string().min(1, "Company Name is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  pincode: z
    .string()
    .min(5, "Pincode must be at least 5 digits")
    .regex(/^\d+$/, "Pincode must contain only digits"),
  state: z.string().min(1, "State is required"),
  address: z.string().min(1, "Address is required"),
  userFlowLimit: z.union([z.string(), z.number()]).refine(
    (val) => {
      const num = typeof val === "number" ? val : Number(val);
      return !isNaN(num) && num >= 0;
    },
    {
      message: "Flow limit cannot be negative",
    }
  ),
});
