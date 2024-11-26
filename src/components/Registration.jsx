import React, { useState } from "react";
import styled from "styled-components";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const initialValues = {
  email: "",
  password: "",
};

const Registration = () => {
  const [loading, setLoading] = useState(false);

  // Determine the role based on the URL
  const isSeller = window.location.href.includes('/seller/register');
  const isAdmin = window.location.href.includes('/admin/register');

  const onSubmit = (values) => {
    setLoading(true);
    values["role"] = isSeller ? "seller" : isAdmin ? "admin" : "customer";
  
    const endpoint = isSeller
      ? `${import.meta.env.VITE_BASE_URL}/api/seller/register`
      : isAdmin
      ? `${import.meta.env.VITE_BASE_URL}/api/admin/register`
      : `${import.meta.env.VITE_BASE_URL}/api/users/register`;
  
    axios
      .post(endpoint, values)
      .then((res) => {
        toast.success(res.data.message || "Registration successful!");
      })
      .catch((error) => {
        // Check if the error response contains a specific message
        if (error.response && error.response.data && error.response.data.msg) {
          toast.error(error.response.data.msg); // Display backend error message
        } else {
          toast.error("Registration failed!"); // Default error message
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  const validationSchema = Yup.object({
    email: Yup.string().required("Email Required").email("Invalid Email Format"),
    password: Yup.string().required("Password Required").min(8, "Password must be at least 8 characters"),
  });

  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <div className="imageSection">
          <div className="content">
            <h1>Join the largest artwork community</h1>
            <p id="content-p">
              Get free access to millions of pieces of art, showcase, promote, sell & share your work with others.
            </p>
          </div>
        </div>

        <div className="registrationSection">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              <h2 className="title">Join ArtWork</h2>
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-control">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? <CircularProgress size={20} /> : "Submit"}
              </button>

              <p>
                Already a member?{" "}
                <NavLink className="log-in" to={isSeller ? "/seller/login" : (isAdmin ? "/admin/login" : "/users/login")}>
                  Log in
                </NavLink>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default Registration;

const Wrapper = styled.div`
  
  height: auto;
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.365), rgba(0, 0, 0, 0.5)),
    url("https://res.cloudinary.com/dogqxtc6j/image/upload/v1730841799/nature_fn4vu8.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 90%;
    max-width: 900px;
    height: auto;
    min-height: 670px;
    background-color: white;
    display: flex;
    flex-direction: row;
  }

  .imageSection {
    flex: 1;
    background-image: linear-gradient(rgba(0, 0, 0, 0.486), rgba(0, 0, 0, 0.42)),
      url("https://res.cloudinary.com/dogqxtc6j/image/upload/v1730841842/ship_a2o3tq.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
  }

  .content {
    margin: 30px;
    height: 60%;
  }

  h1 {
    width: 80%;
    font-size: 40px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 1.2;
    color: #fff;
    margin-bottom: 30px;
  }

  #content-p {
    font-size: 20px;
    color: #fdfdfde5;
  }

  .registrationSection {
    background: #f8f8fef3;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 0px;
    border-radius: 1px solid black;
  }

  .title {
    color: #320808;
    font-weight: bold;
    font-size: 35px;
  }

  label {
    font-size: 18px;
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
  }

  input[type="password"],
  input[type="email"] {
    display: block;
    width: 300px;
    padding: 6px 12px;
    font-size: 16px;
    line-height: 1.4;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .form-control {
    margin-bottom: 20px;
  }

  button {
    width: 100%;
    height: 40px;
    background-color: #18a021;
    border: 1px solid #ccc;
    color: white;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .log-in {
    font-weight: bold;
    color: #26c029;
    text-decoration: none;
  }

  .error {
    color: red;
  }

  // Responsive styles
  @media (max-width: 1024px) {
    .container {
      width: 80%;
      // min-width: 400px;
      flex-direction: column;
      height: auto;
      min-height: 400px;
    }

    .imageSection {
      height: 300px;
    }

    .registrationSection {
      padding: 40px 20px;
    }

    h1 {
      font-size: 32px;
    }

    #content-p {
      font-size: 18px;
    }

    input[type="password"],
    input[type="email"] {
      width: 90%;
    }

    button {
      width: 90%;
    }
  }

  @media (max-width: 767px) {
    .container {
      width: 95%;
      max-width: 400px;
    }

    #content-p {
      font-size: 14px;
    }
    h1 {
      font-size: 20px;
    }
    .title {
      font-size: 20px;
      margin-bottom:10px;
    }
    p {
      font-size: 16px;
    }

    input[type="password"],
    input[type="email"],
    button {
      width: 100%;
    }
  }
`;
