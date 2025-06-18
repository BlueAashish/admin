import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";

const planSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  status: z.string().min(1, "Status is required"),
});

const PlanForm = ({ plan, onSubmit, onCancel, mode = "add" }) => {
  const [newFeature, setNewFeature] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: plan?.name || "",
      description: plan?.description || "",
      price: plan?.price || "",
      duration: plan?.duration || "",
      features: plan?.features || [],
      status: plan?.status || "active",
    },
  });

  const features = watch("features") || [];

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setValue("features", [...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setValue(
      "features",
      features.filter((_, i) => i !== index)
    );
  };

  const onSubmitForm = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(`Failed to ${mode} plan:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Plan Details</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            label="Plan Name"
            type="text"
            error={errors.name}
            {...register("name")}
          />

          <Input
            label="Price (₹)"
            type="number"
            error={errors.price}
            {...register("price")}
            min="0"
            step="0.01"
          />

          <Input
            label="Duration (months)"
            type="number"
            error={errors.duration}
            {...register("duration")}
            min="1"
          />

          <Select
            label="Status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            error={errors.status}
            {...register("status")}
          />
        </div>

        <div className="mt-6">
          <Input
            label="Description"
            type="textarea"
            error={errors.description}
            {...register("description")}
            rows={3}
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Plan Features
        </h3>
        <div className="space-y-4">
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                label="Add Feature"
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Enter a feature"
              />
            </div>
            <Button
              type="button"
              variant="primary"
              onClick={handleAddFeature}
              className="self-end"
            >
              Add Feature
            </Button>
          </div>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-md border border-gray-200"
              >
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="success"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {mode === "edit" ? "Update Plan" : "Create Plan"}
        </Button>
      </div>
    </form>
  );
};

export default PlanForm;
