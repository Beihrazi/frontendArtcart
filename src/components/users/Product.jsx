import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Button,
  CircularProgress,
  LinearProgress,
  Rating,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import BoltIcon from "@mui/icons-material/Bolt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ImageProduct from "./ImageProduct";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reduxToolkit/features/productList/CartSlice";
import toast, { Toaster } from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  // console.log("id from param", id);
  const items = useSelector((state) =>
    state.product.products.find((product) => product._id === id)
  );

  // console.log("item ", items);

  // const {title, rating, brand, description, price,images} = singleproduct;
  const { name } = items || {};

  const [value, setValue] = React.useState(2);

  const navigate = useNavigate();
  const selectedProduct = useSelector((state) =>
    state.product.products.find((product) => product._id === id)
  );
  console.log(selectedProduct);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    toast.success("successfully added to cart");
    dispatch(addToCart(selectedProduct));
  };

  const handleBuyNow = () => {
    dispatch(addToCart(selectedProduct));
    navigate("/billing");
  };
  return (
    <Wrapper>
      <Routing>
        <span id="home">Home </span> / product / {name}
      </Routing>
      {items ? (
        <Container>
          <div className="product-container">
            {/* image-section */}
            <ImageProduct data={items} />

            {/* content-section */}
            <div className="content-section">
              <div className="content-container">
                <div className="dp-section">
                  <img src="/images/profile.png" alt="profile" />
                </div>
                <div className="info">
                  <h1>{items.name}</h1>
                  <span id="author">~ {items.seller.name}</span>
                  <br />
                  <div className="cat">
                    <span className="cat2"> {items.category.name}</span>
                  </div>
                  {/* <div className="date">
                    Order Date: {new Date(items.orderDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                  </div> */}
                  {/* <div className="rating">
                    <Rating name="read-only" value={items?.rating} readOnly /> (
                    {items?.rating})
                  </div> */}
                  <div className="price">
                    <CurrencyRupeeIcon
                      style={{
                        color: "green",
                        height: "1.2rem",
                      }}
                    />
                    {items.price}
                  </div>
                </div>
              </div>
              <div className="action-container">
                <div className="add-to-cart">
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                    <Toaster position="top-center" reverseOrder={true} />
                  </Button>
                </div>
                <div className="buy">
                  <Button
                    style={{width: 155}}
                    variant="outlined"
                    color="success"
                    onClick={handleBuyNow}
                    startIcon={<BoltIcon />}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
              <div className="description-container"><h2 style={{fontWeight: 600, marginBottom: 5}}>Description -</h2>{items.description}</div>
            </div>
          </div>
        </Container>
      ) : (
        <LinearProgress />
      )}
    </Wrapper>
  );
};

export default Product;

const Wrapper = styled.section`
  height: auto;
`;

const Routing = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 20px 8%;
  background-image: linear-gradient(
    50deg,
    rgba(228, 219, 219, 0.046),
    rgba(245, 232, 117, 0.575),
    rgba(109, 156, 226, 0.553)
  );
  text-transform: uppercase;

  #home {
    color: #042b5e;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 15px 5%;
    font-size: 0.9rem;
  }
`;

const SWrapper = styled.div`
  width: 70%;
  margin: 10px auto;
  padding: 20px 0;

  .card {
    height: 500px;
  }
  .card > img {
    height: 100%;
    width: 98%;
    object-fit: cover;
  }

  .slick-slider {
    .slick-arrow {
      z-index: 100;
      height: 9%;
      width: 5%;
      border-radius: 50%;
      background-color: #dfeca1b9;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    .card {
      height: 400px;
    }
  }

  @media (max-width: 480px) {
    .card {
      height: 300px;
    }
    .slick-slider .slick-arrow {
      height: 6%;
      width: 4%;
    }
  }
`;

const Container = styled.section`
  padding: 5% 8%;

  .product-container {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    height: 650px;
  }

  .image-section {
    flex: 1;
    border: 1px solid black;
  }

  .current-image {
    display: flex;
    justify-content: center;
    img {
      width: 90%;
      object-fit: cover;
    }
  }

  .content-section {
    flex: 0.6;
    height: 90%;
    border-radius: 15px;
    border: 1px solid #caa886;
  }

  .content-container {
    height: 200px;
    display: flex;
    justify-content: space-between;
    padding-left: 1rem;
  }

  .dp-section {
    img {
      height: 25%;
      width: 50%;
    }
    flex: 0.2;
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }

  .info {
    flex: 1;
    padding-top: 1.8rem;

    h1 {
      font-weight: 550;
      font-size: 1.2rem;
    }
  }

  #author {
    margin-top: 3rem;
  }

  .cat {
    margin-top: 1rem;
  }

  .cat2 {
    color: #0b707e;
    font-weight: 500;
  }

  .action-container {
    height: 10%;
    padding: 8px 80px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .description-container {
    border-top: 1px solid black;
    border-top-color: #aeb7b7;
    padding: 20px 20px;
    margin: 10px 20px;
  }

  .date {
    padding-top: 10px;
  }

  .rating {
    display: flex;
    align-items: center;
    padding-top: 15px;
  }

  .price {
    color: #11b00e;
    padding-top: 10px;
    text-transform: uppercase;
    font-weight: 500;
    display: flex;
    font-size: 1.2rem;
    align-items: center;
  }

  @media (max-width: 1024px) {
    .product-container {
      flex-direction: column;
      height: auto;
    }
    .image-section {
      height: auto;
      img {
        width: 100%;
      }
    }
    .content-section {
      height: auto;
    }
    .action-container {
      flex-direction: column;
      padding: 8px 20px;
    }
  }

  @media (max-width: 768px) {
    padding: 10%;
  
    .action-container {
    height:100px;
    padding: 12px;
    
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

    .product-container {
      gap: 30px;
    }

    .content-container {
      flex-direction: column;
      align-items: flex-start;
    }

    .dp-section img {
      height: 20%;
      width: 40%;
    }

    .info h1 {
      font-size: 1rem;
    }

    .price {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 5% 3%;

    .product-container {
      gap: 15px;
    }

    .action-container {
      padding: 8px 10px;
    }

    .description-container {
      padding: 15px;
      margin: 5px 10px;
    }

    .price {
      font-size: 0.9rem;
    }
  }
`;
