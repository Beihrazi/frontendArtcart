import { Button, Rating } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../reduxToolkit/features/productList/WishListSlice";
import Lottie from "react-lottie";
import animationData from "./Animation - 1713385936637.json";
import { addToCart } from "../../reduxToolkit/features/productList/CartSlice";
import store from "../../reduxToolkit/app/store";

const WishList = () => {
  const [itemToDelete, setItemToDelete] = useState(null);
  // const [value, setValue] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  // console.log("wishlist: ", wishlistItems)
  const dispatch = useDispatch();

  // console.log("cart store: ", store.getState().cart.cartItems);

  const CustomModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <ModalOverlay>
        <ModalContent>
          <p>Are you sure you want to delete?</p>
          <ModalButtons>
            <Button
              className="yes"
              variant="outlined"
              style={{
                backgroundColor: "green",
                color: "white",
              }}
              onClick={onConfirm}
            >
              yes
            </Button>

            <Button
              variant="outlined"
              style={{
                backgroundColor: "red",
                color: "white",
              }}
              onClick={onCancel}
            >
              No
            </Button>
          </ModalButtons>
        </ModalContent>
      </ModalOverlay>
    );
  };
  const handleDelete = () => {
    console.log("Deleting item with ID:", itemToDelete);
    dispatch(removeFromWishList(itemToDelete));
    setModalOpen(false);
    toast.success("Selected Item removed.");
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Lottie JSON object
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // const handleAddToCart = (product) => {
  //     const selectedProduct = useSelector(state => state.product.products.find(item => item.id === product.id))
  //     dispatch(addToCart(selectedProduct));
  // }
  const addToBag = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    // const productId = product.id;
    dispatch(addToCart(product));
    toast.success("Item added to cart Successfully");
  };
  const handleClick = () => {
    window.scrollTo({ top: 10, behavior: "smooth" });
  };
  const handlePreventClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Wrapper>
      <UpperSection>
        <div className="wishlist">
          <h1>My WishList</h1>
          <p>{wishlistItems.length} items</p>
        </div>
        <StyledLink>
          <div className="continue">
            <NavLink
              to="/products"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <span id="continuelink">
                <ArrowBackIosIcon /> continue Shopping
              </span>
            </NavLink>
          </div>
        </StyledLink>
      </UpperSection>

      {/* Item Section */}
      <DownSection>
        <div className="container">
          <div className="grid">
            <Toaster position="top-center" reverseOrder={false} />
            {/* dynamic items */}
            {wishlistItems.length === 0 ? (
              <>
                <div className="nameless"></div>
                <div className="empty">
                  <span id="tag">Your wishList is empty!</span>
                  <Lottie options={defaultOptions} height={400} width={400} />
                </div>
              </>
            ) : (
              wishlistItems.map((item) => (
                <NavLink
                  key={item.product._id}
                  to={`/product/${item.product._id}`}
                  className="W-link"
                  onClick={handleClick}
                >
                  <div key={item.product._id} className="item">
                    <div
                      className="remove"
                      onClick={(e) => handlePreventClick(e)}
                    >
                      <CancelIcon
                        onClick={() => {
                          setItemToDelete(item.product._id);
                          setModalOpen(true);
                        }}
                      />
                      <CustomModal
                        isOpen={modalOpen}
                        // itemId={item.product.id}
                        onCancel={handleCancel}
                        onConfirm={handleDelete}
                      />
                    </div>
                    <div className="image">
                      <img
                        src={item.product.photos[0]}
                        alt={item.product.name}
                      />
                    </div>
                    <div className="content">
                      <div className="miniContainer">
                        <div className="dp">
                          <img src="/images/profile.png" alt="profile" />
                        </div>
                        <div className="subContent">
                          <div className="title">{item.product.name}</div>
                          <div className="price">
                            <img src="/images/ruppee.png" />
                            {item.product.price}
                          </div>
                        </div>
                      </div>
                      <span id="author">{item.product.category.name}</span>
                      <div className="rate">
                        {/* <Rating
                          className="star"
                          size="small"
                          name="simple-controlled"
                          value={item.product?.reviews}
                          readOnly
                        />
                        ({item.product?.reviews}) */}
                      </div>
                      <Button
                        variant="contained"
                        style={{
                          marginLeft: "1rem",
                          width: "90%",
                          height: "3rem",
                          marginTop: "1.5rem",
                          backgroundColor: "black",
                        }}
                        onClick={(e) => addToBag(item.product, e)}
                      >
                        Move to bag
                      </Button>
                    </div>
                  </div>
                </NavLink>
              ))
            )}
          </div>
        </div>
      </DownSection>
    </Wrapper>
  );
};

export default WishList;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  .yes {
    margin-right: 1rem;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Wrapper = styled.section`
  position: relative;
`;
const UpperSection = styled.div`
  height: 120px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    .wishlist {
      // border: 1px solid black;
      margin-top: 50px;
    }
  }

  .wishlist {
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .continue {
    position: absolute;
    top: 2rem;
    left: 4rem;
  }
  #continuelink {
    display: flex;
    justify-content: center;
  }
`;
const StyledLink = styled.div``;
const DownSection = styled.div`
  border: 1px solid black;
  padding: 1rem;
  min-height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    #tag {
      font-weight: 500;
      padding-right: 3rem;
    }
  }
  .container {
    /* border: 1px solid black; */
    // padding: 2rem 5rem;
    margin: 1rem;
    // border: 1px solid green;
    width: 80%;
    display: flex;
    justify-content: center;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  .W-link {
    text-decoration: none;
    color: black;
  }
  .item {
    border: 1px solid black;
    height: 400px;
    overflow: hidden;
    border-radius: 5%;
    position: relative;
    padding: 10px;
  }
  .remove {
    border: 1px solid black;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    border-radius: 50%;
    height: 2.2rem;
    width: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    opacity: 80%;
    cursor: pointer;
  }
  .content {
    /* border: 1px solid black; */
  }
  .image {
    padding: auto 1rem;
    height: 50%;
    /* border: 1px solid black; */
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  .miniContainer {
    display: flex;
    /* border: 1px solid black; */
    padding-top: 1rem;
  }
  .dp {
    flex: 0.2;
    padding-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 25px;
      width: 25px;
    }
  }
  .subContent {
    flex: 1;
    gap: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  .title {
    font-weight: 540;
    font-size: 14px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  .price {
    width: 30%;
    margin-right: 2px;
    color: green;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
    font-size: 16px;

    @media (max-width: 768px) and (min-width:470px){
      font-size: 14px;
      img{
        display: none;
      }
    }
  }
  .price > img {
    padding-right: 5px;
    height: 12px;
    width: 10px;
    @media (max-width:460px){
      img{
        display: none;
      }
    }
  }
  .star {
    padding-left: 10px;
  }
  #author {
    font-weight: 500;
    font-size: 14px;
    text-transform: lowercase;
    padding-left: 20%;
  }
  // .rate {
  //   padding-top: 10px;
  //   padding-left: 3rem;

  //   @media (max-width: 768px) {
  //     .rate{
  //       display: hidden;
  //     }
  //   }
  // }

  @media (max-width: 768px) and (min-width: 470px) {
    padding: 1rem;
    img{

    }
    .item {
      height: 300px;
    }
    .dp {
      img {
        height: 18px;
        width: 18px;
      }
    }
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
