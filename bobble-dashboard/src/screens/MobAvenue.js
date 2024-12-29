import React from "react";
import DefaultLayout from "../components/common/DefaultLayout";
import Table from "../components/Table";
import FilterOne from "../components/FilterOne";

const MobAvenue = () => {

  return (
    <DefaultLayout>
      <FilterOne/>
      <Table />
    </DefaultLayout>
  );
};

export default MobAvenue;
