import { useState } from "react";
import styled from "styled-components";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextError from "./TextError";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../reduxToolkit/features/authSlice";

// Initial form values
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Email Required").email("Invalid Email Format"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Determine the role based on the current path
  const currentRole = location.pathname.includes("seller")
    ? "seller"
    : location.pathname.includes("admin")
    ? "admin"
    : "users";

  // Handle form submission
  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`,
        values
      );
      console.log("data: ", res.data);
      if (res.data.token) {
        localStorage.setItem("jwttoken", res.data.token);

        // Redirect based on user role
        switch (res.data.role) {
          case "customer":
            navigate("/"); // Redirect customers to products
            dispatch(login(true));
            break;
          case "seller":
            navigate("/seller");
            // Redirect sellers to their dashboard
            break;
          case "admin":
            navigate("/admin"); // Redirect admins to their dashboard
            break;
          default:
            toast.error("Unknown role");
        }
      } else {
        toast.success(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <div className="imageSection">
          <div className="content">
            <h1>Join the largest artwork community</h1>
            <p id="content-p">
              Get free access to millions of pieces of art, showcase, promote,
              sell & share your work with other members in the ArtWork
              Community.
            </p>
          </div>
        </div>

        <div className="registrationSection">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <h2 className="title">Log In</h2>
              <p>
                Become an ArtWork.{" "}
                <NavLink to={`/${currentRole}/register`} className="log-in">
                  Join
                </NavLink>
              </p>
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component={TextError} />
              </div>

              <button type="submit">
                {loading ? <CircularProgress size={20} /> : "Login"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;

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

      max-height: 150px;
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
      font-size: 25px;
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
