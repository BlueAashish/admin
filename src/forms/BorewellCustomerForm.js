import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { borewellCustomerSchema } from "../schemas/borewellCustomerSchema";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import {
  useBorewellCustomerService,
  useUserService,
} from "../services/userService";
import { usePlanService } from "../services/planService";

const mockImeiNumbers = [
  { imei: "123456789012345", mobileNumber: "9876543210" },
  { imei: "987654321098765", mobileNumber: "9876543211" },
];

const mockPlans = [
  { id: "1", name: "Basic Plan" },
  { id: "2", name: "Premium Plan" },
  { id: "3", name: "Enterprise Plan" },
];

const BorewellCustomerForm = ({
  customer,
  onSubmit,
  onCancel,
  sensorOptions,
  mode = "add",
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedImei, setSelectedImei] = useState(null);
  const [monitoringUnitId, setMonitoringUnitId] = useState("");
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  console.log(sensorOptions);

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const { createBorewellCustomer, updateBorewellCustomer } =
    useBorewellCustomerService();
  const { getUsers } = useUserService();
  const { getPlans } = usePlanService();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(borewellCustomerSchema),
    defaultValues: {
      userId: customer?.userId?._id || "",
      sensorName: customer?.sensorName || "",
      serialNo: customer?.serialNo || "",
      installationDate: formatDateForInput(customer?.installationDate) || "",
      longitude: customer?.longitude || "",
      latitude: customer?.latitude || "",
      imeiNo: customer?.imeiNo || "",
      mobileNumber: customer?.mobileNumber || "",
      modelNo: customer?.modelNo || "",
      plan: customer?.plan || "",
      companyAddress: customer?.companyAddress || "",
      monitoringUnitId: customer?.monitoringUnitId || "",
    },
  });

  // Fetch users and set initial user data
  useEffect(() => {
    const fetchUsersAndSetInitialData = async () => {
      const response = await getUsers();
      setUsers(response.data);
      const plansResponse = await getPlans();
      setPlans(plansResponse);

      // If in edit mode and we have a customer with userId, set the selected user
      if (mode === "edit" && customer?.userId?._id) {
        const user = response.data.find((u) => u._id === customer.userId._id);
        if (user) {
          setSelectedUser(user);
          setValue("companyAddress", user.address || "");
        }
      }
    };

    fetchUsersAndSetInitialData();
  }, [customer, mode, setValue]);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const user = users.find((u) => u._id === userId);
    setSelectedUser(user);
    setValue("companyAddress", user?.address || "");
  };

  // Handle IMEI selection
  const handleImeiChange = (e) => {
    const imei = e.target.value;
    const imeiData = mockImeiNumbers.find((i) => i.imei === imei);
    setSelectedImei(imeiData);
    setValue("mobileNumber", imeiData?.mobileNumber || "");
  };

  const onSubmitForm = async (data) => {
    try {
      if (mode === "add") {
        await createBorewellCustomer(data);
      } else {
        await updateBorewellCustomer(customer._id, data);
      }
      if (onSubmit) {
        onSubmit();
      }
      reset();
      setSelectedUser(null);
      setSelectedImei(null);
    } catch (error) {
      console.error(`Failed to ${mode} borewell customer:`, error);
    }
  };

  // Watch sensor name changes to auto-fill model number
  const selectedSensorName = watch("sensorName");
  useEffect(() => {
    if (selectedSensorName) {
      const selectedSensor = sensorOptions.find(
        (sensor) => sensor.id === selectedSensorName
      );
      if (selectedSensor) {
        setValue("modelNo", selectedSensor.model);
      }
    }
  }, [selectedSensorName, sensorOptions, setValue]);

  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {mode === "add"
          ? "Add New Borewell Customer"
          : "Edit Borewell Customer"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {mode === "add" ? (
          <Select
            label="User Email"
            options={users?.map((user) => ({
              value: user._id,
              label: user.email,
            }))}
            error={errors.userId}
            {...register("userId")}
            onChange={handleUserChange}
          />
        ) : (
          <Select
            label="User Email"
            options={users?.map((user) => ({
              value: user._id,
              label: user.email,
            }))}
            value={selectedUser?._id}
            error={errors.userId}
            {...register("userId")}
            onChange={handleUserChange}
          />
        )}

        <Select
          label="Sensor Name"
          options={sensorOptions?.map((sensor) => ({
            value: sensor.id,
            label: `${sensor.name} - ${sensor.type}`,
          }))}
          error={errors.sensorName}
          {...register("sensorName")}
        />

        <Input
          label="Serial Number"
          type="text"
          error={errors.serialNo}
          {...register("serialNo")}
        />

        <Input
          label="Installation Date"
          type="date"
          error={errors.installationDate}
          {...register("installationDate")}
          defaultValue={formatDateForInput(customer?.installationDate)}
        />

        <Input
          label="Longitude"
          type="text"
          error={errors.longitude}
          {...register("longitude")}
        />

        <Input
          label="Latitude"
          type="text"
          error={errors.latitude}
          {...register("latitude")}
        />

        <Select
          label="IMEI Number"
          options={mockImeiNumbers.map((item) => ({
            value: item.imei,
            label: item.imei,
          }))}
          error={errors.imeiNo}
          {...register("imeiNo")}
          onChange={handleImeiChange}
        />

        <Input
          label="Mobile Number"
          type="text"
          error={errors.mobileNumber}
          {...register("mobileNumber")}
          disabled
        />

        <Input
          label="Model Number"
          type="text"
          error={errors.modelNo}
          {...register("modelNo")}
        />

        <Select
          label="Plan"
          options={plans?.map((plan) => ({
            value: plan._id,
            label: plan.name,
          }))}
          error={errors.plan}
          {...register("plan")}
        />

        <Input
          label="Company Address"
          type="text"
          error={errors.companyAddress}
          {...register("companyAddress")}
          disabled
        />

        <Input
          label="Monitoring Unit ID"
          type="text"
          error={errors.monitoringUnitId}
          {...register("monitoringUnitId")}
          disabled
          value={monitoringUnitId}
        />

        <div className="md:col-span-2 flex justify-end space-x-4">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="px-6 py-2"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="success"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {mode === "add" ? "Create Customer" : "Update Customer"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BorewellCustomerForm;
