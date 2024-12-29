import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "./store/userAction";
import { initialData } from "./store/mobAvenueAction";

const ProtectedWrapper = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(initialData());
  }, [dispatch]);

  const auth = useSelector((state) => state.user.loginSuccess);

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

  return props.children;
};

export default ProtectedWrapper;
