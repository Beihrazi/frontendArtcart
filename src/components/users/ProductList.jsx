import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { FavoriteOutlined } from "@mui/icons-material";
import {
  addToWishList,
  clearToastMessage,
} from "../../reduxToolkit/features/productList/WishListSlice";
import toast, { Toaster } from "react-hot-toast";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const ProductList = ({ currentProducts }) => {
  
  const selectedProducts = useSelector((state) => state.product.products);
  const product = useSelector((state) => state.product);
  // console.log(product);
  
  const dispatch = useDispatch();

  const toastMessage = useSelector((state) => state.wishlist.toastMessage);
  // console.log("category store: ", store.getState().product.categories)
  
  useEffect(() => {
    if (toastMessage) {
      if (toastMessage.type === "added") {
        toast.success(toastMessage.text);
      } else if (toastMessage.type === "removed") {
        toast.error(toastMessage.text);
      }
      // Clear toast message after displaying
      dispatch(clearToastMessage());
    }
    // Clear toast message on unmount
  }, [dispatch, toastMessage]);

  const handleFavoriteClick = (_id, event) => {
    event.preventDefault();
    event.stopPropagation();
    //finding individual item
    const product = selectedProducts.find((product) => product._id === _id);
    dispatch(addToWishList({ product, quantity: 1 }));
  };

  //color
  const [clickedProducts, setClickedProducts] = useState([]);

  const handleColorClick = (productId) => {
    const newClickedProducts = [...clickedProducts]; // Create a copy
    const productIndex = newClickedProducts.indexOf(productId);

    if (productIndex !== -1) {
      // Remove product from clicked state if already clicked
      newClickedProducts.splice(productIndex, 1);
    } else {
      // Add product to clicked state if not clicked yet
      newClickedProducts.push(productId);
    }

    setClickedProducts(newClickedProducts);
  };

  const wishlistColor = useSelector((state) => state.wishlist.items);
  // const wishlistStore = useSelector((store) => store.items)
  // console.log("wishlistColor store: ", wishlistStore);

  // console.log("categories: ", getCategories)
  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      {product.loading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {!product.loading && product.products.length
        ? currentProducts.map((p) => {
            // console.log("current product ", p.id);
            return (
              <NavLink
                key={p._id}
                to={`/product/${p._id}`}
                className="grid-item-link"
              >
                <GridItem className={`grid-items`}>
                  <div
                    className="wish"
                    onClick={(event) => handleFavoriteClick(p._id, event)}
                  >
                    <FavoriteOutlined
                      style={{
                        color: wishlistColor.some(
                          (item) => item.product._id === p._id
                        )
                          ? "crimson"
                          : "lightgray",
                      }}
                      onClick={() => handleColorClick(p._id)}
                    />
                  </div>
                  <div className="image">
                    <img src={p.photos[0]} alt={p.name}></img>
                  </div>
                  <div className="content">
                    
                    <div className="miniContainer">
                      <div className="dp">
                        <AccountCircleIcon/>
                      </div>
                      <div className="subContent">
                        <div className="title">
                          {p.name.length > 20
                            ? `${p.name.slice(0, 18)}..`
                            : p.name}
                        </div>
                        <div className="price">
                          <CurrencyRupeeIcon
                            style={{
                              color: "black",
                              height: "1rem",
                            }}
                          />
                          {p.price}
                        </div>
                      </div>
                    </div>
                    <span id="author">{p.seller.name}</span>
                    <p id="category">{p.category.name}</p>
                  </div>
                </GridItem>
              </NavLink>
            );
          })
        : null}
    </Container>
  );
};

export default ProductList;

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 80%;
  grid-gap: 20px 10px;
  margin-top: 18px;

  .grid-item-link {
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: flex-start;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    height: auto;
    
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    // border:1px solid black;
    .grid-item-link{
        // border:1px solid black;
        display:flex;
        justify-content:center;
    }
  }
`;

const GridItem = styled.div`
  background-image: linear-gradient(
    to top,
    rgb(255, 254, 254),
    rgba(249, 238, 220, 0.84),
    rgba(247, 236, 220, 0.674)
  );
  
  border: 1px solid #8f7f68;
  border-radius: 15px;
  height: 330px;
  &:hover {
    box-shadow: 0px 8px 10px rgba(229, 142, 12, 0.813);
  }
  width: 85%;
  position: relative;

  .wish {
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
    opacity: 95%;
    cursor: pointer;
  }

  .image {
    height: 70%;
    padding-top: 10px;
  }
  img {
    height: 80%;
    width: 100%;
    object-fit: contain;
  }
  .miniContainer {
    display: flex;
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
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  .title {
    font-weight: 540;
    font-size: 12px;
  }
  .price {
    width: 30%;
    margin-right: 2px;
    color: green;
    font-weight: bold;
    font-size: 14px;
  }
  .price > img {
    padding-right: 5px;
    height: 12px;
    width: 10px;
  }
  .star {
    padding-left: 10px;
  }
  #author {
    font-weight: 500;
    font-size: 13px;
    padding-left: 20%;
  }
  #category {
    font-weight: 600;
    padding-left: 20%;
    font-size: 14px;
    text-transform: uppercase;
    color: #82400b;
  }

  @media (max-width: 1024px) {
    height: 280px;
    width: 90%;
    .title {
      font-size: 11px;
    }
    .price {
      font-size: 13px;
    }
    #author, #category {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    
    height: 350px;
    width: 70%;
    .title {
      font-size: 10px;
    }
    .price {
      font-size: 12px;
    }
    #author, #category {
      font-size: 11px;
    }
  img {
    height: 90%;
  }
  .title {
    font-weight: 500;
    font-size: 15px;
  }
  .price {
    width: 30%;
    font-weight: bold;
    font-size: 15px;
  }
  
  #author {
    font-weight: 500;
    font-size: 13px;
  }
  #category {
    font-weight: 600;
    padding-left: 20%;
    font-size: 14px;
    text-transform: uppercase;
    color: #82400b;
  }

  }

  @media (max-width: 480px) {
    height: auto;
    width: 100%;
    .wish {
      height: 1.8rem;
      width: 1.8rem;
    }
    .price {
      font-size: 11px;
    }
    #author, #category {
      font-size: 10px;
      padding-left: 10%;
    }
  }
`;

