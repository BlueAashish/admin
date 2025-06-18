import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newUserSchema } from "../schemas/userSchema";
import Input from "../components/Input";
import Button from "../components/Button";
import { useUserService } from "../services/userService";

const EditUserForm = ({ user, onSuccess, onCancel }) => {
  const { updateUser } = useUserService();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      companyName: user?.companyName || "",
      email: user?.email || "",
      city: user?.city || "",
      pincode: user?.pincode || "",
      state: user?.state || "",
      address: user?.address || "",
      userFlowLimit: user?.userFlowLimit || 0,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        companyName: user.companyName || "",
        email: user.email || "",
        city: user.city || "",
        pincode: user.pincode || "",
        state: user.state || "",
        address: user.address || "",
        userFlowLimit: user.userFlowLimit || 0,
      });
    }
  }, [user, reset]);

  const onSubmitForm = async (data) => {
    if (!user?._id) {
      console.error("No user ID found");
      return;
    }

    try {
      const response = await updateUser(user._id, data);
      console.log("User updated successfully:", response);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
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
        <div className="md:col-span-2 flex justify-end space-x-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="success"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
