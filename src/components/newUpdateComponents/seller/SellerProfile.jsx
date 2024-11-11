import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axiosInstance from '../axiosInstance';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  contact: "",
  profileDp: null,
  aadhaarDoc: null,
  aadhaarNo: "",
};

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  profileDp: Yup.mixed().required("Profile image is required"),
  aadhaarDoc: Yup.mixed().required("Aadhaar document is required"),
  aadhaarNo: Yup.string()
    .matches(/^[0-9]{12}$/, "Aadhaar number must be 12 digits")
    .required("Aadhaar number is required"),
});

const onSubmit = async (values, { setSubmitting }, navigate) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("contact", values.contact);
  formData.append("aadhaarNo", values.aadhaarNo);
  formData.append("profileDp", values.profileDp); // File
  formData.append("aadhaarDoc", values.aadhaarDoc); // File

  try {
    const res = await axiosInstance.post('/api/seller/profile', formData);
    toast.success(res.data?.msg || "Profile updated successfully");
    
    // Navigate to seller page on success
    navigate("/seller"); // Replace "/seller" with the actual path
  } catch (error) {
    toast.error(error.response?.data?.msg || "Form submission failed");
  } finally {
    setSubmitting(false); // Stop loading indicator
  }
};

const SellerProfile = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers, navigate)}
      >
        {({ setFieldValue, isSubmitting }) => (
          <StyledForm>
            <label htmlFor="name">Name</label>
            <StyledField name="name" placeholder="Enter your name" />
            <StyledErrorMessage name="name" component="div" />

            <label htmlFor="contact">Phone Number</label>
            <StyledField name="contact" placeholder="Enter phone number" />
            <StyledErrorMessage name="contact" component="div" />

            <label htmlFor="profileDp">Profile Image</label>
            <input
              id="profileDp"
              name="profileDp"
              type="file"
              onChange={(event) =>
                setFieldValue("profileDp", event.currentTarget.files[0])
              }
            />
            <StyledErrorMessage name="profileDp" component="div" />

            <label htmlFor="aadhaarDoc">Aadhaar Document</label>
            <input
              id="aadhaarDoc"
              name="aadhaarDoc"
              type="file"
              onChange={(event) =>
                setFieldValue("aadhaarDoc", event.currentTarget.files[0])
              }
            />
            <StyledErrorMessage name="aadhaarDoc" component="div" />

            <label htmlFor="aadhaarNo">Aadhaar Number</label>
            <StyledField name="aadhaarNo" placeholder="Enter Aadhaar number" />
            <StyledErrorMessage name="aadhaarNo" component="div" />

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default SellerProfile;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f7fafc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledField = styled(Field)`
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: #e53e3e;
  font-size: 0.875rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  border: none;
  color: #ffffff;
  background-color: #4a5568;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d3748;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;
