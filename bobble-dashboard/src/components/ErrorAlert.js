import React from "react";

const ErrorAlert = (props) => {
  return (
    <div
      className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-500 px-4 py-3 shadow-md"
      role="alert"
    >
      <div className="flex justify-center">
        <p className="py-1"></p>
        <div className="font-bold">{props.alert}</div>
      </div>
    </div>
  );
};

export default ErrorAlert;
