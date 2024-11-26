import React from "react";
import styled from "styled-components";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../apiCalls/users/createOrder";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { verifyPayment } from "../../reduxToolkit/features/productList/ProductSlice";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const amount = useSelector((state) => state.cart.cartTotalAmount);
  const { billingAddress } = useSelector((store) => store);
  const { token } = useSelector((store) => store.auth);

  const handleCodPayment = () => {
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
        mode: "COD",
      },
    };

    createOrder(orderReqData, token, dispatch, navigate);
  };

  const orderId = "order_PIYRnsjqHm81Jy";
  const orderi = useSelector((state) => state.product.orders);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

  const handleOnlinePayment = async () => {
    if (!orderId) {
      console.error("Order not created!");
      return;
    }

    try {
      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: cartTotalAmount * 100,
        currency: "INR",
        name: "beihrazi",
        order_id: orderi[0].razorpayOrderId,
        handler: function (response) {
          const paymentDetails = {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: cartTotalAmount,
            currency: "INR",
            status: "completed",
            payment_method: "Razorpay",
          };

          dispatch(verifyPayment(paymentDetails))
            .unwrap()
            .then((res) => {
              if (res.status === "success") {
                toast.success("Payment Successful");
                setTimeout(() => {
                  navigate("/products");
                }, 2000);
              } else {
                toast.error("Payment Failed");
              }
            })
            .catch((error) => {
              console.error("Payment verification error:", error);
            });
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating payment order:", error);
    }
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
          disabled // COD is disabled
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
  margin: auto 10%;
  h3 {
    text-align: center;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    margin: auto 5%;
    h3 {
      font-size: 1rem;
    }
  }
`;

const Container = styled.div`
  padding: 2rem;
  border: 1px solid #e1c7c7;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;
