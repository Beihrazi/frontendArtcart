import { Navigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";

const SellerProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [profileStatus, setProfileStatus] = useState(false);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const response = await axiosInstance.get('/api/seller/dashboard');
                console.log("response: ", response)
                if (response.status === 200) {
                    setIsAuthorized(true);
                    setProfileStatus(response.data.profileStatus);
                }

            } catch (error) {
                // setProfileStatus();
                setIsAuthorized(true)
                // console.log("Profile Status: ", profileStatus)
                console.error('Authorization check failed:', error.message);
            } finally {
                setLoading(false);
            }
        };
        checkAuthorization();
    }, []);
    // console.log("status: ", profileStatus)
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!isAuthorized) {
        return <Navigate to="/seller/login" />;
    }
    if (!profileStatus) {
        return <Navigate to="/profile-completion"/>;
    }
    return children;
};

export default SellerProtectedRoute