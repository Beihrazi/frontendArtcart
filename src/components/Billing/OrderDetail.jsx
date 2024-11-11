import React from "react";
import styled from "styled-components";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { CurrencyRupee } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const OrderDetail = () => {
  const carts = useSelector((state) => state.cart);
  console.log("carts: ", carts)

  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log("cartItems: ", cartItems)

  const cartQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  // console.log("cartQuantity: ", cartQuantity)

  const cartAmount = useSelector((state) => state.cart.cartTotalAmount);
  // console.log("cartAmount: ", cartAmount)

  return (
    <Wrapper>
      <Container>
        <div className="items">
          {cartItems.map((item) => (
            <div className="product-detail" key={item._id}>
              <div className="item-image">
                <img src={item.photos[0]} alt={item._id} />
              </div>
              <div className="description">
                <p className="title">{item.name} </p>
                {/* <span id="category">
                  Category: <span id="catDetail">{item.category.name}</span>
                </span>
                <br />
                <span id="seller">
                  Seller: <span id="sellername">{item.name}</span>
                </span>
                <br /> */}
                <p className="itemPrice">
                  <CurrencyRupee
                    style={{
                      height: "1.2rem",
                    }}
                  />
                  <span id="product-price">{item.price}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="price-detail">
          <h2>Order Summary</h2>
          <div className="mini-container">
            <div className="desc1">
              <ShoppingCartCheckoutOutlinedIcon />
              <span id="cartid">
                <span className="count">( {cartQuantity} ) </span> items in cart
              </span>
            </div>
            <div className="item first">
              <div className="desc order">Order Subtotal</div>
              <div className="no">
                <CurrencyRupeeOutlinedIcon
                  style={{
                    height: "1.2rem",
                  }}
                />
                {cartAmount}
              </div>
            </div>
            <div className="item">
              <div className="desc charge">Delivery Charges</div>
              <div
                className="no"
                style={{ textDecoration: "line-through", color: "red" }}
              >
                <CurrencyRupee
                  style={{
                    height: "1.2rem",
                    color: "red",
                  }}
                />
                <span id="number">10</span>
              </div>
            </div>
            <div className="item total">
              <strong
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div>Total Payable</div>
                <div className="no">
                  <CurrencyRupeeOutlinedIcon
                    style={{
                      height: "1.2rem",
                    }}
                  />
                  {cartAmount}
                </div>
              </strong>
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default OrderDetail;
const Wrapper = styled.div`
  padding: 1rem;
`;
const Container = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: center;
  align-items: center;
  .items {
  }
  .product-detail {
    margin-top: 1rem;
    border: 1px solid #a38787;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.26); 
    flex: 1;
    display: flex;

    /* justify-content: space-evenly;
        align-items: flex-start; */

    .item-image {
      /* border: 1px solid black; */
      height: 160px;
      width: 190px;
      padding: 10px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .description {
      /* border: 1px solid black; */
      padding-left: 1rem;
      width: 65%;

      .title {
        padding-top: 1rem;
        font-weight: 550;
        font-size: 1rem;
      }
      .itemPrice {
        color: #24a00b;
        margin-top: 1rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }

  #number {
    color: red;
    font-size: 1.2rem;
  }
  .count {
    font-size: 1.2rem;
    color: green;
    font-weight: 500;
  }

  /* border: 1px solid black; */
  .address {
    flex: 1;
    border: 1px solid black;
  }
  .price-detail {
    flex: 0.5;
    border: 1px solid #ac8383;
    width: 200px;
    height: 350px;
    border-radius: 15px;

    h2 {
      text-align: center;
      border-bottom: 1px dotted grey;
      padding: 1rem;
      font-weight: 550;
      text-transform: uppercase;
      color: #52240f;
    }
  }
  .mini-container {
    padding: 0 2rem;
    align-items: center;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
  }
  .first {
    margin-top: 1rem;
  }
  .desc1 {
    padding-top: 1rem;
    display: flex;
    align-items: center;
  }
  .no {
    margin-left: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .total {
    border-top: 1px dotted black;
  }
`;
