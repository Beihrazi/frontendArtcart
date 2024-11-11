import React, { useState } from "react";
import styled from "styled-components";

const ImageProduct = ({ data }) => {

  const [curImage, setImage] = useState(0);
  const handleImageClick = (index) => {
    setImage(index);
  };
  console.log("curImage index: ", curImage)
  console.log("image product", data);
  return (
    <Wrapper>
      {data ? (
        <Container>
          <div className="main-screen">
            <div className="main-figure">
              <img src={data.photos[curImage]} alt={data.name} />
            </div>
          </div>

          <div className="grid-cols">
            {data.photos.map((url, index) => (
              <div
                className="figure"
                key={index}
                onClick={() => handleImageClick(index)}
              >
                <img src={url} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

export default ImageProduct;

const Container = styled.div``;

const Wrapper = styled.section`
  display: flex;
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  .main-screen {
    display: flex;
    flex: 1;
    padding: 10px;
    justify-content: center;
    overflow: hidden;
    /* margin-bottom: 13%; */
  }
  .main-figure {
    height: 300px;
  }
  .main-figure > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    box-shadow: 0px 5px 8px rgba(25, 76, 98, 0.468);
  }
  
  .grid-cols {
    border-radius: 8px;
    background-image: linear-gradient(-150deg, rgba(223, 186, 209, 0.041),rgba(220, 203, 193, 0.068), rgba(196, 175, 105, 0.338));
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 10px 10%;
    gap: 10px;
    margin-top: 5%;
  }
  .figure {
  height: 80%;
  padding: 10px;
  /* Add shadow */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Adjust values as needed */
  /* Or add border */
  border: 2px solid transparent; /* Transparent border by default */
}

.figure:hover {
  /* Adjust shadow or border on hover */
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4); /* Example shadow on hover */
  border-color: #e2e596; /* Example border color on hover */
}
  .figure > img {
    cursor: pointer;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  
`;
