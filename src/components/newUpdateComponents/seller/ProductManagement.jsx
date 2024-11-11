import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal"; // Import your Modal component
import AddProduct from "../../seller/dashboardCompo/AddProduct"; // Assuming this is your existing form component
import EditProduct from "../../seller/dashboardCompo/EditProduct"; // Import the EditProduct component
import axiosInstance from "../axiosInstance";
import toast, { Toaster } from "react-hot-toast";


const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // State to hold the product being edited
  const [categories, setCategories] = useState([])
  // const [counter, setCounter] = useState(false)

  const fetchDetails = async() =>{
    try {
      const category = await axiosInstance.get('/api/seller/category')
      // console.log("categories: ", category.data)
      
      setCategories(category.data)
      console.log("categories after update: ", category.data)
      const response2 = await axiosInstance.get('/api/seller/product')
      // console.log("product: ", response2.data)
      setProducts(response2.data)
      
    } catch (error) {
      toast.error(error.response?.data?.msg);
      // console.error(error.response?.data?.msg || error.message);
    }
  }



  useEffect(()=>{
    
    fetchDetails()
  },[])

 
  const handleAddProductClick = async() => {
    setCurrentProduct(null); // Clear current product for adding
    setIsModalOpen(true);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product); // Set the current product to edit
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = async (id) => {
    const response=await axiosInstance.delete(`/api/seller/product/${id}`);
    await fetchDetails()
  };
  // useEffect(()=>{
  //   console.log("updated category: ", categories)
  // }, [categories])
  console.log("products: ",products)

  return (
    
    <Container>
      <LeftSection>
        <Button onClick={handleAddProductClick}>Add Product</Button>
      </LeftSection>

      <Toaster position="top-center" reverseOrder={false} />

      <RightSection>
        <h2>Product Details</h2>
        <Table>
          <thead>
            <tr>
              <TableHeader>Product Name</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Stock</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead><tbody>
      {products.length > 0 ? (
        products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </TableCell>
            <TableCell>
              <ActionButton action="edit" onClick={() => handleEdit(product)}>
                Edit
              </ActionButton>
              <ActionButton action="delete" onClick={() => handleDelete(product._id)}>
                Delete
              </ActionButton>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan="5" style={{ textAlign: 'center' }}>
            No products available
          </TableCell>
        </TableRow>
      )}
    </tbody>
        </Table>
      </RightSection>

      {/* Modal for Adding or Editing Product */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {currentProduct ? (
            <EditProduct 
            product={currentProduct} 
            categories={categories}
            onClose={handleCloseModal} 
            fetchDetails = {fetchDetails}
            />
          ) : (
            <AddProduct 
            categories={categories}
            fetchDetails = {fetchDetails}
            onClose={handleCloseModal} />
          )}
        </Modal>
      )}
    </Container>
  );
};

export default ProductManagement;

const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  width: 30%;
  padding: 10px 15px;
  border-right: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSection = styled.div`
  width: 70%;
  padding: 10px 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
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
    action === "edit" &&
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
