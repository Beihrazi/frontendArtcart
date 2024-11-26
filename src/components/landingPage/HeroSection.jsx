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

    .hero-section {
        height: 60vh;
        display: flex;
        flex-wrap: wrap; /* Allow flex items to wrap on smaller screens */
    }

    .hero-content {
        flex: 1;
        padding: 30px 20px 0; /* Adjust padding for smaller screens */
    }

    h1 {
        line-height: 1.3;
        font-weight: 700;
        text-transform: capitalize;
        width: 95%;
        font-size: 2rem;
        margin-bottom: 50px;
        color: #f3f8f8;
    }

    ul {
        display: flex;
        flex-direction: column;
        text-align: left;
        justify-content: center;
        width: 100%; /* Full width on smaller screens */
    }

    li {
        padding-left: 10px;
        font-size: 18px; /* Slightly smaller font for smaller screens */
        font-weight: 450;
        margin-bottom: 12px;
        color: #fbfefe;
    }

    .hero-image {
        background: url('https://res.cloudinary.com/dogqxtc6j/image/upload/v1730717059/uploads/ek2kam2asrecjps71jrt.jpg') center/cover;
        flex: 1.5;
        height: 70vh;
        border: none;
        box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.5);
        border-radius: 2px;
    }

    /* Responsive styles */
    @media (max-width: 1024px) {
        .hero-section {
            flex-direction: column; /* Stack content vertically */
            align-items: center; /* Center items */
        }

        .hero-content {
            padding: 20px 15px;
            text-align: center; /* Center align text on smaller screens */
        }

        h1 {
            font-size: 1.8rem; /* Slightly smaller font size */
        }

        .hero-image {
            height: 40vh; /* Reduce height for smaller screens */
            width: 100%; /* Full width for smaller screens */
            margin-top: 20px; /* Add spacing */
        }
    }

    @media (max-width: 768px) {
        height: 60%;

        .hero-image{
            display:none;
        }
        
        h1 {
            font-size: 1.5rem; 
        }

        ul {
            width: 100%; /* Full width for smaller screens */
        }

        li {
            font-size: 16px; /* Adjust font size for readability */
        }

        .hero-image {
            height: 30vh; /* Further reduce height for very small screens */
        }
    }

    @media (max-width: 480px) {
        .hero-content {
            padding: 10px; /* Reduce padding for extra small screens */
        }

        h1 {
            font-size: 1.2rem; /* Smaller font size for extra small screens */
        }

        .hero-image {
            height: 25vh; /* Further adjust height */
        }
    }
`;
