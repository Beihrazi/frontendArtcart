import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../axiosInstance";
import toast, { Toaster } from "react-hot-toast";



const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/api/seller/orders");
      console.log("Fetched orders: ", res.data);
      setOrders(res.data.orders); // Assuming the orders array is under res.data.order
    } catch (error) {
      setError("Error fetching orders: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle status change
  const handleStatusChange = (productId, orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              products: order.products.map((product) =>
                product.productId._id === productId
                  ? { ...product, status: newStatus }
                  : product
              ),
            }
          : order
      )
    );
  };

  const handleSave = async (productId, orderId, status) => {
    try {
      const res = await axiosInstance.put(`/api/seller/orders/${orderId}`, {
        status: status,
        productId: productId,
      });
      console.log("Order management: ", res.data);
      toast.success("Order status updated successfully!");
    } catch (error) {
      console.log(error.response.data?.msg || error.response);
      toast.error("Couldn't update order status");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={true} />
      <Title>Orders Management</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Customer Name</TableHeader>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) =>
            order.products.map((product) => (
              <TableRow key={product._id}>
                {/* Customer Name for each product */}
                <TableCell>{order.userName}</TableCell>
                {/* Product Name */}
                <TableCell>{product.productId?.name}</TableCell>
                {/* Quantity */}
                <TableCell>{product.quantity}</TableCell>
                {/* Amount */}
                <TableCell>${product.amount}</TableCell>
                {/* Status */}
                <TableCell>
                  <StatusSelect
                    value={product.status} // Correct the status here
                    onChange={(e) =>
                      handleStatusChange(product.productId._id, order._id, e.target.value)
                    }
                  >
                    <option value="Order_Placed">Order Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                  </StatusSelect>
                </TableCell>
                {/* Action (Save button) */}
                <TableCell>
                  <ActionButton
                    action="save"
                    onClick={() => handleSave(product.productId._id, order._id, product.status)} // Corrected here
                  >
                    Update
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderManagement;



const Container = styled.div`
  padding: 20px 40px; /* Adjust padding for smaller screens */
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    
    // border:1px solid black;
    padding: 0 10px;
    margin-bottom:10px;
  }
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 15px; 
    margin: 10px;

  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 14px; /* Smaller font size for better readability on smaller screens */

  @media (max-width: 768px) {
    width:120px;
    font-size: 10px; 
  }
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 10px; /* Adjust padding for smaller screens */
  background-color: #007bff;
  color: white;
  text-align: left;

  @media (max-width: 768px) {
    padding: 12px; 
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px; /* Adjust padding for smaller screens */
  text-align: center;

  @media (max-width: 768px) {
    // border: 1px solid black;
     padding: 6px; 
   
  }
`;

const StatusSelect = styled.select`
    padding: 4px; /* Reduced padding */
  font-size: 12px; /* Smaller font size for responsiveness */
  border-radius: 4px; /* Slightly rounded corners */
  border: 1px solid #ccc;
  width: 100%; /* Ensure it takes full width of its container */
  max-width: 150px; /* Restrict maximum width to avoid overflow */
  text-align: center;

  @media (max-width: 768px) {
    font-size: 10px; 
    max-width: 120px; 
  }
`;

const ActionButton = styled.button`
  padding: 5px 8px; /* Adjust padding for smaller screens */
  margin: 0 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 12px; /* Adjust font size for smaller screens */
  transition: background-color 0.3s;

  @media (min-width: 768px) {
    padding: 5px 10px; /* Restore padding for medium and larger screens */
    font-size: 14px; /* Restore font size for medium and larger screens */
  }

  ${({ action }) =>
    action === "save" &&
    `
    background-color: #28a745;

    &:hover {
      background-color: #218838;
    }
  `}

  ${({ action }) =>
    action === "delete" &&
    `
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  `}
`;
