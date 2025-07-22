import { useState } from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import { Add as AddIcon, FilterList as FilterIcon } from "@mui/icons-material";
import ProductFiltersView from "./ProductFiltersView";
import ProductTableView from "./ProductTableView";
import ProductFormView from "./ProductFormView";
import ProductFeedbackView from "./ProductFeedbackView";

export default function ProductsView() {
  const [loading, setLoading] = useState(false);

  const openCreateModal = () => {
    const event = new CustomEvent('openCreateModal');
    window.dispatchEvent(event);
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Gestión de Productos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreateModal}
          disabled={loading}
        >
          Nuevo Producto
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <FilterIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Filtros</Typography>
        </Box>

        <ProductFiltersView />
      </Paper>

      <ProductTableView />

      <ProductFormView />

      <ProductFeedbackView />
    </Box>
  );
}