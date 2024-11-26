import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Categories = ({ data }) => {
  return (

    <Wrapper>
      <Title>Featured Category</Title>
      <Container>
        {data.map((item, index) => (
          <GridItem key={index}
            className={`grid-item item${index + 1}`}
            style={{ backgroundImage: `url(${item.img})` }}>

            <Link to={`/products/${item.cat}`} />
            <button>{item.cat}</button>
            
          </GridItem>
        ))}
      </Container>
    </Wrapper>
  )
}

export default Categories

const Container = styled.div`
  min-height: 75%;
  min-height:450px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  padding: 20px 100px;
  

  .grid-item {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    button {
      text-transform: uppercase;
      height: 35px;
      width: 110px;
      background: linear-gradient(
        rgba(59, 59, 58, 0.692),
        rgba(0, 0, 0, 0.3)
      );
      color: #ccdfd6;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      transition: box-shadow 0.3s ease;

      &:hover {
        box-shadow: 0px 4px 8px rgba(80, 80, 80, 0.4);
      }
    }
  }

  .item1 {
    grid-row: 1 / span 2;
  }
  .item3 {
    grid-column: 3;
    grid-row: 1 / span 2;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    padding: 20px 50px;

    .item1,
    .item3 {
      grid-row: auto;
      grid-column: auto;
    }
  }

  @media (max-width: 768px) {
    // grid-template-columns: 1fr;
    padding: 20px 40px;
    
    // border: 1px solid white;
    
    .grid-item {
      font-size: 20px;
      padding: 10px;

      button {
        height: 30px;
        width: 90px;
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 10px;
    gap: 5px;

    .grid-item {
      font-size: 16px;

      button {
        height: 28px;
        width: 85px;
        font-size: 0.8rem;
      }
    }
  }
`;

const Wrapper = styled.section`
  background-image: linear-gradient(
    to top,
    rgba(78, 77, 77, 0.041),
    rgba(0, 0, 0, 0.495),
    rgba(14, 1, 1, 0.687)
  );
  height: auto;
  min-height: 80vh;

  @media (max-width: 768px) {
    min-height: 60vh;
  }

  @media (max-width: 480px) {
    min-height: 50vh;
  }
`;

const GridItem = styled.div`
  border: 1px solid #d8ce6fb8;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 7px 8px rgba(53, 244, 200, 0.7);
  }

  @media (max-width: 768px) {
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    border-radius: 4px;
  }
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  height: auto;
  padding-top: 20px;
  font-size: 2rem;
  text-transform: capitalize;
  color: #e9fdf5;
  font-weight: 560;
  margin: 1rem 1rem 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 0.5rem;
  }
`;
