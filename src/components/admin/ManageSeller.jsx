import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import axiosInstance from "../newUpdateComponents/axiosInstance";

const ManageSeller = () => {
  const[pendingSeller, setPendingSeller] = useState([])
  const [approvedSeller, setApprovedSeller] = useState([])

  //Fetching sellers data
  const fetchSellers = async() =>{
    try {
      const response = await axiosInstance.get("/api/admin/seller")
      const users = response.data

      const pending = users.filter(user => !user.isVerified)
      // console.log("Pendingusers: ", pending)
      const approved = users.filter(user => user.isVerified)
      // console.log("Approvedusers: ", approved)

      setPendingSeller(pending)
      setApprovedSeller(approved)
    } catch (error) {
      console.log("Error fetching: ", error)
    }
  }

  useEffect(()=>{
    fetchSellers()
  },[])

  const [showPending, setShowPending] = useState(true);

  const handleViewPending = () => setShowPending(true);
  const handleViewApproved = () => setShowPending(false);

  const onViewAadharImage = (imagePath) => {
    window.open(imagePath);
  };

  const onApprove = async (id) => {
    // console.log("Approved seller with ID:", id);
      try {
        const res = await axiosInstance.patch(`/api/admin/seller/${id}`, {isVerified: true})
        console.log("res: ", res.data)
        fetchSellers()
      } catch (error) {
          console.log("Error during approving Seller: ", error.response?.data?.msg || error.message);
      }
    
  };

  const onReject = async(id) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/seller/${id}`)
      console.log("res: ", res.data.msg)
      fetchSellers()
    } catch (error) {
        console.log("Error during approving Seller: ", error.response?.data?.msg || error.message);
    }
  };


  return (
    <div className="flex p-4 space-x-4">
      {/* Left side */}
      <div className="border-2 border-gray-400 w-[25%] rounded-lg shadow-lg">
        <div
          className={`h-12 m-2 text-center p-3 cursor-pointer rounded ${showPending ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
          onClick={handleViewPending}
        >
          <h1>Pending Request</h1>
        </div>
        <div
          className={`h-12 m-2 text-center p-3 cursor-pointer rounded ${!showPending ? "bg-green-500 text-white" : "bg-gray-300 text-black"}`}
          onClick={handleViewApproved}
        >
          <h1>Verified Sellers</h1>
        </div>
      </div>

      {/* Right side */}
      <div className={`flex-1 p-4 rounded-lg shadow-lg ${showPending ? "bg-blue-50 border-blue-300" : "bg-green-50 border-green-300"}`}>
        <h2 className={`text-lg font-bold mb-4 ${showPending ? "text-blue-700" : "text-green-700"}`}>
          {showPending ? "Pending Seller Requests" : "Approved Sellers"}
        </h2>
        <DataTable
          data={showPending ? pendingSeller: approvedSeller}
          onViewAadharImage={onViewAadharImage}
          onApprove={onApprove}
          onReject={onReject}
        />
      </div>
    </div>
  );
};

export default ManageSeller;
