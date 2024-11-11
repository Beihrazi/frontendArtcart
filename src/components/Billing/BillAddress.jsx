import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { addressData } from "./addressData";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAddressId,
  updateBillingAddress,
  updateCustomerDetails,
} from "../../reduxToolkit/features/productList/BillingAddressSlice";
// import { addAddress } from "../../apiCalls/users/addAddress";
import { useNavigate } from "react-router-dom";
import {
  fetchBillingData,
  insertBilling,
  updateBilling,
} from "../../reduxToolkit/features/productList/BillingSlice";
import store from "../../reduxToolkit/app/store";

const BillAddress = ({setNextButtonDisabled,nextButtonDisabled,handleDeliverClick,
}) => {

  const dispatch = useDispatch();

  const selectedAddressIdFromRedux = useSelector(
    (state) => state.billingAddress.addressId
  );
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const billAddId = useSelector((store) => store.billingAddress.addressId);
  const handleAddressSelection = (id) => {
    console.log("selected address id ", id);
    dispatch(updateAddressId(id));
    setSelectedAddressId(id);
  };

  const initialValues = {
    pincode: "",
    locality: "",
    street: "",
    city: "",
    state: "",
    landmark: "",
  };

  //Updated - 06/11/24
  useEffect(() => {
    dispatch(fetchBillingData());
  }, []);

 
  // const addressData = useSelector((store) => store.auth.currentUser.address);
  // const token = useSelector((store) => store.auth.token);

  const validationSchema = yup.object({
    street: yup.string().required("Address is required"),
    city: yup.string().required("City/District/Town is required"),
    state: yup.string().required("State is required"),
    locality: yup.string().required("locality is required"),
    pincode: yup
      .string()
      .required("Pincode is required")
      .length(6, "Pincode must be 6 digits"),
  });

  const onSubmitSecondPart = (values) => {
    console.log("address data ", values);
    dispatch(insertBilling(values));
  };

  const onSubmit2 = (values) => {
    console.log("personal data: ", values)
    dispatch(updateBilling(values))
  };

  const [expandedAddresses, setExpandedAddresses] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  // console.log("object: ", expandedAddresses)
  
  const handleEditButtonClick = (address) => {
    const newExpandedAddresses = { ...expandedAddresses };
    const addressId = address._id; 
  
    if (expandedAddresses[addressId]) {
      // If the accordion is already expanded, close it
      delete newExpandedAddresses[addressId];
      setSelectedAddress(null); // Reset selected address
    } else {
      // If the accordion is not expanded, expand it
      newExpandedAddresses[addressId] = true;
      setSelectedAddress(address); // Set the selected address
    }
    setExpandedAddresses(newExpandedAddresses);
  };
  

  const handleCancelClick = () => {
    // Close the accordion when cancel is clicked
    setExpandedAddresses({});
    setSelectedAddress(null); // Reset selected address
  };
  // const userAddress = useSelector(
  //   (state) => state.billingAddress.billingAddresses
  // );

  const initialValues2 = selectedAddress
    ? {
        street: selectedAddress.street,
        city: selectedAddress.city,
        state: selectedAddress.state,
        landmark: selectedAddress.landmark || "",
        pincode: selectedAddress.pincode || "",
        locality: selectedAddress.locality || "",
      }
    : {};

  const data = useSelector((store) => store.billingAddress.billingInfo)
  
  const initialValues3 = {
    name:  data?.name || "",
    contact:  data?.contact || "",
    altContact:  data?.altContact || "",
  };
  const validationSchema3 = yup.object({
    name: yup.string().required("Name is required"),
    contact: yup
      .string()
      .required("Contact number is required")
      .matches(/^[0-9]+$/, "Contact number must only contain digits")
      .min(10, "Contact number must be at least 10 digits"),
    // alternateContact: yup.string()
    //     .required('Contact number is required')
  });

  // const user = useSelector((store)=>store.auth.isLoggedIn)
  // console.log("user: ", user)
  const billingData = useSelector((store) => store.billingAddress.billingInfo);
  // console.log("billing data from billaddress: ", billingData)
  
  // console.log("address: ", billingData.address.map((ad)=> ad))

  return (
    <Wrapper>
      <Container>
        <div className="person-address">
          {/* first-part */}
          {billingData?.address?.length > 0 && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Delivery Address
              </AccordionSummary>
              <AccordionDetails>
                <FormControl component="fieldset" style={{ width: "100%" }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={selectedAddressId}
                    onChange={(event) =>
                      handleAddressSelection(event.target.value)
                    }
                  >
                    {billingData.address.map((add) => (
                        <div key={add._id} style={{ marginBottom: "1rem" }}>
                      
                            <div
                              key={add._id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "1rem",
                              }}
                            >
                              <FormControlLabel
                                value={add._id}
                                control={
                                  <Radio
                                    checked={add._id === selectedAddressId}
                                  />
                                }
                                label={`${add.landmark || "No Landmark"}, ${
                                  add.city
                                }, ${add.state} - ${add.pincode}`}
                                style={{ width: "calc(100% - 100px)" }}
                              />
                              {!expandedAddresses[add._id] && (
                                <Button
                                  variant="contained"
                                  onClick={() => handleEditButtonClick(add)}
                                  style={{ marginRight: "1rem" }}
                                >
                                  Edit
                                </Button>
                              )}
                            </div>
              
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                {expandedAddresses[selectedAddress?._id] && (
                  <Accordion>
                    <AccordionDetails>
                      <div className="billing-address">
                        <Formik
                          initialValues={initialValues2}
                          validationSchema={validationSchema}
                          onSubmit={onSubmit2}
                        >
                          {({ errors, touched, isSubmitting }) => (
                            <Form>
                              <div className="form-control">
                                {/* address-detail */}
                                <div className="address-bar">
                                  <div className="thirdrow">
                                    <Field
                                      name="street"
                                      as={TextField}
                                      id="outlined-multiline-static"
                                      label="street (Area and Streets)"
                                      multiline
                                      rows={3}
                                      fullWidth
                                      error={
                                        touched.street && !!errors.street
                                      }
                                      helperText={
                                        touched.street && errors.street
                                      }
                                    />
                                  </div>
                                  <div className="fourthrow">
                                    <div className="pcity">
                                      <Field
                                        name="city"
                                        as={TextField}
                                        id="outlined-basic"
                                        label="City/District/Town"
                                        variant="outlined"
                                        style={{
                                          width: "18rem",
                                          marginTop: ".5rem",
                                        }}
                                        error={touched.city && !!errors.city}
                                        helperText={touched.city && errors.city}
                                      />
                                    </div>

                                    <div
                                      className="pstate"
                                      style={{ position: "relative" }}
                                    >
                                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-helper-label">
                                          State
                                        </InputLabel>
                                        <Field
                                          name="state"
                                          as={Select}
                                          labelId="demo-simple-select-helper-label"
                                          id="demo-simple-select-helper"
                                          style={{
                                            width: "17.5rem",
                                          }}
                                          error={
                                            touched.state && !!errors.state
                                          }
                                        >
                                          <MenuItem value={"madhya Pradesh"}>
                                            Madhya Pradesh
                                          </MenuItem>
                                          <MenuItem value={"assam"}>
                                            Assam
                                          </MenuItem>
                                          <MenuItem value={"mizoram"}>
                                            Mizoram
                                          </MenuItem>
                                          <MenuItem value={"meghalaya"}>
                                            Meghalaya
                                          </MenuItem>
                                        </Field>
                                      </FormControl>
                                      <FormHelperText
                                        error={
                                          !!(touched.state && errors.state)
                                        }
                                        style={{ margin: "-7px 15px" }}
                                      >
                                        <ErrorMessage name="state" />
                                      </FormHelperText>
                                    </div>
                                  </div>

                                  <div className="fifthrow">
                                    <div className="plandmark">
                                      <Field
                                        name="landmark"
                                        as={TextField}
                                        id="outlined-basic"
                                        label="Landmark (Optional)"
                                        variant="outlined"
                                        style={{
                                          width: "18rem",
                                        }}
                                      />
                                    </div>
                                    <div className="ppincode">
                                      <Field
                                        name="pincode"
                                        as={TextField}
                                        id="outlined-number"
                                        label="Pincode"
                                        type="number"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        style={{
                                          width: "18rem",
                                        }}
                                        error={
                                          touched.pincode && !!errors.pincode
                                        }
                                        helperText={
                                          touched.pincode && errors.pincode
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="sixthhrow">
                                    <div className="plocality">
                                      <Field
                                        name="locality"
                                        as={TextField}
                                        id="outlined-basic"
                                        label="Locality"
                                        variant="outlined"
                                        style={{
                                          width: "18rem",
                                        }}
                                        error={
                                          touched.locality && !!errors.locality
                                        }
                                        helperText={
                                          touched.locality && errors.locality
                                        }
                                      />
                                    </div>
                                    <Button
                                      type="submit"
                                      variant="contained"
                                      disabled={isSubmitting}
                                      style={{
                                        width: "14rem",
                                        height: "2.6rem",
                                        marginTop: "1rem",
                                        backgroundColor: "green",
                                        color: "white",
                                      }}
                                    >
                                      Save and deliver here
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      style={{
                                        width: "14rem",
                                        height: "2.6rem",
                                        marginTop: "1rem",
                                        marginLeft: "1rem",
                                        color: "black",
                                      }}
                                      onClick={handleCancelClick}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )}
              </AccordionDetails>
            </Accordion>
          )}

          {/* Second-part */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Create New Address
            </AccordionSummary>
            <AccordionDetails>
              <div className="billing-address">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmitSecondPart}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <div className="form-control">
                        {/* address-detail */}
                        <div className="address-bar">
                          <div className="thirdrow">
                            <Field
                              name="street"
                              as={TextField}
                              id="outlined-multiline-static"
                              label="street (Area and Streets)"
                              multiline
                              rows={3}
                              fullWidth
                              error={touched.street && !!errors.street}
                              helperText={touched.street && errors.street}
                            />
                          </div>
                          <div className="fourthrow">
                            <div className="pcity">
                              <Field
                                name="city"
                                as={TextField}
                                id="outlined-basic"
                                label="City/District/Town"
                                variant="outlined"
                                style={{
                                  width: "18rem",
                                  marginTop: ".5rem",
                                }}
                                error={touched.city && !!errors.city}
                                helperText={touched.city && errors.city}
                              />
                            </div>

                            <div
                              className="pstate"
                              style={{ position: "relative" }}
                            >
                              <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">
                                  State
                                </InputLabel>
                                <Field
                                  name="state"
                                  as={Select}
                                  labelId="demo-simple-select-helper-label"
                                  id="demo-simple-select-helper"
                                  style={{
                                    width: "17.5rem",
                                  }}
                                  error={touched.state && !!errors.state}
                                >
                                  <MenuItem value={"madhya Pradesh"}>
                                    Madhya Pradesh
                                  </MenuItem>
                                  <MenuItem value={"assam"}>Assam</MenuItem>
                                  <MenuItem value={"mizoram"}>Mizoram</MenuItem>
                                  <MenuItem value={"meghalaya"}>
                                    Meghalaya
                                  </MenuItem>
                                </Field>
                              </FormControl>
                              <FormHelperText
                                error={!!(touched.state && errors.state)}
                                style={{ margin: "-7px 15px" }}
                              >
                                <ErrorMessage name="state" />
                              </FormHelperText>
                            </div>
                          </div>

                          <div className="fifthrow">
                            <div className="plandmark">
                              <Field
                                name="landmark"
                                as={TextField}
                                id="outlined-basic"
                                label="Landmark (Optional)"
                                variant="outlined"
                                style={{
                                  width: "18rem",
                                }}
                              />
                            </div>
                            <div className="ppincode">
                              <Field
                                name="pincode"
                                as={TextField}
                                id="outlined-number"
                                label="Pincode"
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                style={{
                                  width: "18rem",
                                }}
                                error={touched.pincode && !!errors.pincode}
                                helperText={touched.pincode && errors.pincode}
                              />
                            </div>
                          </div>
                          <div className="sixthhrow">
                            <div className="plocality">
                              <Field
                                name="locality"
                                as={TextField}
                                id="outlined-basic"
                                label="Locality"
                                variant="outlined"
                                style={{
                                  width: "18rem",
                                }}
                                error={touched.locality && !!errors.locality}
                                helperText={touched.locality && errors.locality}
                              />
                            </div>
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={isSubmitting}
                              style={{
                                width: "14rem",
                                height: "2.6rem",
                                marginTop: "1rem",
                                backgroundColor: "green",
                                color: "white",
                              }}
                            >
                              Save and deliver here
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Different-section */}
          {/* personal-detail */}
          <Formik
            initialValues={initialValues3}
            enableReinitialize={true}
            validationSchema={validationSchema3}
            onSubmit={(values) => {
              // Handle form submission
              console.log(values);
              dispatch(updateBilling(values))
              handleDeliverClick(); // Call the handleDeliverClick function
            }}
          >
            {({ handleSubmit, touched, errors }) => (
              <form onSubmit={handleSubmit}>
                <div className="person-detail">
                  <div className="firstrow">
                    <div className="pname">
                      <Field
                        name="name"
                        as={TextField}
                        id="name"
                        label="Name"
                        variant="outlined"
                        style={{
                          width: "18rem",
                          marginTop: ".5rem",
                        }}
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </div>
                    <div className="pcontact">
                      <Field
                        name="contact"
                        as={TextField}
                        id="contact"
                        label="10-digit mobile number"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        style={{
                          width: "18rem",
                          marginTop: ".5rem",
                        }}
                        error={touched.contact && !!errors.contact}
                        helperText={touched.contact && errors.contact}
                      />
                    </div>
                  </div>
                  <div className="secondrow">
                    <div className="palternate-contact">
                      <Field
                        name="altContact"
                        as={TextField}
                        id="altContact"
                        label="Alternate mobile number"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        style={{
                          width: "18rem",
                          marginTop: "1rem",
                        }}
                        error={
                          touched.altContact && !!errors.altContact
                        }
                        helperText={
                          touched.altContact && errors.altContact
                        }
                      />
                    </div>
                  </div>
                </div>
                {billAddId !== 0 && (
                  <Button
                    variant="contained"
                    type="submit3"
                    disabled={nextButtonDisabled}
                    style={{
                      width: "14rem",
                      height: "2.6rem",
                      marginTop: "1.5rem",
                      marginLeft: "0rem",
                      backgroundColor: "orange",
                    }}
                  >
                    deliver here
                  </Button>
                )}
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </Wrapper>
  );
};

export default BillAddress;
const Wrapper = styled.div`
  padding: 0.2rem 1rem;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;

  .person-detail {
    border-radius: 15px;
    border: 1px solid lightgrey;
    padding: 2rem;
    margin-top: 1rem;
  }
  .address-bar {
    /* border: 1px solid black; */

    padding: 1rem 2rem;
  }
  #number {
    color: red;
    font-size: 1.2rem;
  }
  .count {
    font-size: 1.2rem;
    color: green;
    font-weight: 500;
  }
  /* border: 1px solid black; */
  .billing-address {
    flex: 0.8;
    /* border: 1px solid black; */
  }
  .price-detail {
    flex: 0.5;
    border: 1px solid black;
    width: 200px;
    height: 350px;

    h2 {
      text-align: center;
      border-bottom: 1px dotted grey;
    }
  }
  .form-control {
    padding: 1rem;
  }
  .firstrow {
    /* border: 1px solid black; */
    height: 5.2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .secondrow {
    /* border: 1px solid black; */
    height: 5.4rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .thirdrow {
    height: 8rem;
  }
  .fourthrow {
    height: 5.4rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .fifthrow {
    margin-top: 10px;
    height: 5.4rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .pname {
  }
  .pcontact {
  }
  .mini-container {
    padding: 0 2rem;
    align-items: center;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
  }
  .first {
    margin-top: 1rem;
  }
  .desc1 {
    display: flex;
    align-items: center;
  }
  .no {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
