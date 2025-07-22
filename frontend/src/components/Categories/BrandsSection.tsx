import { Typography, Box, Paper, Chip } from "@mui/material";
import type { Brand } from "../../types/product.types";

interface BrandsSectionProps {
  brands: Brand[];
}

export default function BrandsSection({ brands }: BrandsSectionProps) {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Marcas ({brands.length})
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {brands.map((brand) => (
          <Chip key={brand.id} label={brand.name} variant="outlined" />
        ))}
      </Box>
    </Paper>
  );
}