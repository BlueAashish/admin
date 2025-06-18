import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newUserSchema } from "../schemas/userSchema";
import Input from "../components/Input";
import Button from "../components/Button";
import { useUserService } from "../services/userService";

const NewUserForm = ({ onSubmit }) => {
  const { createUser } = useUserService();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      companyName: "",
      email: "",
      city: "",
      pincode: "",
      state: "",
      address: "",
      userFlowLimit: 0,
    },
  });

  const onSubmitForm = async (data) => {
    try {
      const response = await createUser(data);
      console.log("User created successfully:", response);
      reset();
      if (response.success) {
        onSubmit(response);
      }
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New User</h2>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          label="First Name"
          type="text"
          error={errors.firstName}
          {...register("firstName")}
        />
        <Input
          label="Last Name"
          type="text"
          error={errors.lastName}
          {...register("lastName")}
        />
        <Input
          label="Phone Number"
          type="tel"
          error={errors.phone}
          {...register("phone")}
        />
        <Input
          label="Company Name"
          type="text"
          error={errors.companyName}
          {...register("companyName")}
        />
        <Input
          label="Email"
          type="email"
          error={errors.email}
          {...register("email")}
        />
        <Input
          label="City"
          type="text"
          error={errors.city}
          {...register("city")}
        />
        <Input
          label="Pincode"
          type="text"
          error={errors.pincode}
          {...register("pincode")}
        />
        <Input
          label="State"
          type="text"
          error={errors.state}
          {...register("state")}
        />
        <Input
          label="Address"
          type="text"
          error={errors.address}
          {...register("address")}
        />
        <Input
          label="User Flow Limit"
          type="number"
          error={errors.userFlowLimit}
          {...register("userFlowLimit")}
        />
        <div className="md:col-span-2 flex justify-end">
          <Button
            type="submit"
            variant="success"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Create User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
