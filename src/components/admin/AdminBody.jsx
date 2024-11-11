import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminBody = () => {
  const navigate = useNavigate();

  const handleClickCategories = () => {
    console.log("clicked categories");
    navigate("/admin/categories");
  };

  const handleClickSeller = () => {
    console.log("clicked seller");
    navigate("/admin/manageseller");
  };

  // const handleClickCourier = () => {
  //   console.log("clicked courier");
  // };

  return (
    <div className="border-2 border-green-600 flex justify-center items-center mt-5 h-full">
      <div className="border-4 bg-gray-500 p-3 w-[30%] h-52 flex flex-col justify-center items-center">
        <h2 className="font-semibold text-3xl">Manage Categories</h2>
        <img
          onClick={handleClickCategories}
          className="w-32 h-32 rounded-full mt-4"
          src="https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png"
          alt="Manage Categories"
        />
      </div>
      <div className="border-4 bg-gray-500 p-3 w-[30%] h-52 flex flex-col justify-center items-center">
        <div className="font-semibold text-3xl" to={"/admin/manageseller"}>
          ManageSeller
        </div>
        <img
          onClick={handleClickSeller}
          className="w-32 h-32 rounded-full mt-4"
          src="https://blinkit.com/careers/sites/default/files/2021-12/local-desktop-masthead.png"
          alt="Manage Seller"
        />
      </div>
    </div>
  );
};

export default AdminBody;
