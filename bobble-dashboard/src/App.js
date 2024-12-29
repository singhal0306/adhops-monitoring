import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedWrapper from "./ProtectedWrapper";
import ProtectedAdmin from "./ProtectedAdmin";
import Layout from "./components/Layout";
import ECommerce from "./screens/ECommerce";
import Data from "./screens/MobAvenue";
import LoginScreen from "./screens/LoginScreen";
import NoPageFound from "./screens/NoPageFound";
import AdminScreen from "./screens/AdminScreen";
import Account from "./screens/Account";
import SurgexOfferScreen from "./screens/SurgexOfferScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/"
          element={
            <ProtectedWrapper>
              <Layout />
            </ProtectedWrapper>
          }
        >
          <Route index element={<ECommerce />} />
          <Route path="/settings" element={<Account />} />
          <Route path="/mobavenue" element={<Data />} />
          <Route path="/surgexoffer" element={<SurgexOfferScreen />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <Layout />
              </ProtectedAdmin>
            }
          >
            <Route path="/admin" element={<AdminScreen />} />
          </Route>
        </Route>

        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </Router>
  );
};

export default App;
