import React from "react";

const Modal = ({ show, handleClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-5 backdrop-blur-xl ${
        show ? "block" : "hidden"
      }`}
    >
      <div
        className="fixed bg-gray-800 opacity-50 dark:bg-gray-900 dark:opacity-70 m-5"
        onClick={handleClose}
      ></div>
      <div className="border-b w-96 border-stroke py-4 px-6.5 m-5 dark:border-strokedark">
        <button
          className="text-black dark:text-white float-right text-2xl leading-none font-semibold m-3 hover:font-extrabold"
          onClick={handleClose}
        >
          &times;
        </button>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Confirm your password
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Current Password
              </label>
              <input
                type="password"
                placeholder="******"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
