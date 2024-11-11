import { Avatar, Badge, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { logout, signout } from "../../reduxToolkit/features/authSlice";

const Header = () => {
  let totalQuantity = useSelector((state) => state.cart.cartTotalQuantity);

  //latest-updates
  const { isLoggedIn, user } = useSelector((store) => store.auth);
  // console.log("user Status: ", isLoggedIn)
  // console.log("user: ", user)

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // console.log("logout");
    dispatch(logout(false));
    navigate("/");
  };

  const scrollToHero = () => {
    const heroSection = document.getElementById("refer");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="left">
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <div className="icon-container">
              <div className="image">
                <img src="/images/Logo.jpg" alt="logo-image"></img>
              </div>
              <h2>ArtCart</h2>
            </div>
          </NavLink>
        </div>
        {/* <div className="center">
          <div className="search-bar">
            <input placeholder='Search' />
          </div>
        </div> */}
        <div className="right">
          <ul>
            <li>
              <StyledLink to="/" onClick={scrollToHero}>
                About
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/products">Products</StyledLink>
            </li>
            {Object.keys(isLoggedIn).length === 0 && (
              <li>
                <StyledLink to="/seller/register">Become a Seller</StyledLink>
              </li>
            )}

            {isLoggedIn ? (
              <div className="avatar">
                <div
                  className="action"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar
                    style={{
                      height: "2.2rem",
                      width: "2.2rem",
                    }}
                  >
                    <AccountCircleIcon fontSize="large" />
                  </Avatar>
                  <span className="account">Account</span>
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <NavLink
                    to="/wishlist"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <FavoriteBorderOutlinedIcon />
                      WishList
                    </MenuItem>
                  </NavLink>
                  <NavLink
                    to="/orders"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListAltIcon />
                      Orders
                    </MenuItem>
                  </NavLink>
                  <MenuItem onClick={handleClose}>
                    <div onClick={handleLogout}>
                      <LogoutIcon />
                      Logout
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <li>
                <StyledLink to="/users/login">Login</StyledLink>
              </li>
            )}
            <li>
              <StyledLink to="/cartPage">
                <Badge badgeContent={totalQuantity} color="warning">
                  <ShoppingCartIcon
                    style={{
                      height: "1.7rem",
                      width: "1.7rem",
                    }}
                  />
                </Badge>{" "}
                <span className="cart">Cart</span>
              </StyledLink>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    color: #fae25c;
  }
`;
const Wrapper = styled.section`
  height: 4.2rem;
  background: linear-gradient(30deg, #a093d6a9, #5852a9a9, #113267bb);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 500;
  position: sticky;

  .container {
    padding: 2.2rem;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left {
    flex: 0.3;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

    h2 {
      padding-left: 2px;
    }
    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      &:hover {
        color: #ffff58;
      }
    }
    .image {
      padding-bottom: 8px;
      cursor: pointer;
    }
    img {
      border-radius: 50%;
      height: 60px;
      width: 60px;
    }
    h2 {
      font-weight: 500;
      font-size: 1.2rem;
    }
  }
  /* .center{
    flex: 1;
    padding-bottom: 5px;
  } */
  /* 
  input{
      padding: 8px;
      padding-left: 40px;
      border-radius: 40px;
      height: 25px;
      width: 15rem;
      border: none;
      font-size: 16px;
    } */

  .right {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
    padding-right: 2rem;
    ul {
      display: flex;
      justify-content: space-between;
    }

    li {
      color: white;
      cursor: pointer;
      list-style: none;
      text-transform: uppercase;
      font-weight: 500;
      padding: 0.6rem;
      margin-left: 10px;
    }
  }
  .avatar {
    cursor: pointer;
    margin: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .action {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .account {
    text-transform: capitalize;
    color: white;
    margin-left: 0.5rem;
    &:hover {
      color: #ffff74;
    }
  }
  .cart {
    text-transform: capitalize;
  }
`;
