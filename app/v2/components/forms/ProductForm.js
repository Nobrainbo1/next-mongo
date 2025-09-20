"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: '#1e293b',
  border: '2px solid #374151',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ProductForm({ 
  onSubmit, 
  isEditMode = false, 
  initialData = null, 
  onCancel 
}) {
  const [categories, setCategories] = useState([]);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      code: '',
      name: '',
      description: '',
      price: 0,
      category: ''
    }
  });

  const APIBASE = process.env.NEXT_PUBLIC_API_URL;

  // Fetch categories for dropdown
  async function fetchCategories() {
    try {
      const response = await fetch(`${APIBASE}/category`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  // Reset form with initial data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      reset({
        _id: initialData._id,
        code: initialData.code || '',
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || 0,
        category: initialData.category?._id || initialData.category || ''
      });
    } else {
      reset({
        code: '',
        name: '',
        description: '',
        price: 0,
        category: ''
      });
    }
  }, [isEditMode, initialData, reset]);

  // Load categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFormSubmit = (data) => {
    // Convert price to number
    const formattedData = {
      ...data,
      price: parseFloat(data.price)
    };
    onSubmit(formattedData);
  };

  const handleCancel = () => {
    reset({ 
      code: '', 
      name: '', 
      description: '', 
      price: 0, 
      category: '' 
    });
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Box sx={style}>
      <Typography 
        id="modal-modal-title" 
        variant="h5" 
        component="h2" 
        sx={{ 
          color: 'white', 
          mb: 3, 
          fontWeight: 600,
          textAlign: 'center'
        }}
      >
        {isEditMode ? '✏️ Edit Product' : '➕ Add New Product'}
      </Typography>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3}>
          {/* Hidden ID field for edit mode */}
          {isEditMode && (
            <input
              type="hidden"
              {...register("_id")}
            />
          )}
          
          {/* Product Code Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Code"
              variant="outlined"
              {...register("code", { 
                required: "Product code is required",
                minLength: {
                  value: 2,
                  message: "Product code must be at least 2 characters"
                }
              })}
              error={!!errors.code}
              helperText={errors.code?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#334155',
                  color: 'white',
                  '& fieldset': { borderColor: '#475569' },
                  '&:hover fieldset': { borderColor: '#3b82f6' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' },
                '& .MuiFormHelperText-root': { color: '#ef4444' }
              }}
            />
          </Grid>
          
          {/* Product Name Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              {...register("name", { 
                required: "Product name is required",
                minLength: {
                  value: 2,
                  message: "Product name must be at least 2 characters"
                }
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#334155',
                  color: 'white',
                  '& fieldset': { borderColor: '#475569' },
                  '&:hover fieldset': { borderColor: '#3b82f6' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' },
                '& .MuiFormHelperText-root': { color: '#ef4444' }
              }}
            />
          </Grid>
          
          {/* Description Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              {...register("description", { 
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters"
                }
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#334155',
                  color: 'white',
                  '& fieldset': { borderColor: '#475569' },
                  '&:hover fieldset': { borderColor: '#3b82f6' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' },
                '& .MuiFormHelperText-root': { color: '#ef4444' }
              }}
            />
          </Grid>
          
          {/* Price Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              type="number"
              inputProps={{ step: "0.01", min: "0" }}
              {...register("price", { 
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price must be 0 or greater"
                },
                valueAsNumber: true
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#334155',
                  color: 'white',
                  '& fieldset': { borderColor: '#475569' },
                  '&:hover fieldset': { borderColor: '#3b82f6' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' },
                '& .MuiFormHelperText-root': { color: '#ef4444' }
              }}
            />
          </Grid>
          
          {/* Category Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Category"
              variant="outlined"
              {...register("category", { 
                required: "Category is required"
              })}
              error={!!errors.category}
              helperText={errors.category?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#334155',
                  color: 'white',
                  '& fieldset': { borderColor: '#475569' },
                  '&:hover fieldset': { borderColor: '#3b82f6' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' },
                '& .MuiFormHelperText-root': { color: '#ef4444' },
                '& .MuiSelect-icon': { color: '#94a3b8' }
              }}
            >
              <MenuItem value="">Select a category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={handleCancel}
                sx={{ 
                  color: '#94a3b8', 
                  borderColor: '#475569',
                  '&:hover': { 
                    borderColor: '#94a3b8',
                    backgroundColor: 'rgba(148, 163, 184, 0.1)'
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  bgcolor: isEditMode ? '#f59e0b' : '#3b82f6',
                  '&:hover': { 
                    bgcolor: isEditMode ? '#d97706' : '#2563eb'
                  },
                  minWidth: 120
                }}
              >
                {isEditMode ? 'Update Product' : 'Add Product'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}