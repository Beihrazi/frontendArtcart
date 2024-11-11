import Login from "./components/Login.jsx";
import Registration from "./components/Registration";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminBody from "./components/admin/AdminBody.jsx";
import ProductCategories from "./components/admin/ProductCategories.jsx";
import ManageSeller from "./components/admin/ManageSeller.jsx";
import RequiredAuth from "./components/newUpdateComponents/RequiredAuth.jsx";
import Unauthorized from "./components/newUpdateComponents/Unauthorized.jsx";

import SellerProfile from "./components/newUpdateComponents/seller/SellerProfile.jsx";
import SellerProtectedRoute from "./components/newUpdateComponents/seller/SellerProtectedRoute.jsx";
import SellerDashboard from "./components/newUpdateComponents/seller/SellerDashboard.jsx";
import SellerBody from "./components/newUpdateComponents/seller/SellerBody.jsx";

import AddProduct from "./components/seller/dashboardCompo/AddProduct.jsx";
import ProductManagement from "./components/newUpdateComponents/seller/ProductManagement.jsx";
import OrderManagement from "./components/newUpdateComponents/seller/OrderManagement.jsx";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import WishList from "./components/users/WishList.jsx";
import WishListPage from "./pages/users/WishListPage.jsx";
import Product from "./components/users/Product.jsx";
import ProductPage from "./pages/users/ProductPage.jsx";
import SingleProduct from "./pages/users/SingleProduct.jsx";
import CartPage from "./pages/users/CartPage.jsx";
import OrderPage from "./components/Orders/OrderPage.jsx";
import BillingPage from "./components/Billing/BillingPage.jsx";
import BillAddress from "./components/Billing/BillAddress.jsx";
import CustomerProtectedRoute from "./components/newUpdateComponents/customerProtectedRoute.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Register */}
        <Route path="/users/register" element={<Registration />} />
        <Route path="/seller/register" element={<Registration />} />
        <Route path="/admin/register" element={<Registration />} />

        {/* Login */}
        <Route path="/users/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/seller/login" element={<Login />} />

        {/* unauthorized users */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* admin-dashboard Parent route starting with admin*/}
        <Route
          path="/admin"
          element={
            <RequiredAuth requiredRole="admin">
              <AdminDashboard />
            </RequiredAuth>
          }
        >
          {/* Index route to show AdminBody by default */}
          <Route index element={<AdminBody />} />
          {/* Additional nested routes */}
          <Route path="categories" element={<ProductCategories />} />
          <Route path="manageseller" element={<ManageSeller />} />
        </Route>

        {/* seller-dashboard route */}
        <Route
          path="/seller"
          element={
            <SellerProtectedRoute>
              <SellerDashboard />
            </SellerProtectedRoute>
          }
        >
          <Route index element={<SellerBody />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
        {/* profile-completion */}
        <Route path="/profile-completion" element={<SellerProfile />} />

        {/* customer-landing page */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cartPage" element={<CartPage />} />

        <Route element={<CustomerProtectedRoute />}>
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/billAddress" element={<BillAddress />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
