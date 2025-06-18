import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import {
  sensorSchema,
  SENSOR_TYPES,
  SENSOR_STATUS,
} from "../schemas/sensorSchema";

const SensorForm = ({ sensor, onSubmit, onCancel, mode = "add" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(sensorSchema),
    defaultValues: {
      name: sensor?.name || "",
      model: sensor?.model || "",
      type: sensor?.type || "",
      status: sensor?.status || "",
    },
  });

  const onSubmitForm = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(`Failed to ${mode} sensor:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Sensor Name"
          type="text"
          error={errors.name}
          {...register("name")}
        />

        <Input
          label="Model"
          type="text"
          error={errors.model}
          {...register("model")}
        />

        <Select
          label="Type"
          options={SENSOR_TYPES}
          error={errors.type}
          {...register("type")}
        />

        <Select
          label="Status"
          options={SENSOR_STATUS}
          error={errors.status}
          {...register("status")}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {mode === "add" ? "Add Sensor" : "Update Sensor"}
        </Button>
      </div>
    </form>
  );
};

export default SensorForm;
