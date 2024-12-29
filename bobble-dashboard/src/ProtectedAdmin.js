import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = (props) => {
  const auth = useSelector((state) => state.user.loginSuccess);
  const role = useSelector((state) => state.user.user.role);
  if (auth === null) {
    // Optional: Handle loading state, if necessary
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  if (auth && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return props.children;
};

export default ProtectedAdmin;
