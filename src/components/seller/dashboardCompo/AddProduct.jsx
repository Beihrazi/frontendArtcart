import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Spinner from "../../common/Spinner";
import axiosInstance from "../../newUpdateComponents/axiosInstance"; // Update with the correct import path

const initialState = {
  name: "",
  price: "",
  description: "",
  inStock: true, // Set default value to true
  category: "",
};

const AddProduct = ({ categories, onClose , fetchDetails}) => {
  console.log("new ",categories)
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("inStock", values.inStock); // Add inStock
      formData.append("category", values.category);

      for (let i = 0; i < productImages.length; i++) {
        formData.append("photos", productImages[i]);
      }
      console.log("formData: ", formData)
      try {
        const response = await axiosInstance.post(
          "/api/seller/product",
          formData
        );
        fetchDetails()
        console.log("Product added successfully:", response.data);
        formik.resetForm();
        setProductImages([]);
        onClose();

      } catch (error) {
        console.error("Error adding product:", error.response?.data?.msg || error.message);
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });
// useEffect(() => {
//     console.log("categories: ",  categories); // Check if categories are received correctly
//   }, [categories]);
  return (
    <Container>
      <FormSection>
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add Product
        </h2>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <InputContainer>
            <Label>Product Name</Label>
            <TextInput
              type="text"
              required
              name="name"
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <Error>{formik.errors.name}</Error>
            ) : null}
          </InputContainer>

          <InputContainer>
            <Label>Price</Label>
            <TextInput
              type="number"
              required
              name="price"
              onChange={(e) => formik.setFieldValue("price", e.target.value)}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <Error>{formik.errors.price}</Error>
            ) : null}
          </InputContainer>

          <InputContainer>
            <Label>Product Description</Label>
            <Textarea
              required
              name="description"
              onChange={(e) => formik.setFieldValue("description", e.target.value)}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <Error>{formik.errors.description}</Error>
            ) : null}
          </InputContainer>

          <InputContainer>
            <Label>Product Category</Label>
            <Select
              name="category"
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (cat) => cat._id === e.target.value
                );
                formik.setFieldValue(
                  "category",
                  selectedCategory ? selectedCategory._id : ""
                );
              }}
              value={formik.values.category}
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
            {formik.touched.category && formik.errors.category ? (
              <Error>{formik.errors.category}</Error>
            ) : null}
          </InputContainer>

          <InputContainer>
            <Button type="submit" disabled={isLoading || formik.isSubmitting}>
              Add Product
            </Button>
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
      </ImageUploadSection>
    </Container>
  );
};

export default AddProduct;

// Styled components
const Error = styled.div`
  color: red; /* Error message color */
  font-size: 0.875rem; /* Equivalent to text-sm */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Stack elements for smaller screens */
  justify-content: center;
  padding: 20px;
  max-width: 800px; /* Set a max width for the overall div */
  margin: 0 auto; /* Center the div */

  @media (max-width: 768px) {
    flex-direction: row; 
    // max-width:400px;
    // padding: 10px;
    // border: 1px solid black;
  }
`;

const FormSection = styled.div`
  flex: 1.5; /* Allocate more space to the form section */
  margin-right: 0; /* Remove margin for small screens */
  margin-bottom: 20px; /* Add spacing between sections for smaller screens */

  @media (max-width: 768px) {
    
    padding: 0 10px;
    margin: 0 20px;
  }
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

const Textarea = styled(TextInput).attrs({ as: 'textarea' })``;

const Select = styled.select`
  display: block;
  width: 100%;
  border-radius: 0.375rem; /* Equivalent to rounded-md */
  border: none;
  padding: 0.375rem 0.5rem; /* Equivalent to py-1.5 */
  color: #1f2937; /* Equivalent to text-gray-900 */
  background-color: #fff;
  border: 1px solid #d1d5db; /* Equivalent to ring-gray-300 */
  transition: border-color 0.2s;

  &:focus {
    border-color: #6366f1; /* Equivalent to ring-indigo-600 */
    outline: 2px solid #a5b4fc; /* Equivalent to focus:ring-2 and focus:ring-indigo-600 */
  }
`;

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem; /* Equivalent to px-4 py-2 */
  border-radius: 0.375rem; /* Equivalent to rounded-md */
  border: none;
  background-color: #2563eb; /* Equivalent to bg-blue-600 */
  color: #ffffff; /* Equivalent to text-white */
  font-weight: 600; /* Equivalent to font-semibold */
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #93c5fd; /* Equivalent to bg-blue-300 */
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #1d4ed8; /* Equivalent to bg-blue-700 */
  }
`;
