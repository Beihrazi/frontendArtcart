import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from "../../common/Spinner";
import axiosInstance from "../../newUpdateComponents/axiosInstance";


const EditProduct = ({ product, categories, onClose, fetchDetails }) => {
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: product.name || "",
    price: product.price || "",
    description: product.description || "",
    stock: product.stock || true,
    category: product.category._id || "",
  });

  useEffect(() => {
    setProductData({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      stock: product.stock || true,
      category: product.category._id || "",
    });
  }, [product]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("priductdata: ", productData)

    // Create FormData object to handle file uploads
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("stock", productData.stock);
    formData.append("category", productData.category);

    // Append each image in productImages to formData
    for (let i = 0; i < productImages.length; i++) {
      formData.append("photos", productImages[i]); // 'photos' is the key expected by the backend
    }

    try {
      const response = await axiosInstance.put(
        `/api/seller/product/${product._id}`,
        formData
      );

      console.log("Updated Product:", response.data);
      fetchDetails();
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data?.msg || error.message
      );
      setIsLoading(false);
      // Handle error (e.g., show error message)
    }
  };
  console.log("object: ", productData)

  return (
    <Container>
      <FormSection>
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edit Product
        </h2>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <InputContainer>
            <Label>Product Name</Label>
            <TextInput
              type="text"
              required
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
          </InputContainer>

          <InputContainer>
            <Label>Price</Label>
            <TextInput
              type="number"
              required
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
            />
          </InputContainer>

          <InputContainer>
            <Label>Product Description</Label>
            <Textarea
              required
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            />
          </InputContainer>

          <InputContainer>
            <Label>Product Category</Label>
            <Select
              value={productData.category}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </InputContainer>

          <InputContainer>
            <Button type="submit">Update Product</Button>
          </InputContainer>
          {isLoading && (
            <div className="mt-4">
              <Spinner />
            </div>
          )}
        </form>
      </FormSection>

      <ImageUploadSection>
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Upload Images
        </h2>
        <Label className="mb-2">Product Images (*Select multiple images)</Label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .webp"
          multiple
          onChange={(e) => setProductImages(Array.from(e.target.files))}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="mt-4">
          {productImages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Selected Images:</h3>
              <ul className="list-disc pl-5">
                {productImages.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ImageUploadSection>
    </Container>
  );
};

export default EditProduct;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  max-width: 800px; /* Set a max width for the overall div */
  margin: 0 auto; /* Center the div */
`;

const FormSection = styled.div`
  flex: 1.5; /* Allocate more space to the form section */
  margin-right: 20px;
`;

const ImageUploadSection = styled.div`
  flex: 1; /* Allocate less space to the image upload section */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem; /* Equivalent to text-sm */
  font-weight: 500; /* Equivalent to font-medium */
  line-height: 1.5; /* Equivalent to leading-6 */
  color: #1f2937; /* Equivalent to text-gray-900 */
`;

const TextInput = styled.input`
  display: block;
  width: 100%;
  border-radius: 0.375rem; /* Equivalent to rounded-md */
  border: none;
  padding: 0.375rem 0.5rem; /* Equivalent to py-1.5 */
  color: #1f2937; /* Equivalent to text-gray-900 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  border: 1px solid #d1d5db; /* Equivalent to ring-gray-300 */
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1; /* Equivalent to ring-indigo-600 */
    outline: 2px solid #a5b4fc; /* Equivalent to focus:ring-2 and focus:ring-indigo-600 */
  }
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  border-radius: 0.375rem; /* Equivalent to rounded-md */
  border: none;
  padding: 0.375rem 0.5rem; /* Equivalent to py-1.5 */
  color: #1f2937; /* Equivalent to text-gray-900 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  border: 1px solid #d1d5db; /* Equivalent to ring-gray-300 */
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1; /* Equivalent to ring-indigo-600 */
    outline: 2px solid #a5b4fc; /* Equivalent to focus:ring-2 and focus:ring-indigo-600 */
  }
`;

const Select = styled.select`
  display: block;
  width: 100%;
  border-radius: 0.375rem; /* Equivalent to rounded-md */
  border: none;
  padding: 0.375rem 0.5rem; /* Equivalent to py-1.5 */
  color: #1f2937; /* Equivalent to text-gray-900 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  border: 1px solid #d1d5db; /* Equivalent to ring-gray-300 */
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1; /* Equivalent to ring-indigo-600 */
    outline: 2px solid #a5b4fc; /* Equivalent to focus:ring-2 and focus:ring-indigo-600 */
  }
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  border-radius: 0.375rem; /* Equivalent to rounded-md */
  background-color: #4f46e5; /* Equivalent to bg-indigo-600 */
  padding: 0.375rem 0.75rem; /* Equivalent to px-3 py-1.5 */
  font-size: 0.875rem; /* Equivalent to text-sm */
  font-weight: 600; /* Equivalent to font-semibold */
  color: #fff; /* Equivalent to text-white */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca; /* Equivalent to hover:bg-indigo-500 */
  }

  &:focus-visible {
    outline: 2px solid #6366f1; /* Equivalent to focus-visible:outline */
    outline-offset: 2px; /* Equivalent to focus-visible:outline-offset-2 */
  }
`;
