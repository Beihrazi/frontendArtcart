import React from "react";
import styled from "styled-components";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";

const ManageProducts = () => {
  const data = [
    {
      id: 1,
      name: "Sample Product 1",
      price: "$10.00",
      stock: true,
      category: { name: "Category 1" },
    },
    {
      id: 2,
      name: "Sample Product 2",
      price: "$15.00",
      stock: false,
      category: { name: "Category 2" },
    },
  ];

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => (row.stock ? "In Stock" : "Out of Stock"),
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category.name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const handleClick = (event) => setAnchorEl(event.currentTarget);
        const handleClose = () => setAnchorEl(null);
        const open = Boolean(anchorEl);
        const id = open ? "simple-popover" : undefined;

        return (
          <div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
              Edit Product Details
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            >
              <Typography sx={{ p: 2 }}>
                <h2 className="text-center text-2xl font-bold text-gray-900">
                  Update Product Details
                </h2>
                <form className="space-y-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Product Name
                    </label>
                    <input
                      type="text"
                      defaultValue={row.name}
                      readOnly
                      className="block w-full mt-2 p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Product Price
                    </label>
                    <input
                      type="number"
                      defaultValue={row.price}
                      readOnly
                      className="block w-full mt-2 p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Stock Status
                    </label>
                    <div className="flex items-center mt-2">
                      <input
                        type="radio"
                        checked={row.stock}
                        readOnly
                      />
                      <label className="ml-2">In Stock</label>
                      <input
                        type="radio"
                        checked={!row.stock}
                        className="ml-4"
                        readOnly
                      />
                      <label className="ml-2">Out of Stock</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Product Description
                    </label>
                    <textarea
                      defaultValue="Sample Description"
                      readOnly
                      className="block w-full mt-2 p-2 border rounded"
                    />
                  </div>
                  <Button variant="contained" color="primary" fullWidth disabled>
                    Update
                  </Button>
                </form>
              </Typography>
            </Popover>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} pagination />;
};

export default ManageProducts;
