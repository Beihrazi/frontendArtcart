import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer2 from "../common/Footer2";
import Header from "../common/Header";
import AddProduct from "./dashboardCompo/AddProduct";
import NewOrders from "./dashboardCompo/NewOrders";
import ViewAllOrders from "./dashboardCompo/ViewAllOrders";
import ManageProducts from "./dashboardCompo/ManageProducts";
import SellerRegistration from "./SellerRegistration";
import { useDispatch, useSelector } from "react-redux";
import SellerNav from "./SellerNav";
import { getAllCategoriesFromBackend } from "../../apiCalls/admin/getAllCategoriesFromBackend";

const buttons = [
  { name: "Complete your profile", type: "button", id: "complete-profile" },
  { name: "Add Product", type: "button", id: "add-product" },
  { name: "Orders", type: "button", id: "new-orders" },
  { name: "Manage Products", type: "button", id: "manage-products" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const [btID, setBtID] = useState("complete-profile");
  const [showMessage, setShowMessage] = useState(false);
  
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.name === null) {
      setBtID("complete-profile");
    } else if (!currentUser.approved) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [currentUser]);

  useEffect(() => {
    getAllCategoriesFromBackend(dispatch);
  }, [dispatch]);

  const handleClick = (e) => {
    setBtID(e.target.id);
  };

  return (
    <>
      <SellerNav />
      {showMessage ? (
        <AlertMessage>
          Please wait until admin approved your request
        </AlertMessage>
      ) : (
        <div className="p-32 pt-8">
          <div className="con1">
            <div>
              {currentUser.approved &&
                buttons.map((button) => (
                  <Button
                    key={button.id}
                    id={button.id}
                    type={button.type}
                    onClick={handleClick}
                  >
                    {button.name}
                  </Button>
                ))}
            </div>
            <VerticalLine />
            <div className="secondSec">
              {btID === "complete-profile" && <SellerRegistration />}
              {btID === "add-product" && <AddProduct />}
              {btID === "new-orders" && <NewOrders />}
              {/* Uncomment when needed */}
              {/* {btID === "all-orders" && <ViewAllOrders />} */}
              {btID === "manage-products" && <ManageProducts />}
            </div>
          </div>
        </div>
      )}
      <Footer2 />
    </>
  );
};

export default Dashboard;

const AlertMessage = styled.div`
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  color: #374151;
  padding: 1rem;
  border-radius: 0.375rem;
  margin: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #4f46e5;
  color: white;
  margin: 0.75rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4338ca;
  }
`;

const Wrapper = styled.section`
  overflow-y: scroll;
  height: 98vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('./public/images/nature.jpg');
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;

  .con1 {
    height: 700px;
    display: flex;
  }

  .secondSec {
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;
    margin: 30px;
    width: 1150px;
  }
`;

const VerticalLine = styled.div`
  border-left: 3px solid #333;
  height: 70%;
  margin-top: 70px;
`;
