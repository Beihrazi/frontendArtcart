import React, { useState } from "react";
import styled from "styled-components";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";




const PaymentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const amount = useSelector((state) => state.cart.cartTotalAmount);
  const { billingAddress } = useSelector((store) => store);
  // const { cartTotalAmount } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.auth);

 
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
        // amount: cartTotalAmount,
        mode: "COD",
      },
    };

    createOrder(orderReqData, token, dispatch, navigate);
  };

  //PAYMENT
  const orderId = "order_PIYRnsjqHm81Jy";
  const orderi = useSelector((state) => state.product.orders); 
    // console.log("orderId: ", orderi[0].razorpayOrderId)
    const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
    // console.log("cartTotal: ", cartTotalAmount )

    
  const handleOnlinePayment = async () => {
    
    if (!orderId) {
      console.error('Order not created!');
      return;
    }
  
    try {
      // Set up Razorpay payment options
      const options = {
        key: `${import.meta.env.RAZORPAY_KEY_ID}`,
        amount: cartTotalAmount * 100,  
        currency: 'INR',
        name: 'beihrazi',
        order_id: orderi[0].razorpayOrderId,  
        handler: function (response) {
          const paymentDetails = {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: cartTotalAmount,
            currency: 'INR', 
            status: 'completed', 
            payment_method: 'Razorpay', 
          };
          
          
          dispatch(verifyPayment(paymentDetails))
            .unwrap()
            .then((res) => {
              if (res.status === 'success') {
                console.log('Payment Successful:', res.payment);
                toast.success("Payment Successful")
                
                setTimeout(()=>{
                  navigate("/products")
                }, 2000)
              
              } else {
                console.log('Payment Failed:', res.message);
                toast.error("Payment Failed")
               
              }
            })
            .catch((error) => {
              console.error('Payment verification error:', error);
            });
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
      };
  
      // Open Razorpay payment window
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating payment order:', error);
    }
  };
  
  //Data from Orders
  const data = useSelector(state => state.product.orders)
  console.log("order from payment page: ", data)

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
