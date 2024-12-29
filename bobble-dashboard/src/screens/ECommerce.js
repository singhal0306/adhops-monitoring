import React from "react";
import CardDataStats from "../components/charts/CardDataStats";
import ChartTwo from "../components/charts/ChartTwo";
import DefaultLayout from "../components/common/DefaultLayout";

import Impression from "../assets/Dashboard/Impression";
import Revenue from "./../assets/Dashboard/Revenue";
import Installs from "./../assets/Dashboard/Installs";
import Clicks from "../assets/Dashboard/Clicks";
import Spineer from "../components/common/Spinner";

import { useSelector } from "react-redux";

const ECommerce = () => {
  const summedData = useSelector((state) => state.mobAvenue.initialData.summedData);
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

  if (!summedData) {
    return (
      <div className="pt-40">
        <Spineer />
      </div>
    );
  }

  return (
    <DefaultLayout>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartTwo />
        <div className="flex flex-col col-span-12 py-8 rounded-sm border border-stroke bg-white justify-center items-center shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
          <div className="-mt-4 mb-3">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              MobAvenue
            </h4>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-5">
              <CardDataStats
                title="Impressions"
                total={
                  formatNumberToIndian(
                    parseInt(summedData.impressions / 100000)
                  ) + " L"
                }
              >
                <Impression />
              </CardDataStats>
              <CardDataStats
                title="Total Clicks"
                total={
                  formatNumberToIndian(parseInt(summedData.clicks / 1000)) +
                  " K"
                }
              >
                <Clicks />
              </CardDataStats>
            </div>
            <div className="flex flex-col gap-5">
              <CardDataStats
                title="Total Installs"
                total={
                  formatNumberToIndian(parseInt(summedData.installs / 1000)) +
                  " K"
                }
              >
                <Installs />
              </CardDataStats>

              <CardDataStats
                title="Total Revenue"
                total={
                  "" +
                  formatNumberToIndian(
                    parseFloat(summedData.revenueInr / 1000).toFixed(2)
                  ) +
                  " K"
                }
                //   rate="4.35%"
                //   levelUp
              >
                <Revenue />
              </CardDataStats>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
