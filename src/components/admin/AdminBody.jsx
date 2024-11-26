import React from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="flex flex-wrap justify-center items-center mt-5 h-80% gap-2 px-10">
  {/* Manage Categories */}
  <div className="border-4 bg-gray-500 p-6 w-full md:w-[45%] lg:w-[30%] flex flex-col justify-center items-center rounded-lg shadow-md">
    <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl text-center">
      Manage Categories
    </h2>
    <img
      onClick={handleClickCategories}
      className="w-28 h-28 md:w-36 md:h-36 rounded-full mt-4 cursor-pointer hover:scale-105 transition-transform"
      src="https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png"
      alt="Manage Categories"
    />
  </div>

  {/* Manage Sellers */}
  <div className="border-4 bg-gray-500 p-6 w-full md:w-[45%] lg:w-[30%] flex flex-col justify-center items-center rounded-lg shadow-md">
    <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl text-center">
      Manage Sellers
    </h2>
    <img
      onClick={handleClickSeller}
      className="w-28 h-28 md:w-36 md:h-36 rounded-full mt-4 cursor-pointer hover:scale-105 transition-transform"
      src="https://blinkit.com/careers/sites/default/files/2021-12/local-desktop-masthead.png"
      alt="Manage Seller"
    />
  </div>
</div>

  );
};

export default AdminBody;
