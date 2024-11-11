import { useEffect, useState } from "react";

const AddCategoryModal = ({ isOpen, onClose, onSubmit, initialValue }) => {
  const [categoryName, setCategoryName] = useState(initialValue || "");

  //when i submit this it calls the function from ProductCategories of handleAddCategory(categoryName)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(categoryName);
    setCategoryName(""); // Reset the input field
  };

  useEffect(() => {
    setCategoryName(initialValue || ""); // Set initial value when modal opens
  }, [initialValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mb-20">
      <div className="bg-white p-6 rounded shadow-lg w-[30rem]">
        <h2 className="text-lg font-bold mb-4">
          {initialValue ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            required
            className="border p-2 mb-4 w-full"
          />
          <div className="flex justify-center border border-gray-300 p-4 rounded">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
