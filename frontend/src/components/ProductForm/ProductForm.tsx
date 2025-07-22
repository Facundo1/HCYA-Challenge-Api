import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import type { ProductFormProps } from "./interfaces";

export default function ProductForm({
  open,
  editingProduct,
  formData,
  errors,
  loading,
  brands,
  supercategories,
  categories,
  subcategories,
  onClose,
  onSubmit,
  onFormChange,
}: ProductFormProps) {
  console.log("ProductForm recibió errores:", errors);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ minHeight: "80vh", zIndex: 1000 }}
    >
      <DialogTitle>
        {editingProduct ? "Editar Producto" : "Nuevo Producto"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Nombre *"
              value={formData.name}
              onChange={(e) => onFormChange("name", e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="SKU *"
              value={formData.sku}
              onChange={(e) => onFormChange("sku", e.target.value)}
              error={!!errors.sku}
              helperText={errors.sku}
            />
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Precio *"
              type="number"
              value={formData.price}
              onChange={(e) => onFormChange("price", parseFloat(e.target.value) || 0)}
              error={!!errors.price}
              helperText={errors.price}
              InputProps={{
                inputProps: { min: 0 },
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
            />
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Stock *"
              type="number"
              value={formData.stock}
              onChange={(e) => onFormChange("stock", parseInt(e.target.value) || 0)}
              error={!!errors.stock}
              helperText={errors.stock}
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Descripción"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => onFormChange("description", e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="URL de imagen"
              value={formData.imgUrl}
              onChange={(e) => onFormChange("imgUrl", e.target.value)}
              error={!!errors.imgUrl}
              helperText={errors.imgUrl}
            />
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <FormControl fullWidth error={!!errors.supercategoryId}>
              <InputLabel>Supercategoría *</InputLabel>
              <Select
                value={formData.supercategoryId}
                onChange={(e) => onFormChange("supercategoryId", e.target.value)}
                label="Supercategoría *"
              >
                {supercategories.map((supercat) => (
                  <MenuItem key={supercat.id} value={supercat.id}>
                    {supercat.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.supercategoryId && (
                <Typography variant="caption" color="error">
                  {errors.supercategoryId}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <FormControl fullWidth error={!!errors.categoryId}>
              <InputLabel>Categoría *</InputLabel>
              <Select
                value={formData.categoryId}
                onChange={(e) => onFormChange("categoryId", e.target.value)}
                label="Categoría *"
                disabled={!formData.supercategoryId}
              >
                {categories
                  .filter(cat => cat.supercategoryId.toString() === formData.supercategoryId)
                  .map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
              {errors.categoryId && (
                <Typography variant="caption" color="error">
                  {errors.categoryId}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <FormControl fullWidth error={!!errors.subcategoryId}>
              <InputLabel>Subcategoría *</InputLabel>
              <Select
                value={formData.subcategoryId}
                onChange={(e) => onFormChange("subcategoryId", e.target.value)}
                label="Subcategoría *"
                disabled={!formData.categoryId}
              >
                {subcategories
                  .filter(subcat => subcat.categoryId.toString() === formData.categoryId)
                  .map((subcat) => (
                    <MenuItem key={subcat.id} value={subcat.id}>
                      {subcat.name}
                    </MenuItem>
                  ))}
              </Select>
              {errors.subcategoryId && (
                <Typography variant="caption" color="error">
                  {errors.subcategoryId}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <FormControl fullWidth error={!!errors.brandId}>
              <InputLabel>Marca *</InputLabel>
              <Select
                value={formData.brandId}
                onChange={(e) => onFormChange("brandId", e.target.value)}
                label="Marca *"
              >
                {brands.map((brand) => (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.brandId && (
                <Typography variant="caption" color="error">
                  {errors.brandId}
                </Typography>
              )}
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : editingProduct ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 