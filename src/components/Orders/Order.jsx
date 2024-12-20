import { useEffect, useState } from "react";
import styled from "styled-components";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axiosInstance from "../newUpdateComponents/axiosInstance";

const Order = () => {
  
  //   {
  //     orderId: "12345",
  //     courierName: "DHL",
  //     deliveryStatus: "SHIPPED",
  //     products: [
  //       {
  //         productQuantity: 2,
  //         amount: 1000,
  //         productId: {
  //           photos: ["product-image-url.jpg"],
  //           name: "Sample Product1 Name",
  //         },
  //       },
  //       {
  //         productQuantity: 2,
  //         amount: 1000,
  //         productId: {
  //           photos: ["product-image-url.jpg"],
  //           name: "Sample Product2 Name",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     orderId: "12346",
  //     courierName: "FedEx",
  //     deliveryStatus: "ON THE WAY",
  //     products: [
  //       {
  //         productQuantity: 1,
  //         amount: 500,
  //         productId: {
  //           photos: ["product-image-url2.jpg"],
  //           name: "Sample Product3 Name",
  //         },
  //       },
  //     ],
  //   },
  // ];

  const [orders, setOrders] = useState([]); // Using the local data for now

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/api/users/order");
      console.log("res: ", res.data.data);
      setOrders(res.data.data || []);
    } catch (error) {
      console.log(
        "error fetching orders: ",
        error.response?.data?.msg || error.message
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Left>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Order Status
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="processing"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="processing"
                control={<Radio />}
                label="Delivered"
              />
              <FormControlLabel
                value="delivered"
                control={<Radio />}
                label="On the way"
              />
            </RadioGroup>
          </FormControl>
        </Left>
        <Right>
          {/* Order Products */}
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div className="product-container" key={index}>
                {order.products.map((product, productIndex) => (
                  <div key={productIndex} className="product-item">
                    <>
                      {/* Render Product Image */}
                      <div className="image">
                        <img
                          src={product.productId.photos[0]}
                          alt={product.productId.name}
                        />
                      </div>

                      <div className="title">
                        <p className="pname">
                          {product.productId.name.length > 20
                            ? product.productId.name.slice(0, 35) + ".."
                            : product.productId.name}
                        </p>
                        <p className="orderId">
                          OrderId: <span className="OId">{order._id}</span>
                        </p>
                        <p className="orderId">
                          Quantity:{" "}
                          <span className="OId">{product.quantity}</span>
                        </p>
                        <p className="courier">
                          Total Amount:{" "}
                          <span className="cId">{product.amount}</span>
                        </p>
                      </div>

                      <div className="status">
                        <p>Status</p>
                        <span
                          className="statusId"
                          style={{
                            backgroundColor:
                              product.status === "Order_Placed"
                                ? "#ffcc00" // Yellow for "Order Placed blue#1E90FF"
                                : product.status === "Processing"
                                ? "#ffa500" // Orange for "Processing"
                                : "#0edb1c", // Green for "Delivered"
                          }}
                        >
                          {product.status === "Order_Placed"
                            ? "Order Placed"
                            : product.status === "Processing"
                            ? "Processing"
                            : "Delivered"}
                        </span>

                        <span className="date">
                          Order Date:{" "}
                          {new Date().toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </Right>
      </Container>
    </Wrapper>
  );
};

export default Order;

const Wrapper = styled.div`
  min-height: 60vh;
  padding: 2rem 5rem;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Container = styled.section`
  padding-top: 1rem;
  display: flex;
  gap: 4rem;
  min-height: 50vh;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically */
    gap: 2rem;
  }
`;

const Left = styled.div`
  border: 1px solid #03112099;
  border-radius: 20px;
  flex: 0.2;
  padding-left: 2rem;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
  display:none;
    flex: 1; /* Take full width */
    padding-left: 1rem;
  }
`;

const Right = styled.div`
  border: 1px solid #2003034b;
  border-radius: 10px;
  flex: 0.8;
  padding: 1rem;

  .product-container {
    border: 1px solid #03112099;
    border-radius: 10px;
    margin-top: 1.5rem;
    padding: 10px;

     @media (max-width: 768px) {
     
      // border:1px solid black;
      margin: 0 25px 15px;
    }
  }
  .pname {
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 16px;

   
  }

  .product-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column; /* Stack items vertically */
      align-items: flex-start;
    }
  }

  .image {
    height: 120px;
    flex: 0.4;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    @media (max-width: 768px) {
      height: 100px;
    }
  }

  .courier {
    margin-top: 20px;

    @media (max-width: 480px) {
      margin-top: 10px;
    }
  }

  .title {
    flex: 0.7;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    font-size: 15px;

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  .status {
    flex: 0.5;
    border-left: 1px solid #079724;
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: 768px) {
      border-left: none;
      padding-left: 0;
    }
  }

  .OId {
    font-weight: 600;
    font-size: 14px;

    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  .statusId {
    background-color: #09c63c;
    margin-top: 0.5rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 25px;
    border-radius: 10px;

    @media (max-width: 480px) {
      width: 100px;
      height: 20px;
      font-size: 12px;
    }
  }

  .date {
    margin-top: 1rem;
    font-size: 0.9rem;

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;
