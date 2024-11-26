import styled from 'styled-components'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { sliderItems } from './data'




const SliderSection = () => {
    const [sildeIndex, setSlideIndex] = useState()
    const handleClick = (direction) => {
        if(direction === "left"){
            setSlideIndex(sildeIndex > 0 ? sildeIndex-1 : 2)
        }else{
            setSlideIndex(sildeIndex < 2 ? sildeIndex +1 : 0)
        }
    }

  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <ArrowLeftOutlined />
        </Arrow>
        <Wrapper sildeIndex={sildeIndex}>
            {sliderItems.map((item) =>(
            <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
                <Image src= {item.img} />
            </ImgContainer>
            <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}
                </Desc>
                <Button>Shop Now</Button>
            </InfoContainer>
            </Slide>
           ))}
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlined />
        </Arrow>
    </Container>
  ) 
}

export default SliderSection

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5));

  @media (max-width: 768px) {
    height: 60vh;  
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);  /* Center vertically */
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;

  @media (max-width: 768px) {
    top: 50%;  
    transform: translateY(-50%);  
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${props => props.sildeIndex * -100}vw);
  transition: all 1.5s ease;

  @media (max-width: 768px) {
    transform: translateX(${props => props.sildeIndex * -100}vw); 
  }
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${props => props.bg};

  @media (max-width: 768px) {
    height: 100%;  
`;

const ImgContainer = styled.div`
  background-image: linear-gradient(155deg, rgba(239, 234, 220, 0.5), rgba(33, 31, 31, 0.5), rgba(41, 8, 5, 0.852));
  height: 100%; /* Full height to fill the container */
  flex: 1;
  display: flex;
  justify-content: center;  
  align-items: center;  

  @media (max-width: 768px) {
    height: 100%;  
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%; 
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;  
    height: 100%; 
    //  transform: translateY(-20%);  
     padding-bottom:0px;
    object-fit: cover; 
  }
`;

const InfoContainer = styled.div`
  flex: 0.5;
  padding: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(155deg, rgba(239, 234, 220, 0.5), rgba(33, 31, 31, 0.5), rgba(41, 8, 5, 0.852)), url('./images/background.jpg');
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    display: none;  /* Hide the info container on mobile */
  }
`;

const Title = styled.h1`
  font-size: 50px;
  color: #f2ecec;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 30px; /* Adjust font size for mobile */
  }
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  color: #ffffffc6;
  width: 80%;

  @media (max-width: 768px) {
    font-size: 16px;  /* Adjust font size for mobile */
    margin: 20px 0;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  color: #e7e1d3;
  border: 2px solid #eb6f0a;

  @media (max-width: 768px) {
    font-size: 16px; /* Adjust button size for mobile */
  }
`;
