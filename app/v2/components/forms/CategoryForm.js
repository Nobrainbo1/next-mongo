"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #374151',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function CategoryForm({ 
  onSubmit, 
  isEditMode = false, 
  initialData = null, 
  onCancel 
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      order: 0
    }
  });

  // Reset form with initial data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      reset({
        _id: initialData._id,
        name: initialData.name || '',
        order: initialData.order || 0
      });
    } else {
      reset({
        name: '',
        order: 0
      });
    }
  }, [isEditMode, initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    reset({ name: '', order: 0 });
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2" className="text-white mb-4">
        {isEditMode ? 'Edit Category' : 'Add New Category'}
      </Typography>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Hidden ID field for edit mode */}
          {isEditMode && (
            <input
              type="hidden"
              {...register("_id")}
            />
          )}
          
          {/* Category Name Field */}
          <div className="text-white">Category Name:</div>
          <div>
            <input
              name="name"
              type="text"
              {...register("name", { 
                required: "Category name is required",
                minLength: {
                  value: 2,
                  message: "Category name must be at least 2 characters"
                }
              })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter category name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>
          
          {/* Order Field */}
          <div className="text-white">Order:</div>
          <div>
            <input
              name="order"
              type="number"
              {...register("order", { 
                required: "Order is required",
                min: {
                  value: 0,
                  message: "Order must be 0 or greater"
                },
                valueAsNumber: true
              })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter sort order (0, 1, 2, ...)"
            />
            {errors.order && (
              <span className="text-red-500 text-sm">{errors.order.message}</span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="col-span-2 flex gap-2 justify-end mt-4">
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              sx={{ 
                color: 'white', 
                borderColor: 'gray',
                '&:hover': { borderColor: 'white' }
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
                }
              }}
            >
              {isEditMode ? 'Update' : 'Add'}
            </Button>
          </div>
        </div>
      </form>
    </Box>
  );
}
