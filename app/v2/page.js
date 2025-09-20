"use client"
import * as React from 'react';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { Box, Typography, Paper } from '@mui/material';

export default function HomeV2() {
  return (
    <main>
      <ResponsiveAppBar />
      <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a', p: 4 }}>
        <Paper 
          elevation={8} 
          sx={{ 
            bgcolor: '#1e293b', 
            border: '1px solid #334155', 
            borderRadius: 2, 
            p: 4,
            maxWidth: '800px',
            mx: 'auto',
            mt: 4
          }}
        >
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: '#e2e8f0', mb: 2 }}>
            Stock App V2
          </Typography>
          <Box sx={{ width: '80px', height: '4px', backgroundColor: '#3b82f6', borderRadius: '2px', mb: 3 }} />
          <Typography variant="body1" sx={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Enhanced with Material-UI components and modern styling
          </Typography>
        </Paper>
      </Box>
    </main>
  );
}