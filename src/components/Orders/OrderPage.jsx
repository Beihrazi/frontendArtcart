import React, { useEffect } from "react";
import Header from "../common/Header";
import Footer2 from "../common/Footer2";
import Order from "./Order";

import { useNavigate } from "react-router-dom";

const OrderPage = () => {
 
  return (
    <div>
      <Header />
      <Order />
      <Footer2 />
    </div>
  );
};

export default OrderPage;
