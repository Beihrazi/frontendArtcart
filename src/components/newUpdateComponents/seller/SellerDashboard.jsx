import { Outlet } from "react-router-dom";
import Footer2 from "../../common/Footer2";
import SellerNav from "../../seller/SellerNav";


const SellerDashboard = () => {
  return (
    <div className="border-2 border-red-600 flex flex-col h-screen p-5 w-screen box-border">
      <div className="border-3 border-green-500">
        <SellerNav
         />
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

export default SellerDashboard;
