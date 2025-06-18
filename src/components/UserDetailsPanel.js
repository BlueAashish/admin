import React from "react";

const UserDetailsPanel = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-all duration-300 ease-in-out z-50"
        style={{
          animation: "slideIn 0.3s ease-out",
        }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-xl font-semibold text-gray-800">
              User Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none transform hover:scale-110 transition-transform duration-200"
            >
              <svg
                className="h-6 w-6"
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

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Basic Information
                </h3>
                <div className="space-y-4 bg-white rounded-lg p-4 shadow-sm">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Company
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.companyName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Address Information
                </h3>
                <div className="space-y-4 bg-white rounded-lg p-4 shadow-sm">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Address
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      City
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.city}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      State
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.state}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Pincode
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.pincode}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Additional Information
                </h3>
                <div className="space-y-4 bg-white rounded-lg p-4 shadow-sm">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      User Flow Limit
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.userFlowLimit}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Role
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-white to-blue-50">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default UserDetailsPanel;
