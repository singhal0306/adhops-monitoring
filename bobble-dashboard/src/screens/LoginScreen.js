import React, { useState, useEffect } from "react";
import bobble_logo from "../assets/logo192.png";
import Spineer from "../components/common/Spinner";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/userAction";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [passTouched, setPassTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const emailValid = validator.isEmail(email);
  const emailInvalid = !emailValid && emailTouched;

  const passValid = password.trim().length >= 6;
  const passInvalid = !passValid && passTouched;

  const loginState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataIsOk = emailValid && passValid;
    if (dataIsOk) {
      dispatch(userLogin({ email, password, remember }));
    } else {
      setEmailTouched(true);
      setPassTouched(true);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (loginState.loginSuccess) {
      setTimeout(() => navigate("/"), 2);
    }
  }, [loginState.loginSuccess, navigate, dispatch]);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="https://bobble.ai/en/home"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          target="_blank"
          rel="noreferrer"
        >
          <img className="w-8 h-8 mr-2" src={bobble_logo} alt="logo" />
          Bobble AI
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 dark:bg">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Bobble Partner Performance
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={() => setEmailTouched(true)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="@example.com"
                />
                {emailInvalid && (
                  <p className="text-red-500">Enter valid email.</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onBlur={(e) => setPassTouched(true)}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {passInvalid && (
                  <p className="text-red-500">
                    Password must be atleast 6 character long.
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                {/* <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </a> */}
              </div>
              {loginState.loading && <Spineer />}
              {!loginState.loading && (
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign in
                </button>
              )}
              {loginState.loginFails && loginState.error && (
                <ErrorAlert alert={loginState.error} />
              )}
              {loginState.loginSuccess && (
                <SuccessAlert
                  alert={loginState.success}
                  message={"Redirecting to Home Screen"}
                />
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have credentials?{" "}
                <span className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Ask access from Admin
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
