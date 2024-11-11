import React, { useEffect } from "react";
import Header from "../common/Header";
import HeroSection from "./HeroSection";
import Footer from "../common/Footer";
import SliderSection from "./SliderSection";
import Categories from "./Categories";
import { categories1 } from "./data";
import Services from "./Services";
import Footer2 from "../common/Footer2";
import FeaturedProducts from "./FeaturedProducts";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../reduxToolkit/features/productList/ProductSlice";

const LandingPage = () => {
  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.product)
  // console.log("Products from slice: ", products)
  
  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])

  return (
    <Wrapper>
      <Header />
      <SliderSection />
      <Categories data={categories1} />
      <Services />
      <HeroSection />
      <FeaturedProducts />
      <Footer2 />
    </Wrapper>
  );
};

export default LandingPage;
const Wrapper = styled.div`
  background-image: linear-gradient(
      130deg,
      rgba(27, 2, 10, 0.671),
      rgba(44, 75, 100, 0.852)
    ),
    url("https://res.cloudinary.com/dogqxtc6j/image/upload/v1730841259/background_mprabz.jpg");
  background-size: contain;
  background-position: center;
`;
