"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.debug("API_BASE", API_BASE);
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  // DataGrid columns definition
  const columns = [
    { field: "code", headerName: "Product Code", width: 120 },
    { field: "name", headerName: "Product Name", width: 200 },
    { 
      field: "description", 
      headerName: "Description", 
      width: 250,
      renderCell: (params) => (
        <div style={{ 
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          maxWidth: '100%'
        }}>
          {params.value}
        </div>
      )
    },
    { 
      field: "price", 
      headerName: "Price", 
      width: 100,
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Chip 
          label={`$${params.value}`} 
          size="small" 
          sx={{ 
            bgcolor: '#3b82f6', 
            color: 'white',
            fontWeight: 600
          }} 
        />
      )
    },
    { 
      field: "category", 
      headerName: "Category", 
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value?.name || 'No Category'} 
          size="small" 
          variant="outlined"
          sx={{ 
            color: '#e2e8f0',
            borderColor: '#64748b'
          }} 
        />
      )
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
            key="view"
            icon={<EditIcon />}
            label="View"
            className="textPrimary"
            onClick={() => handleView(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  async function fetchProducts() {
    const data = await fetch(`${API_BASE}/product`);
    // const data = await fetch(`http://localhost:3000/product`);
    const p = await data.json();
    // Add id field for DataGrid
    const p2 = p.map((product) => {
      product.id = product._id;
      return product;
    });
    setProducts(p2);
  }

  async function fetchCategory() {
    const data = await fetch(`${API_BASE}/category`);
    const c = await data.json();
    setCategory(c);
  }

  const createProduct = (data) => {
    fetch(`${API_BASE}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchProducts());
  };

  // Handle View Product
  const handleView = (product) => {
    // Navigate to product detail page
    window.location.href = `/product/${product._id}`;
  };

  // Handle Delete Product
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${API_BASE}/product/${productId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchProducts(); // Refresh the list
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;
    
    await fetch(`${API_BASE}/product/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  }

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 p-1">
      <div className="flex flex-row gap-2 max-w-7xl mx-auto">
        <div className="flex-1 bg-gray-900 rounded-lg shadow-2xl p-3 border border-gray-800">
          <h2 className="text-lg font-bold text-white mb-2">Add Product</h2>
          <form onSubmit={handleSubmit(createProduct)}>
            <div className="grid grid-cols-2 gap-2 max-w-lg">
              <div className="text-gray-300 font-medium">Code:</div>
              <div>
                <input
                  name="code"
                  type="text"
                  {...register("code", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                />
              </div>
              <div className="text-gray-300 font-medium">Name:</div>
              <div>
                <input
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                />
              </div>
              <div className="text-gray-300 font-medium">Description:</div>
              <div>
                <textarea
                  name="description"
                  {...register("description", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                  rows="3"
                />
              </div>
              <div className="text-gray-300 font-medium">Price:</div>
              <div>
                <input
                  name="price"
                  type="number"
                  {...register("price", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                  step="0.01"
                />
              </div>
              <div className="text-gray-300 font-medium">Category:</div>
              <div>
                <select
                  name="category"
                  {...register("category", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                >
                  <option value="">Select a category</option>
                  {category.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 mt-2">
                <input
                  type="submit"
                  value="Add Product"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
        
        <div className="flex-1 bg-gray-900 rounded-lg shadow-2xl p-3 border border-gray-800">
          <h2 className="text-lg font-bold text-white mb-2">Products ({products.length})</h2>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={products}
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
    </div>
  );
}
