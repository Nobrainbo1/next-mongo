"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Paper, Typography, TextField, Button, Box, Card, CardContent, Chip, IconButton, Grid, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Home() {
  const APIBASE = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const startEdit = (id) => async () => {
    // TODO
  }

  async function fetchProducts() {
    const data = await fetch(`${APIBASE}/product`);
    const p = await data.json();
    setProducts(p);
  }

  async function fetchCategory() {
    const data = await fetch(`${APIBASE}/category`);
    const c = await data.json();
    setCategory(c);
  }

  const createProduct = (data) => {
    fetch(`${APIBASE}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchProducts());
  };

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;

    await fetch(`${APIBASE}/product/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  }

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a', p: 3 }}>
        <Grid container spacing={4} maxWidth="xl" sx={{ mx: 'auto' }}>
          {/* Add Product Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={8} sx={{ bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: 2, p: 3 }}>
              <Typography variant="h5" sx={{ color: 'white', mb: 3, display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                ➕ Add New Product
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit(createProduct)}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Code"
                      variant="outlined"
                      {...register("code", { required: true })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#334155',
                          color: 'white',
                          '& fieldset': { borderColor: '#475569' },
                          '&:hover fieldset': { borderColor: '#3b82f6' },
                          '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                        },
                        '& .MuiInputLabel-root': { color: '#94a3b8' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      {...register("name", { required: true })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#334155',
                          color: 'white',
                          '& fieldset': { borderColor: '#475569' },
                          '&:hover fieldset': { borderColor: '#3b82f6' },
                          '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                        },
                        '& .MuiInputLabel-root': { color: '#94a3b8' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={3}
                      {...register("description", { required: true })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#334155',
                          color: 'white',
                          '& fieldset': { borderColor: '#475569' },
                          '&:hover fieldset': { borderColor: '#3b82f6' },
                          '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                        },
                        '& .MuiInputLabel-root': { color: '#94a3b8' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Price"
                      variant="outlined"
                      type="number"
                      inputProps={{ step: "0.01" }}
                      {...register("price", { required: true })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#334155',
                          color: 'white',
                          '& fieldset': { borderColor: '#475569' },
                          '&:hover fieldset': { borderColor: '#3b82f6' },
                          '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                        },
                        '& .MuiInputLabel-root': { color: '#94a3b8' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Category"
                      variant="outlined"
                      {...register("category", { required: true })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#334155',
                          color: 'white',
                          '& fieldset': { borderColor: '#475569' },
                          '&:hover fieldset': { borderColor: '#3b82f6' },
                          '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                        },
                        '& .MuiInputLabel-root': { color: '#94a3b8' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
                      }}
                    >
                      <MenuItem value="">Select a category</MenuItem>
                      {category.map((c) => (
                        <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        py: 1.5,
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                          boxShadow: '0 6px 25px rgba(59, 130, 246, 0.4)'
                        }
                      }}
                    >
                      Add Product
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          
          {/* Products List */}
          <Grid item xs={12} md={6}>
            <Paper elevation={8} sx={{ bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: 2, p: 3 }}>
              <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                📦 Products ({products.length})
              </Typography>
              
              <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
                {products.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6, color: '#64748b' }}>
                    <Typography>No products yet. Add your first product!</Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {products.map((p) => (
                      <Card key={p._id} elevation={4} sx={{ bgcolor: '#334155', border: '1px solid #475569' }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <Box sx={{ flex: 1, mr: 2 }}>
                              <Link href={`/product/${p._id}`} style={{ textDecoration: 'none' }}>
                                <Typography variant="h6" sx={{ color: '#60a5fa', '&:hover': { color: '#3b82f6' }, cursor: 'pointer', fontWeight: 600 }}>
                                  {p.name}
                                </Typography>
                              </Link>
                              <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 0.5 }}>
                                {p.description}
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                <Chip 
                                  label={`$${p.price}`} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: '#3b82f6', 
                                    color: 'white',
                                    fontWeight: 600
                                  }} 
                                />
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton 
                                onClick={startEdit(p._id)}
                                sx={{ 
                                  bgcolor: '#f59e0b', 
                                  color: 'white',
                                  '&:hover': { bgcolor: '#d97706' },
                                  width: 36, 
                                  height: 36
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                onClick={deleteById(p._id)}
                                sx={{ 
                                  bgcolor: '#dc2626', 
                                  color: 'white',
                                  '&:hover': { bgcolor: '#b91c1c' },
                                  width: 36, 
                                  height: 36
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
