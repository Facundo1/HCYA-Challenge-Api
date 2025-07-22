import type { Product, NewProduct, ProductQueryParams } from "../types/product.types";

export const createEmptyProduct = (): NewProduct => ({
  name: "",
  price: 0,
  stock: 0,
  description: "",
  sku: "",
  imgUrl: "",
  brandId: "",
  subcategoryId: "",
  categoryId: "",
  supercategoryId: "",
});

export const createDefaultFilters = (): ProductQueryParams => ({
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

export const productToFormData = (product: Product): NewProduct => ({
  name: product.name,
  price: product.price,
  stock: product.stock,
  description: product.description,
  sku: product.sku,
  imgUrl: product.imgUrl,
  brandId: product.brandId.toString(),
  subcategoryId: product.subcategoryId.toString(),
  categoryId: product.categoryId.toString(),
  supercategoryId: product.supercategoryId.toString(),
});

export const formDataToApiData = (formData: NewProduct) => ({
  ...formData,
  brandId: parseInt(formData.brandId),
  subcategoryId: parseInt(formData.subcategoryId),
  categoryId: parseInt(formData.categoryId),
  supercategoryId: parseInt(formData.supercategoryId),
});

export const clearFilters = (setFilters: (filters: ProductQueryParams | ((prev: ProductQueryParams) => ProductQueryParams)) => void, setPage: (page: number) => void) => {
  setFilters(createDefaultFilters());
  setPage(0);
};

export const handleFilterChange = (
  field: keyof ProductQueryParams,
  value: any,
  setFilters: (filters: ProductQueryParams | ((prev: ProductQueryParams) => ProductQueryParams)) => void,
  setPage: (page: number) => void
) => {
  setFilters((prev: ProductQueryParams) => ({
    ...prev,
    [field]: value,
    _page: 1,
  }));
  setPage(0);
};

export const handleSearchChange = (
  field: keyof ProductQueryParams,
  value: string,
  setFilters: (filters: ProductQueryParams | ((prev: ProductQueryParams) => ProductQueryParams)) => void,
  setPage: (page: number) => void
) => {
  setFilters((prev: ProductQueryParams) => ({
    ...prev,
    [field]: value,
    _page: 1,
  }));
  setPage(0);
};
