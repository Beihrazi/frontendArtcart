import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /* Smaller container height */
  gap: 40px; /* Increased spacing between boxes */
`;

const Box = styled.div`
  width: 250px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor || "#4CAF50"};
  border-radius: 12px;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.08);
  }
`;

const SellerBody = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box bgColor="#FF5722" onClick={() => navigate("/seller/products")}>
        Product Management
      </Box>

      <Box bgColor="#2196F3" onClick={() => navigate("/seller/orders")}>
        Order Management
      </Box>
    </Container>
  );
};

export default SellerBody;
