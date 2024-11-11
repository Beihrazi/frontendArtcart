import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { Navigate, Outlet } from "react-router-dom";


const CustomerProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axiosInstance.get("/api/users/billingPage");
        if (response.status === 200) {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Authorization check failed:", error.message);
      } finally {
        setLoading(false);
      }
    };
    checkAuthorization();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
}

  if (!isAuthorized) {
    return <Navigate to="/users/login" />;  
  }

  return <Outlet />;  
};

export default CustomerProtectedRoute;
