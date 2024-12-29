import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/common/DefaultLayout";
import GroupOne from "../components/SelectGroup/GroupOne";
import TableTwo from "../components/TableTwo";
import { useDispatch, useSelector } from "react-redux";
import { addUser, listUsers } from "./../store/adminAction";

const AdminScreen = () => {
  const isChange = useSelector((state) => state.admin.isChange);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("Bobble@123");
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (newRole) => {
    setSelectedRole(newRole);
  };

  const dispatch = useDispatch();
  const addUserHandler = (e) => {
    e.preventDefault();
    // console.log({firstName, lastName, email, password, selectedRole})
    dispatch(addUser({ firstName, lastName, email, password, selectedRole }));
    setFirstName("");
    setLastName("");
    setEmail("");
    setSelectedRole("");
  };

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, isChange]);

  return (
    <DefaultLayout>
      <h3 className="mb-5.5 text-2xl font-semibold text-black dark:text-white">
        Admin Panel
      </h3>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-center text-black dark:text-white">
                Add New User
              </h3>
            </div>
            <form onSubmit={addUserHandler}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <GroupOne onRoleChange={handleRoleChange} role={selectedRole} />

                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-9">
          <TableTwo />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdminScreen;
