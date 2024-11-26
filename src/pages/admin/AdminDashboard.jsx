import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

import { Outlet } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";
import Footer2 from "../../components/common/Footer2";

const AdminDashboard = () => {
  return (
    <div className="border-2 border-red-600 flex flex-col h-screen p-5 w-screen box-border">
      <div className="border-3 border-green-500">
        <AdminNav />
      </div>
      <div className="flex-1 border-2 border-orange-300">
        <Outlet />
      </div>
      <div className="border-3 border-blue-600">
        <Footer2 />
      </div>
    </div>
  );
};

export default AdminDashboard;
