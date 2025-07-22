import { Typography, Box, Paper } from "@mui/material";

interface CategoriesSummaryProps {
  supercategories: number;
  categories: number;
  subcategories: number;
  brands: number;
}

export default function CategoriesSummary({
  supercategories,
  categories,
  subcategories,
  brands,
}: CategoriesSummaryProps) {
  return (
    <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Resumen
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary">
              Supercategorías: {supercategories}
            </Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary">
              Categorías: {categories}
            </Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary">
              Subcategorías: {subcategories}
            </Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary">
              Marcas: {brands}
            </Typography>
          </Box>
        </Box>
      </Paper>
  );
}