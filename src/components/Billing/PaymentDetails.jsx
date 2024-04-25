import React, { useState } from "react";
import styled from "styled-components";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentDetails } from "../../reduxToolkit/features/productList/BillingAddressSlice";
import toast, { Toaster } from "react-hot-toast";
import { createOrder } from "../../apiCalls/users/createOrder";
import { generatePaymentWithRazopay } from "../../apiCalls/users/generatePaymentWithRazopay";
import { useNavigate } from "react-router-dom";
const PaymentDetails = () => {
  const dispatch = useDispatch();

  const amount = useSelector((state) => state.cart.cartTotalAmount);
  const { billingAddress } = useSelector((store) => store);
  const { cartTotalAmount } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const handleCodPayment = () => {
    //preparedata for backend
    const orderReqData = {
      billingAddress: {
        customerName: billingAddress.name,
        phoneNumber: billingAddress.contact,
        alternatePhoneNumber: billingAddress.alternateContact,
        addressId: billingAddress.addressId,
      },
      products: billingAddress.orderProducts,
      paymentReq: {
        id: "0",
        amount: cartTotalAmount,
        mode: "COD",
      },
    };

    createOrder(orderReqData, token, dispatch, navigate);
  };
  const handleOnlinePayment = () => {
    const paymentReqData = {
      amount: cartTotalAmount,
    };

    const orderReqData = {
      billingAddress: {
        customerName: billingAddress.name,
        phoneNumber: billingAddress.contact,
        alternatePhoneNumber: billingAddress.alternateContact,
        addressId: billingAddress.addressId,
      },
      products: billingAddress.orderProducts,
      paymentReq: {
        id: "0",
        amount: cartTotalAmount,
        mode: "ONLINE",
      },
    };
    generatePaymentWithRazopay(
      paymentReqData,
      token,
      dispatch,
      orderReqData,
      navigate
    );
  };
  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <h3>Choose Payment Options</h3>
      <Container>
        <Button
          variant="contained"
          startIcon={<PaymentsIcon />}
          onClick={handleCodPayment}
        >
          Cash On Delivery
        </Button>

        <Button
          variant="contained"
          startIcon={<CreditCardIcon />}
          onClick={handleOnlinePayment}
        >
          Online
        </Button>
      </Container>
    </Wrapper>
  );
};

export default PaymentDetails;
const Wrapper = styled.div`
  border: 1px solid #9d8c8c;
  margin: auto 12rem;
  h3 {
    text-align: center;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;
const Container = styled.div`
  padding: 0 10rem;
  border: 1px solid #e1c7c7;
  height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
