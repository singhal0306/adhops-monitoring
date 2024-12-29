import React from "react";
import { useSelector } from "react-redux";
import Spinner from "./common/Spinner";
import TruncatedText from "./common/TruncatedText";

const SurgexTable = ({ option, searchTerm }) => {
  const brandData = useSelector((state) => state.mobAvenue.offerData);
  let filteredBrands;
  try {
    filteredBrands = brandData.filter((brand) => {
      if (option === "all" || option === "") {
        return true;
      } else if (option === "active") {
        return brand.status === "active";
      } else if (option === "null") {
        return brand.status === null;
      }
      return false;
    });
  } catch (error) {}

  const formatNumberToIndian = (num) => {
    const [integerPart, fractionalPart] = num.toString().split(".");

    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);

    const formattedInteger =
      otherNumbers !== ""
        ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
        : lastThree;

    return fractionalPart
      ? `${formattedInteger}.${fractionalPart}`
      : formattedInteger;
  };

  return brandData === null ? (
    <div className="pt-40">
      <Spinner />
    </div>
  ) : (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Surgex Offer (Surgex-Dashboard)
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-9 mb-2">
          <div className="py-2.5 xl:py-5 ps-10">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Id</h5>
          </div>

          <div className="hidden sm:block py-2.5 pe-5 text-center xl:py-5 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Title
            </h5>
          </div>

          <div className="hidden sm:block py-2.5  text-center xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Impressions
            </h5>
          </div>
          <div className="hidden sm:block py-2.5 text-center xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Clicks
            </h5>
          </div>
          <div className="py-2.5 text-center xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Installs
            </h5>
          </div>
          <div className="py-2.5 text-center xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenue
            </h5>
          </div>
          <div className="hidden sm:block py-2.5 text-center xl:py-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">CR</h5>
          </div>
          <div className="hidden sm:block py-2.5 text-center xl:py-5">
            <h5 className="text-sm font-medium xsm:text-base">CPI</h5>
          </div>
          <div className="hidden sm:block py-2.5 text-center xl:py-5">
            <h5 className="text-sm font-medium xsm:text-base">eCPM</h5>
          </div>
        </div>

        {filteredBrands
          .filter((brand) =>
            brand.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((brand) => (
            <div
              className="grid grid-cols-3 sm:grid-cols-9 border-b border-stroke dark:border-strokedark"
              key={brand.id}
            >
              <div className="flex items-center justify-center">
                <p
                  className={`text-black dark:text-white sm:block bg-opacity-1 text-sm font-medium py-1 px-4 rounded-md ${
                    brand.status === "active" ? "bg-success " : ""
                  }`}
                >
                  {brand.id}
                </p>
              </div>
              <TruncatedText text={brand.title} />
              <div className="hidden sm:flex items-center justify-center py-2.5 xl:py-5">
                <p className="text-black dark:text-white">
                  {formatNumberToIndian(parseInt(brand.impressions))}
                </p>
              </div>

              <div className="hidden items-center justify-center py-2.5 sm:flex xl:py-5">
                <p className="text-black dark:text-white">
                  {formatNumberToIndian(brand.clicks)}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-5">
                  {formatNumberToIndian(brand.installs)}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <p className="text-meta-3 text-sm">
                  ₹ {formatNumberToIndian(brand.revenueInr.toFixed(2))}
                </p>
              </div>

              <div className="hidden items-center justify-center  sm:flex ">
                <p className="text-black dark:text-white">
                  {formatNumberToIndian(brand.cr.toFixed(2))} %
                </p>
              </div>
              <div className="hidden items-center justify-center sm:flex">
                <p className="text-black dark:text-white">
                  {formatNumberToIndian(brand.cpi.toFixed(2))} %
                </p>
              </div>
              <div className="hidden items-center justify-center sm:flex">
                <p className="text-meta-3">
                  ₹ {formatNumberToIndian(brand.eCpm.toFixed(2))}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SurgexTable;
