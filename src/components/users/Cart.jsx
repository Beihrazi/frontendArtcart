import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import LockIcon from "@mui/icons-material/Lock";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SingleCart from "./SingleCart";
import {NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  let totalAmount = useSelector((state) => state.cart.cartTotalAmount);
  let totalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  
  const handleCheckOut = () => {
    console.log("handle checkout");
    if (auth.isLoggedIn === true) {
      navigate("/billing");
    } else {
      navigate("/users/login");
    }
  };

  return (
    <Wrapper>
      <Container>
        <div className="my-cart">
          <LocalMallIcon />
          <span id="title">My Cart</span>
        </div>

        <div className="continue-shop">
          <StyledNavLink to="/products"><ArrowBackIosIcon style={{
            height: "15px"
          }}/>Continue Shopping </StyledNavLink>
          <span id="items">
            <span className="quantity">{totalQuantity}</span> items
          </span>
          <br />
        </div>
        <div className="cart-content">
          <div className="cart-details">
            {cartItems.map((item) => (
              <SingleCart key={item._id} item={item} />
            ))}
          </div>

          <div className="checkout-detail">
            <p id="coupon">Enter Promo Code</p>
            <TextField
              id="outlined-basic"
              label="Promo Code"
              variant="outlined"
              InputProps={{
                style: {
                  height: "3rem",
                },
              }}
              style={{
                height: "3rem",
                width: "10rem",
              }}
            />
            <Button
              variant="contained"
              style={{
                width: "9.5rem",
                height: "3rem",
                backgroundColor: "black",
              }}
            >
              Submit
            </Button>
            <div className="cart discount">
              <p>Subtotal</p>
              <p id="purchase">
                <CurrencyRupeeIcon
                  style={{
                    height: "1.2rem",
                  }}
                />
                {totalAmount}
              </p>
            </div>
            <div className="cart shipping-cost">
              <p>Shipping cost</p>
              <p id="purchase">
                <CurrencyRupeeIcon
                  style={{
                    height: "1.2rem",
                  }}
                />
                10
              </p>
            </div>
            <div className="cart red">
              <p>Shipping Discount</p>
              <p id="purchase">
                -
                <CurrencyRupeeIcon
                  style={{
                    height: "1.2rem",
                  }}
                />
                10
              </p>
            </div>

            <div className="cart tax border-bot">
              <p>Tax</p>
              <p>TBO</p>
            </div>

            <div className="cart total-cost">
              <p id="total">Estimated Total</p>
              <p id="totalEstimated">
                <CurrencyRupeeIcon
                  style={{
                    height: "1.2rem",
                  }}
                />{" "}
                {totalAmount}{" "}
              </p>
            </div>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<LockIcon />}
              onClick={handleCheckOut}
              style={{
                width: "100%",
                height: "2.8rem",
                color: "white",
                backgroundColor: "green",
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Cart;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Wrapper = styled.section``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  position: relative;

  .continue-shop {
    height: 1.8rem;
    display: flex;
    justify-content: space-between;
    width: 80%;
    position: absolute;
    right: 0;
    left: 9rem;
    top: 8rem;
    border-bottom: 1px solid black;

    #items {
      font-weight: 600;
      font-size: 1rem;
    }

    .quantity {
      color: #ff4800;
    }

    @media (max-width: 768px) {
      
      flex-direction: column;
      left: -5rem;
      right: 1rem;
      top: 5rem;
      text-align: center;
      border:none;
      
      #items {
        font-size: 1rem;
        position: relative;
        top: .2rem;
        left: 8.5rem;
      }
        
    }
  }

  .cart-details {
    flex: 0.7;

    @media (max-width: 768px) {
      flex: 1;
      width: 100%;
      .cart{
        display:flex;
        justify-content:flex-start;
        align-items:flex-start;
      }
    }
  }

  #title {
    margin-left: 5px;
    font-size: 1.5rem;
    font-weight: 550;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 1.2rem;
    }
  }

  .my-cart {
    height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      height: auto;
      padding: 1rem;
    }
  }

  .cart-content {
    margin: 10px auto;
    width: 80%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    gap: 7rem;

    @media (max-width: 768px) {
      flex-direction: column;
      width: 90%;
      gap: 1rem;
    }
  }

  .checkout-detail {
    flex: 0.3;
    margin-top: 10px;

    @media (max-width: 768px) {
      flex: 1;
      margin-top: 1rem;
    }
  }

  .red {
    color: #ef3c3c;
  }

  #purchase {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 550;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  #coupon {
    font-weight: 550;
    text-transform: uppercase;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 10px;
    }
  }

  .cart {
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      padding: 10px;
      height: auto;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  .discount {
    margin-top: 1rem;
  }

  .border-bot {
    border-bottom: 1px solid black;
  }

  .total-cost {
    margin: 10px 0;
    padding: 0 10px;
    font-size: 1.2rem;
    font-weight: 600;

    #totalEstimated {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      font-weight: 550;
      color: #1a0f02;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
`;
