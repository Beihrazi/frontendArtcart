import {
  orderSuccess,
  updateAddress,
} from "../../reduxToolkit/features/authSlice";
import { BASE_URL_LOCAL } from "../common-db";
import toast, { Toaster } from "react-hot-toast";

export const createOrder = async (data, token, dispatch, navigate) => {
  const res = await fetch(`${BASE_URL_LOCAL}/api/customer/order`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 201) {
    const resData = await res.json();
    dispatch(orderSuccess(true));
    navigate("/");
  } else {
    alert("Internal server error while creating order");
  }
};