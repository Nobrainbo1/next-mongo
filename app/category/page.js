"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {

  const columns = [
    { field: "name", headerName: "Category Name", width: 200 },
    { 
      field: "order", 
      headerName: "Order", 
      width: 100,
      type: 'number',
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => startEditMode(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteCategory(row)}
            color="inherit"
          />,
        ];
      },
    },
  ]

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [categoryList, setCategoryList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  async function fetchCategory() {
    const data = await fetch(`${API_BASE}/category`);
    const c = await data.json();
    const c2 = c.map((category) => {
      return {
        ...category,
        id: category._id
      }
    })
    setCategoryList(c2);
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  function handleCategoryFormSubmit(data) {
    if (editMode) {
      // Updating a category
      fetch(`${API_BASE}/category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        stopEditMode();
        fetchCategory()
      });
      return
    }

    // Creating a new category
    fetch(`${API_BASE}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchCategory());

  }

  function startEditMode(category) {
    // console.log(category)
    reset(category);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      name: '',
      order: ''
    })
    setEditMode(false)
  }

  async function deleteCategory(category) {
    if (!confirm(`Are you sure to delete [${category.name}]`)) return;

    const id = category._id
    await fetch(`${API_BASE}/category/${id}`, {
      method: "DELETE"
    })
    fetchCategory()
  }

  return (
    <main className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-2xl p-6 border border-gray-800 mb-6">
          <h1 className="text-2xl font-bold text-white mb-6">Add Category</h1>

          <form onSubmit={handleSubmit(handleCategoryFormSubmit)}>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="text-gray-300 font-medium">Category name:</div>
              <div>
                <input
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                />
              </div>

              <div className="text-gray-300 font-medium">Order:</div>
              <div>
                <input
                  name="order"
                  type="number"
                  {...register("order", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                />
              </div>

              <div className="col-span-2 text-right mt-4">
                {editMode ?
                  <>
                    <input
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer mr-2"
                      value="Update" />
                    <button
                      onClick={() => stopEditMode()}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >Cancel
                    </button>
                  </>
                  :
                  <input
                    type="submit"
                    value="Add"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
                  />
                }
              </div>
            </div>
          </form>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-2xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Categories ({categoryList.length})</h2>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={categoryList}
              columns={columns}
              autoHeight
              slots={{ toolbar: GridToolbar }}
              sx={{
                border: 'none',
                '& .MuiDataGrid-main': {
                  backgroundColor: '#1f2937',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#374151',
                  color: '#e2e8f0',
                  fontWeight: 700,
                  borderBottom: '1px solid #4b5563',
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#374151 !important',
                  color: '#e2e8f0 !important',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  color: '#e2e8f0 !important',
                  fontWeight: 700,
                },
                '& .MuiDataGrid-columnHeaderRow': {
                  backgroundColor: '#374151',
                  color: '#e2e8f0',
                },
                '& .MuiDataGrid-row--borderBottom': {
                  backgroundColor: '#1f2937',
                  borderBottom: '1px solid #374151',
                },
                '& .MuiDataGrid-row': {
                  backgroundColor: '#1f2937',
                  borderBottom: '1px solid #374151',
                  '&:hover': {
                    backgroundColor: '#374151',
                  },
                },
                '& .MuiDataGrid-cell': {
                  color: '#e2e8f0',
                  borderBottom: '1px solid #374151',
                },
                '& .MuiDataGrid-toolbarContainer': {
                  backgroundColor: '#374151',
                  color: '#e2e8f0',
                  borderBottom: '1px solid #4b5563',
                  '& .MuiButton-root': {
                    color: '#e2e8f0',
                    '&:hover': {
                      backgroundColor: '#4b5563',
                    }
                  },
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: '#374151',
                  color: '#e2e8f0',
                  borderTop: '1px solid #4b5563',
                  '& .MuiTablePagination-root': {
                    color: '#e2e8f0',
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
