"use client";
import { useState, useEffect } from "react";
import ProductForm from "@/app/v2/components/forms/ProductForm";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { GridActionsCellItem } from "@mui/x-data-grid";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Chip from "@mui/material/Chip";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
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
            color: 'white',
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
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEdit(row)}
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

  const APIBASE = process.env.NEXT_PUBLIC_API_URL;
  
  async function fetchProducts() {
    const data = await fetch(`${APIBASE}/product`);
    const p = await data.json();
    const p2 = p.map((product) => {
      product.id = product._id;
      return product;
    });
    setProducts(p2);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setEditMode(false);
    setSelectedProduct(null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedProduct(null);
  };

  // Handle Edit - fetch product data by ID and open form in edit mode
  async function handleEdit(productRow) {
    try {
      const response = await fetch(`${APIBASE}/product/${productRow._id}`);
      if (response.ok) {
        const productData = await response.json();
        setSelectedProduct(productData);
        setEditMode(true);
        setOpen(true);
      } else {
        console.error('Failed to fetch product data');
        alert('Failed to load product data for editing');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error loading product data');
    }
  }

  // Handle Delete
  async function handleDelete(productId) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${APIBASE}/product/${productId}`, {
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
  }

  async function handleProductFormSubmit(data) {
    try {
      let response;
      
      if (editMode) {
        // UPDATE operation - PUT request
        response = await fetch(`${APIBASE}/product`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        // CREATE operation - POST request
        response = await fetch(`${APIBASE}/product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        // Success - refresh the product list and close modal
        await fetchProducts();
        handleClose();
        
        // Show success message
        const action = editMode ? 'updated' : 'created';
        alert(`Product ${action} successfully!`);
      } else {
        // Handle API errors
        const errorData = await response.text();
        console.error(`Failed to ${editMode ? 'update' : 'create'} product:`, errorData);
        alert(`Failed to ${editMode ? 'update' : 'create'} product. Please try again.`);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error submitting product form:', error);
      alert('An error occurred. Please check your connection and try again.');
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <main>
        <div className="mx-4 p-6 bg-gray-950 min-h-screen">
          <div className="bg-gray-900 rounded-lg shadow-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Avatar sx={{ bgcolor: '#3b82f6', color: 'white' }}>
                  <ShoppingCartIcon />
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-slate-200">Products</h2>
                  <span className="text-sm text-gray-400">({products.length} total)</span>
                </div>
              </div>
              <IconButton 
                aria-label="new-product" 
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
              <ProductForm 
                onSubmit={handleProductFormSubmit}
                isEditMode={editMode}
                initialData={selectedProduct}
                onCancel={handleClose}
              />
            </Modal>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <DataGrid
                slots={{
                  toolbar: GridToolbar,
                }}
                rows={products}
                columns={columns}
                autoHeight
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 20]}
                sx={{
                  border: 0,
                  color: '#e2e8f0',
                  '& .MuiDataGrid-root': {
                    backgroundColor: '#1f2937',
                  },
                  '& .MuiDataGrid-topContainer': {
                    backgroundColor: '#374151',
                    borderBottom: '1px solid #4b5563',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#374151 !important',
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
      </main>
    </>
  );
}
