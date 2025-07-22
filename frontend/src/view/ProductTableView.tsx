import { useState, useEffect } from "react";
import ProductTable from "../components/ProductTable/ProductTable";
import { productService, brandService, categoryService, subcategoryService } from "../services";
import type { Product, ProductQueryParams } from "../types/product.types";
import type { Brand, Category, Subcategory } from "../types/product.types";
import { confirmDeleteProduct } from "../utils";

export default function ProductTableView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState<ProductQueryParams>({
    _sort: "name",
    _order: "asc",
    _page: 1,
    _limit: 10,
    brandId: [],
    categoryId: [],
    subcategoryId: [],
    supercategoryId: [],
    name_like: "",
    description_like: "",
    sku_like: "",
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    loadProducts();
  }, [filters, page, rowsPerPage]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const handleProductsUpdated = () => {
      loadProducts();
    };

    const handleFiltersChanged = (event: Event) => {
      const customEvent = event as CustomEvent;
      setFilters(customEvent.detail.filters);
      setPage(0);
      setLoading(true);
    };

    window.addEventListener('productsUpdated', handleProductsUpdated);
    window.addEventListener('filtersChanged', handleFiltersChanged);

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdated);
      window.removeEventListener('filtersChanged', handleFiltersChanged);
    };
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [brandsRes, categoriesRes, subcategoriesRes] = await Promise.all([
        brandService.getAll(),
        categoryService.getAll(),
        subcategoryService.getAll(),
      ]);
      setBrands(brandsRes.data || []);
      setCategories(categoriesRes.data || []);
      setSubcategories(subcategoriesRes.data || []);
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const queryParams = {
        ...filters,
        _page: page + 1,
        _limit: rowsPerPage,
      };
      const response = await productService.getByQuery(queryParams);
      const productsArray = Array.isArray(response.data) ? response.data : [];

      setProducts(productsArray);
      setTotalProducts(response.total || 0);
    } catch (error: unknown) {
      console.error("Error cargando productos:", error);
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field: string) => {
    setFilters(prev => ({
      ...prev,
      _sort: field,
      _order: prev._sort === field && prev._order === "asc" ? "desc" : "asc",
    }));
  };

  const handleEdit = (product: Product) => {
    const event = new CustomEvent('openEditModal', {
      detail: { product }
    });
    window.dispatchEvent(event);
  };

  const handleDelete = async (product: Product) => {
    try {
      const userConfirmed = await confirmDeleteProduct(product.name);
      if (!userConfirmed) return;
      setLoading(true);
      await productService.delete(product.id);
      loadProducts();
      const event = new CustomEvent('showSnackbar', {
        detail: {
          message: `"${product.name}" eliminado exitosamente`,
          severity: "success"
        }
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Error eliminando el producto:", error);
      const event = new CustomEvent('showSnackbar', {
        detail: {
          message: `Error al eliminar "${product.name}"`,
          severity: "error"
        }
      });
      window.dispatchEvent(event);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductTable
      products={products}
      totalProducts={totalProducts}
      loading={loading}
      page={page}
      rowsPerPage={rowsPerPage}
      brands={brands}
      categories={categories}
      subcategories={subcategories}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onSort={handleSort}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}