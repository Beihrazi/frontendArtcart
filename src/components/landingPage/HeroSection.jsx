import React, { useEffect } from 'react'
import styled from 'styled-components'

const HeroSection = () => {
   
  return (
    <Wrapper>
      <div className="container" id='refer'>
        <div className="hero-section" >
            <div className="hero-content" >
                <h1>Discover the endless possibilities of Artcart's unique marketplace</h1>
                <ul style={{ listStyleType: 'circle' }}>
                    <li>Artcart connects buyers and sellers, providing a platform for art enthusiasts to buy and sell their creations.</li>
                    <li>Find the perfect artwork for your collection</li>
                    <li>Sell your art to a global audience</li>
                    <li>Connect with fellow artists and art lovers</li>
                </ul>
            </div>
            <div className="hero-image">
            </div>
        </div>
       
      </div>
    </Wrapper>
  )
}

export default HeroSection

const Wrapper = styled.section`
    border-top: 1px solid #d5b851;
    height: 80vh;
    
    margin: auto 5%;
    padding: 40px 30px;


    .hero-section{
        height: 60vh;
        display: flex;
        
    }
    .hero-content{
       flex: 1;
        padding: 30px 70px 0;
    }
    h1{ 
        line-height: 1.3;
        font-weight: 700;
        text-transform: capitalize;
        width: 95%;
        font-size: 2rem;
        margin-bottom: 50px;
        color: #f3f8f8;
        
    }
    ul{ 
        display: flex;
        flex-direction: column;
        text-align: left;
        justify-content: center;
        width: 80%;
    }
    li{
        padding-left: 10px;
        font-size: 20px;
        font-weight: 450;
        margin-bottom: 12px;
        color: #fbfefe;
    }
    .hero-image{
        background: url('https://res.cloudinary.com/dogqxtc6j/image/upload/v1730717059/uploads/ek2kam2asrecjps71jrt.jpg') center/cover;
        flex: 1.5;
        height: 70vh;
        
        border: 1px solid black;
        border: none;
        box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.5);
        border-radius: 2px;
    }

    //service-section

`