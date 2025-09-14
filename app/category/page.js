"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";

export default function Home() {

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'order', headerName: 'Order', width: 150 },
    {
      field: 'Action', headerName: 'Action', width: 150,
      renderCell: (params) => {
        return (
          <div>
            <button onClick={() => startEditMode(params.row)}>📝</button>
            <button onClick={() => deleteCategory(params.row)}>🗑️</button>
          </div>
        )
      }
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
          <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <DataGrid
              rows={categoryList}
              columns={columns}
              disableColumnFilter
              disableColumnMenu
              disableColumnSelector
              disableRowSelectionOnClick
              disableDensitySelector
              disableVirtualization={false}
              hideFooterSelectedRowCount
              autoHeight
              sx={{
                border: 0,
                color: 'white',
                width: '100%',
                height: 'auto',
                maxHeight: 600,
                backgroundColor: '#1f2937',
                '& .MuiDataGrid-root': {
                  backgroundColor: '#1f2937',
                  border: 'none',
                },
                '& .MuiDataGrid-main': {
                  backgroundColor: '#1f2937',
                },
                '& .MuiDataGrid-container--top [role=row]': {
                  backgroundColor: '#374151',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#374151',
                  color: 'white',
                  fontWeight: 700,
                  borderBottom: '1px solid #4b5563',
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#374151',
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    color: 'white',
                    fontWeight: 600,
                  },
                },
                '& .MuiDataGrid-virtualScroller': {
                  backgroundColor: '#1f2937',
                },
                '& .MuiDataGrid-row': {
                  backgroundColor: '#1f2937',
                  borderBottom: '1px solid #374151',
                  '&:hover': {
                    backgroundColor: '#374151',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#374151',
                    '&:hover': {
                      backgroundColor: '#4b5563',
                    },
                  },
                },
                '& .MuiDataGrid-cell': {
                  color: 'white',
                  borderBottom: '1px solid #374151',
                  borderRight: 'none',
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: '#374151',
                  color: 'white',
                  borderTop: '1px solid #4b5563',
                  '& .MuiTablePagination-root': {
                    color: 'white',
                  },
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    color: 'white',
                  },
                  '& .MuiSelect-select': {
                    color: 'white',
                  },
                  '& .MuiIconButton-root': {
                    color: 'white',
                  },
                },
                '& .MuiDataGrid-overlay': {
                  backgroundColor: '#1f2937',
                  color: 'white',
                },
                '& .MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
                '& .MuiDataGrid-menuIconButton': {
                  color: 'white',
                },
                '& .MuiDataGrid-sortIcon': {
                  color: 'white',
                },
                '& .MuiDataGrid-filterIcon': {
                  display: 'none',
                },
                '& .MuiDataGrid-menuIcon': {
                  display: 'none',
                },
                '& .MuiDataGrid-columnHeaderTitleContainer': {
                  '& .MuiDataGrid-menuIconButton': {
                    display: 'none',
                  },
                },
                '& .MuiDataGrid-panel': {
                  backgroundColor: '#374151',
                  color: 'white',
                },
                '& .MuiDataGrid-panelHeader': {
                  backgroundColor: '#374151',
                  color: 'white',
                },
                '& .MuiDataGrid-panelContent': {
                  backgroundColor: '#1f2937',
                  color: 'white',
                },
                '& .MuiDataGrid-filterForm': {
                  backgroundColor: '#1f2937',
                  color: 'white',
                },
                '& .MuiDataGrid-toolbarContainer': {
                  display: 'none',
                },
                '& .MuiDataGrid-columnHeadersInner': {
                  backgroundColor: '#374151',
                },
                '& .MuiDataGrid-withBorderColor': {
                  borderColor: '#374151',
                },
                '& .MuiDataGrid-selectedRowCount': {
                  display: 'none',
                },
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
