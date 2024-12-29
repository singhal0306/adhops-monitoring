import React, { useEffect, useState } from "react";

const OfferFilter = () => {
  const [selectedOption, setSelectedOption] = useState('all');

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-4">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Filter</h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-around gap-5.5 p-6.5">
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Active Campaign
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
              }}
              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
            >
              <option
                value=""
                className="text-body dark:text-bodydark"
              >
                Select campaign type
              </option>
              <option value="all" className="text-body dark:text-bodydark">
                All
              </option>
              <option value={null} className="text-body dark:text-bodydark">
                Active
              </option>
              <option value="active" className="text-body dark:text-bodydark">
                Inactive
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Search Title
          </label>
          <div className="relative">
            <input type="text" />
          </div>
        </div>
        <div className="justify-center mt-8">
          <button
            className=" rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            // onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferFilter;
