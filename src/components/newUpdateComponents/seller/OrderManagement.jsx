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
      setOrders(res.data.order); // Assuming the orders array is under res.data.order
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
  padding: 20px 80px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-weight: 600;
  text-Transform: uppercase;
  font-size: 20px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  background-color: #007bff;
  color: white;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
`;

const StatusSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s;

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
