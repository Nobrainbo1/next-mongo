"use client";
import { useState, useEffect } from "react";
import CategoryForm from "@/app/v2/components/forms/CategoryForm";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function Home() {
  const [category, setCategory] = useState([]);
  const columns = [
    { field: "name", headerName: "Category Name", width: 150 },
    // { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  const APIBASE = process.env.NEXT_PUBLIC_API_URL;
  async function fetchCategory() {
    const data = await fetch(`${APIBASE}/category`);
    const c = await data.json();
    const c2 = c.map((category) => {
      category.id = category._id;
      return category;
    });
    setCategory(c2);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  function handleCategoryFormSubmit(data) {
    if (editMode) {
      // data.id = data._id
      fetch(`${APIBASE}/category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        reset({ name: '', order: '' })
        fetchCategory()
      });
      return
    }
    fetch(`${APIBASE}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      reset({ name: '', order: '' })
      fetchCategory()
    });
  }

  return (
    <main>
      {/* <form onSubmit={handleSubmit(createCategory)}>
        <div className="grid grid-cols-2 gap-4 w-fit m-4">
          <div>Category:</div>
          <div>
            <input
              name="name"
              type="text"
              {...register("name", { required: true })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>Order:</div>
          <div>
            <input
              name="order"
              type="number"
              {...register("order", { required: true, defaultValue: 0 })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="col-span-2 text-right">
            {editMode ?
              <input
                type="submit"
                value="Update"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              />

              :
              <input
                type="submit"
                value="Add"
                className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              />
            }
            {
              editMode &&
              <button
                onClick={() => {
                  reset({ name: '', order: '' })
                  setEditMode(false)
                }}
                className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
              >Cancel</button>
            }
          </div>
        </div>
      </form> */}
      <div className="mx-4 p-6 bg-gray-950 min-h-screen">
        <div className="bg-gray-900 rounded-lg shadow-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Avatar sx={{ bgcolor: '#3b82f6', color: 'white' }}>
                <WorkIcon />
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-white">Categories</h2>
                <span className="text-sm text-gray-400">({category.length} total)</span>
              </div>
            </div>
            <IconButton 
              aria-label="new-category" 
              onClick={handleOpen}
              sx={{ 
                bgcolor: '#3b82f6', 
                color: 'white', 
                '&:hover': { bgcolor: '#2563eb' },
                width: 48,
                height: 48
              }}
            >
              <AddBoxIcon />
            </IconButton>
          </div>
          
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CategoryForm onSubmit={handleCategoryFormSubmit} />
          </Modal>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <DataGrid
              slots={{
                toolbar: GridToolbar,
              }}
              rows={category}
              columns={columns}
              sx={{
                border: 0,
                color: 'white',
                minHeight: 400,
                '& .MuiDataGrid-root': {
                  backgroundColor: '#1f2937',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#374151',
                  color: 'white',
                  fontWeight: 700,
                  borderBottom: '1px solid #4b5563',
                },
                '& .MuiDataGrid-row': {
                  backgroundColor: '#1f2937',
                  borderBottom: '1px solid #374151',
                  '&:hover': {
                    backgroundColor: '#374151',
                  },
                },
                '& .MuiDataGrid-cell': {
                  color: 'white',
                  borderBottom: '1px solid #374151',
                },
                '& .MuiDataGrid-toolbarContainer': {
                  backgroundColor: '#374151',
                  color: 'white',
                  borderBottom: '1px solid #4b5563',
                  '& .MuiButton-root': {
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#4b5563',
                    }
                  },
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: '#374151',
                  color: 'white',
                  borderTop: '1px solid #4b5563',
                  '& .MuiTablePagination-root': {
                    color: 'white',
                  }
                },
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
