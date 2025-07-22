import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import type { ProductFiltersProps } from "./interfaces";

export default function ProductFilters({
  filters,
  brands,
  supercategories,
  categories,
  subcategories,
  onFilterChange,
  onSearchChange,
  onClearFilters,
}: ProductFiltersProps) {

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
        <TextField
          fullWidth
          label="Buscar por nombre"
          value={filters.name_like || ""}
          onChange={(e) => onSearchChange("name_like", e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        />
      </Box>
      <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
        <TextField
          fullWidth
          label="Buscar por descripción"
          value={filters.description_like || ""}
          onChange={(e) => onSearchChange("description_like", e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        />
      </Box>
      <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
        <TextField
          fullWidth
          label="Buscar por SKU"
          value={filters.sku_like || ""}
          onChange={(e) => onSearchChange("sku_like", e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        />
      </Box>
      <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
        <FormControl fullWidth>
          <InputLabel>Supercategoría</InputLabel>
          <Select
            multiple
            value={filters.supercategoryId || []}
            onChange={(e) => onFilterChange("supercategoryId", e.target.value)}
            input={<OutlinedInput label="Supercategoría" />}
          >
            {supercategories.map((supercat) => (
              <MenuItem key={supercat.id} value={supercat.id}>
                {supercat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
        <FormControl fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            multiple
            value={filters.categoryId || []}
            onChange={(e) => onFilterChange("categoryId", e.target.value)}
            input={<OutlinedInput label="Categoría" />}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
        <FormControl fullWidth>
          <InputLabel>Subcategoría</InputLabel>
          <Select
            multiple
            value={filters.subcategoryId || []}
            onChange={(e) => onFilterChange("subcategoryId", e.target.value)}
            input={<OutlinedInput label="Subcategoría" />}
          >
            {subcategories.map((subcat) => (
              <MenuItem key={subcat.id} value={subcat.id}>
                {subcat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
        <FormControl fullWidth>
          <InputLabel>Marca</InputLabel>
          <Select
            multiple
            value={filters.brandId || []}
            onChange={(e) => onFilterChange("brandId", e.target.value)}
            input={<OutlinedInput label="Marca" />}
          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={onClearFilters}
        >
          Limpiar Filtros
        </Button>
      </Box>
    </Box>
  );
}