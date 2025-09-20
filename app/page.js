import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function BoxBasic() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center">
      <Paper 
        elevation={24}
        sx={{
          backgroundColor: '#111827',
          border: '1px solid #374151',
          borderRadius: '16px',
          p: 4,
          m: 2,
          maxWidth: '400px',
          width: '100%'
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" fontWeight="bold" color="white" mb={1}>
            Stock Management
          </Typography>
          <Box sx={{ width: '60px', height: '4px', backgroundColor: '#3b82f6', mx: 'auto', borderRadius: '2px' }} />
        </Box>
        
        <Stack spacing={3}>
          <Link href="/product" passHref>
            <Button
              variant="contained"
              size="large"
              fullWidth
              component="a"
              sx={{ 
                py: 1.5,
                fontSize: '16px',
                borderRadius: '12px',
                textTransform: 'none',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  boxShadow: '0 6px 25px rgba(59, 130, 246, 0.4)'
                }
              }}
            >
              📦 Products
            </Button>
          </Link>
          <Link href="/category" passHref>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              component="a"
              sx={{ 
                py: 1.5,
                fontSize: '16px',
                borderRadius: '12px',
                textTransform: 'none',
                color: '#60a5fa',
                borderColor: '#374151',
                backgroundColor: '#1f2937',
                '&:hover': { 
                  borderColor: '#3b82f6',
                  backgroundColor: '#111827',
                  boxShadow: '0 4px 15px rgba(96, 165, 250, 0.2)'
                }
              }}
            >
              🏷️ Categories
            </Button>
          </Link>
        </Stack>
      </Paper>
    </main>
  );
}
