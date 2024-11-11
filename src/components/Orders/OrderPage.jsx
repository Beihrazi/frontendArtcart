import React, { useEffect } from "react";
import Header from "../common/Header";
import Footer2 from "../common/Footer2";
import Order from "./Order";

import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  // const { token } = useSelector((store) => store.auth);
  // console.log(token);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log("order page");
  //   getAllUndeliveredOrders(token, dispatch);
  //   getAllOrders(token, dispatch);
  // }, []);
  // const navigate = useNavigate();
  // const { signin } = useSelector((store) => store.auth);
  // useEffect(() => {
  //   if (signin === false) {
  //     console.log("usdj");
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <div>
      <Header />
      <Order />
      <Footer2 />
    </div>
  );
};

export default OrderPage;
