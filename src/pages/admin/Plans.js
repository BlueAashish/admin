import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import ConfirmationModal from "../../components/ConfirmationModal";
import PlanForm from "../../forms/PlanForm";
import { usePlanService } from "../../services/planService";
import Button from "../../components/Button";

const Plans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  const { getPlans, createPlan, updatePlan, deletePlan } = usePlanService();

  const columns = [
    { key: "name", title: "Plan Name" },
    { key: "description", title: "Description" },
    {
      key: "price",
      title: "Price (₹)",
      render: (price) => `₹${Number(price).toLocaleString()}`,
    },
    {
      key: "duration",
      title: "Duration (months)",
      render: (duration) => `${duration} months`,
    },
    {
      key: "features",
      title: "Features",
      render: (features) => features.join(", "),
    },
    {
      key: "status",
      title: "Status",
      render: (status) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: "createdAt",
      title: "Created At",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await getPlans();
      console.log("API Response:", response); // Debug log
      if (response || response.data) {
        setPlans(response);
      } else {
        setPlans([]);
        console.error("Invalid response format:", response);
      }
      setError(null);
    } catch (err) {
      setError("Failed to fetch plans");
      console.error("Error fetching plans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAddNewPlan = async (planData) => {
    try {
      const response = await createPlan(planData);
      console.log("Create Plan Response:", response); // Debug log
      setShowForm(false);
      fetchPlans();
    } catch (err) {
      console.error("Failed to create plan:", err);
    }
  };

  const handleEditPlan = async (planData) => {
    try {
      const response = await updatePlan(selectedPlan._id, planData);
      console.log("Update Plan Response:", response); // Debug log
      setShowForm(false);
      setSelectedPlan(null);
      fetchPlans();
    } catch (err) {
      console.error("Failed to update plan:", err);
    }
  };

  const handleDeleteClick = (plan) => {
    setPlanToDelete(plan);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deletePlan(planToDelete._id);
      console.log("Delete Plan Response:", response); // Debug log
      setShowDeleteModal(false);
      setPlanToDelete(null);
      fetchPlans();
    } catch (err) {
      console.error("Failed to delete plan:", err);
    }
  };

  const renderActions = (plan) => (
    <div className="flex space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedPlan(plan);
          setShowForm(true);
        }}
        className="text-blue-600 hover:text-blue-800"
      >
        Edit
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteClick(plan);
        }}
        className="text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-blue-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-6 py-3 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="font-semibold">Back</span>
      </button>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Subscription Plans
          </h1>
          <Button
            variant="primary"
            onClick={() => {
              setSelectedPlan(null);
              setShowForm(true);
            }}
          >
            Add New Plan
          </Button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <PlanForm
              plan={selectedPlan}
              onSubmit={selectedPlan ? handleEditPlan : handleAddNewPlan}
              onCancel={() => {
                setShowForm(false);
                setSelectedPlan(null);
              }}
              mode={selectedPlan ? "edit" : "add"}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg">
          <Table columns={columns} data={plans} actions={renderActions} />
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPlanToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Plan"
        message={`Are you sure you want to delete the plan "${planToDelete?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default Plans;
