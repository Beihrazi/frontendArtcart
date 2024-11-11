// DataTable.js
import React, { useState } from "react";
import Modal from "./ImageModal";

const DataTable = ({ data, onViewAadharImage, onApprove, onReject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const openModal = (imagePath) => {
    setSelectedImage(imagePath);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedImage("");
    setIsModalOpen(false);
  };
  console.log("data",data)
  return (
    <div className="border-2 border-blue-200 h-72 w-[85%] overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Seller Name</th>
            <th className="px-6 py-3">Aadhaar Number</th>
            <th className="px-6 py-3">Action</th>
            <th className="px-6 py-3">View Aadhar Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((seller, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 font-bold">{seller.name? seller.name : "Profile Pending"}</td>
              <td className="border px-4 py-2 font-bold">{seller.aadhaarNo? seller.aadhaarNo : "aadhaar Pending"}</td>
              <td className="border px-4 py-2">
              {!seller.isVerified ? (
                  <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => onApprove(seller._id)}
                >
                  Approve
                </button>
              ):
                null
              }
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => onReject(seller._id)}
                >
                  {!seller.isVerified? "Reject" : "Remove"}
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => openModal(seller.aadhaarDoc)}
                >
                  View Image
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imagePath={selectedImage}
      />
    </div>
  );
};

export default DataTable;
