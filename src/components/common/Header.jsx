import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="left">
          <div className="image">
            <img src="../public/images/logo.jpg" alt="logo-image"></img>
          </div>
          <h2>ArtCart</h2>
        </div>
        <div className="center">
          <div className="search-bar">
            <input placeholder="Search" />
          </div>
        </div>
        <div className="right">
          <ul>
            <li>About</li>

            <li>
              <StyledLink to="/seller/register">Become a Seller</StyledLink>
            </li>
            <li>
              <StyledLink to="/login">Login</StyledLink>
            </li>
            <li>Cart</li>
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
  background: linear-gradient(30deg, #978ad3a9, #2452a0ee);

  .container {
    padding: 2.2rem;

    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left {
    flex: 0.7;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

    .image {
      padding-bottom: 8px;
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
  .center {
    flex: 1;
    padding-bottom: 5px;
  }

  input {
    padding: 8px;
    padding-left: 40px;
    border-radius: 40px;
    height: 25px;
    width: 15rem;
    border: none;
    font-size: 16px;
  }

  .right {
    display: flex;
    flex: 1;

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
`;
