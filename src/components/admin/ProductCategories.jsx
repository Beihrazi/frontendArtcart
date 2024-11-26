import { useEffect, useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import axiosInstance from "../newUpdateComponents/axiosInstance";

const ProductCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null); // Track the category being edited

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null); // Reset after closing modal
  };

  const handleCategoryDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/admin/category/${id}`);
      fetchCategory(); // Refresh categories after deletion
    } catch (error) {
      console.log("Error deleting category: ", error.response?.data?.msg || error.message);
    }
  };

  // Add Category
  const handleAddCategory = async (categoryName) => {
    try {
      await axiosInstance.post("/api/admin/category", { name: categoryName });
      fetchCategory(); // Refresh categories after adding
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error adding category: ", error.response?.data?.msg || error.message);
    }
  };

  // Edit Category
  const handleEditCategory = async (categoryName) => {
    if (!currentCategory) return;
    try {
      await axiosInstance.put(`/api/admin/category/${currentCategory._id}`, { name: categoryName });
      fetchCategory(); // Refresh categories after editing
      setIsModalOpen(false);
      setCurrentCategory(null);
    } catch (error) {
      console.log("Error editing category: ", error.response?.data?.msg || error.message);
    }
  };

  // Prepare category for editing
  const initiateEditCategory = (category) => {
    setCurrentCategory(category);
    handleOpenModal();
  };

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/category");
      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories: ", error.response?.data?.msg || error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-col md:flex-row mt-2 pt-4 justify-center gap-6 px-4">
      {/* Add New Category Button */}
      <div className="border-2 w-full md:w-[30%] text-center h-auto mx-4">
        <AddCategoryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={currentCategory ? handleEditCategory : handleAddCategory}
          initialValue={currentCategory ? currentCategory.name : ""}
        />
        <div className="p-2 bg-slate-300 m-1">
          <button
            onClick={handleOpenModal}
            className="w-full font-bold py-2 px-4 rounded"
          >
            Add New Category
          </button>
        </div>
      </div>

      {/* Category Table */}
      <div className="overflow-x-auto w-full md:w-[70%]">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
              <th className="px-4 py-3 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((c) => (
                <tr key={c._id}>
                  <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">{c.name}</td>
                  <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => initiateEditCategory(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleCategoryDelete(c._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-4 text-center">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCategories;
