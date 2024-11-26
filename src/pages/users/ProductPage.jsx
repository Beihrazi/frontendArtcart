import { useEffect } from "react";
import Header from "../../components/common/Header";
import Footer2 from "../../components/common/Footer2";
import Products from "../../components/users/Products";
import { useDispatch} from "react-redux";


import styled from "styled-components";
import { fetchCategories } from "../../reduxToolkit/features/productList/ProductSlice";

const ProductPage = () => {
  const dispatch = useDispatch() 
 
  useEffect(() => {
    dispatch(fetchCategories())
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });


  }, [dispatch]);
  return (
    <Wrapper>
      <Header />
      <Products />
      <Footer2 />
    </Wrapper>
  );
};

export default ProductPage;
const Wrapper = styled.div`
  background-size: cover;
  background-position: center;
`