import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Typography,
  CardMedia,
  Tooltip,
  CircularProgress,
  Button,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { ProductTableProps } from "./Interfaces";

export default function ProductTable({
  products = [],
  totalProducts,
  loading,
  page,
  rowsPerPage,
  brands,
  categories,
  subcategories,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const getBrandName = (brandId: number) => {
    return brands.find(b => b.id === brandId.toString())?.name || "N/A";
  };

  const getCategoryName = (categoryId: number) => {
    return categories.find(c => c.id === categoryId.toString())?.name || "N/A";
  };

  const getSubcategoryName = (subcategoryId: number) => {
    return subcategories.find(s => s.id === subcategoryId.toString())?.name || "N/A";
  };

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  onClick={() => onSort("name")}
                  sx={{ fontWeight: "bold" }}
                >
                  Nombre
                </Button>
              </TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell >SKU</TableCell>
              <TableCell>
                <Button
                  onClick={() => onSort("price")}
                  sx={{ fontWeight: "bold" }}
                >
                  Precio
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => onSort("stock")}
                  sx={{ fontWeight: "bold" }}
                >
                  Stock
                </Button>
              </TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Subcategoría</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body1" color="text.secondary">
                    No se encontraron productos
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              safeProducts.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <CardMedia
                      component="img"
                      sx={{ width: 50, height: 50, objectFit: "cover", borderRadius: 1 }}
                      image={product.imgUrl}
                      alt={product.name}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={product.sku} size="small" />
                  </TableCell>
                  <TableCell sx={{textAlign: "center"}}>
                    <Typography variant="body1" fontWeight="medium">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{textAlign: "center"}}>
                    <Chip
                      label={product.stock}
                      color={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{getBrandName(product.brandId)}</TableCell>
                  <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                  <TableCell>{getSubcategoryName(product.subcategoryId)}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(product)}
                          disabled={loading}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete(product)}
                          disabled={loading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />
    </Paper>
  );
}