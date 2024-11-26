import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Button, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import BillAddress from "./BillAddress";
import OrderDetail from "./OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import PaymentDetails from "./PaymentDetails";
import { postOrder } from "../../reduxToolkit/features/productList/ProductSlice";

const BillingPage = () => {
  const [value, setValue] = useState("1");
  const [visited1, setVisited1] = useState(true); // Tab 1 is visited by default
  const [visited2, setVisited2] = useState(false);
  const [visited3, setVisited3] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeliverClick = () => {
    setValue("2");
    setVisited2(true); // Mark Tab 2 as visited when it's selected
  };
  const individualCartItem = useSelector((state) => state.cart.cartItems);

  // const productsInCart = individualCartItem.map((item) => ({
  //   productId: item.id,
  //   cartQuantity: item.cartQuantity,
  // }));
  // console.log(productsInCart)

  //Extracting cartItems
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartData = cartItems.map((item) => ({
    productId: item._id,
    quantity: item.cartQuantity,
    amount: item.price,
  }));
  // console.log("cartData: ", cartData)
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  // console.log("cartTotalAmount: ", cartTotalAmount)

  //ORDER
  const handleDeliverClick2 = () => {
    const orderData = {
      products: cartData,
      totalAmount: cartTotalAmount,
    };
    dispatch(postOrder(orderData));
    setValue("3");
    setVisited3(true); // Mark Tab 3 as visited when it's selected
  };

  return (
    <Wrapper>
      <div className="header">
        <img src="/images/Logo.jpg" alt="Logo"></img>{" "}
        <span className="art"> ArtCart</span>
      </div>
      <TabContext value={value}>
        <Container>
          <TabList onChange={handleChange} aria-label="head">
            <Tab
              className="item-head"
              icon={<LocationOnIcon />}
              label="Billing Address"
              value="1"
              disabled={!visited1} // Disable tab 1 if not visited
            />
            <Tab
              className="item-head"
              icon={<DescriptionIcon />}
              label="Order Details"
              value="2"
              disabled={!visited2} // Disable tab 2 if not visited
            />
            <Tab
              className="item-head"
              icon={<PaymentIcon />}
              label="Payment"
              value="3"
              disabled={!visited3} // Disable tab 3 if not visited
            />
          </TabList>
        </Container>
        <SubContainer>
          <TabPanel value="1">
            <BillAddress handleDeliverClick={handleDeliverClick} />
          </TabPanel>

          <TabPanel value="2">
            <OrderDetail />
            <Button
              variant="contained"
              onClick={handleDeliverClick2}
              sx={{
                width: {
                  xs: "10rem", // For small screens
                  sm: "12rem", // For medium screens
                  md: "14rem", // For large screens and above
                },
                height: "2.6rem",
                marginTop: "1rem",
                marginLeft: {
                  xs: "1rem", // For small screens
                  sm: "4rem", // For medium screens
                  md: "12rem", // For large screens and above
                },
                backgroundColor: "orange",
              }}
            >
              Confirm order
            </Button>
            {/* <PaymentButton /> */}
          </TabPanel>
          {/* <TabPanel value="3">
            <PaymentDetail />
          </TabPanel> */}
          <TabPanel value="3">
            <PaymentDetails />
          </TabPanel>
        </SubContainer>
      </TabContext>
    </Wrapper>
  );
};

export default BillingPage;

const Wrapper = styled.section`
  .header {
    background: linear-gradient(to right, #007bff, #00bfff);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    height: 50px;

    @media (max-width: 768px) {
      flex-direction: column;
      height: auto;
      padding: 10px;
    }
  }

  .header > img {
    height: 40px;
    width: 40px;
    border-radius: 2rem;

    @media (max-width: 768px) {
      height: 35px;
      width: 35px;
    }
  }

  .art {
    margin-left: 0.5rem;
    color: white;
    font-size: 1.2rem;
    font-weight: 550;

    @media (max-width: 768px) {
      margin-left: 0;
      font-size: 1rem;
      text-align: center;
    }
  }
`;

const Container = styled.div`
  border: 1px solid #bd9393;
  border-bottom: 1px solid dimgray;
  margin: auto 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52%;
  background-image: linear-gradient(
    30deg,
    rgba(228, 219, 219, 0.046),
    rgba(244, 238, 195, 0.575),
    rgba(169, 206, 225, 0.37)
  );
  margin-left: 24%;
  border-radius: 12px;

  @media (max-width: 1024px) {
    width: 70%;
    margin-left: 15%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    margin-left: 5%;
    padding: 10px;
  }

  .item-head {
    text-transform: capitalize;
    margin-left: 2rem;

    @media (max-width: 768px) {
      margin-left: 0;
      font-size: 1rem;
      text-align: center;
    }
  }
`;

const SubContainer = styled.div`
  /* border: 1px solid black; */
  margin: 1.2rem 12%;

  @media (max-width: 1024px) {
    margin: 1rem 10%;
  }

  @media (max-width: 768px) {
    margin: 1rem 5%;
  }
`;
