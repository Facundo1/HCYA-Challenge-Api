export interface Brand {
  id: string;
  name: string;
}

export interface Supercategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  supercategoryId: number;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  sku: string;
  imgUrl: string;
  brandId: number;
  subcategoryId: number;
  categoryId: number;
  supercategoryId: number;
}

export interface NewProduct {
  name: string;
  price: number;
  stock: number;
  description: string;
  sku: string;
  imgUrl: string;
  brandId: string;
  subcategoryId: string;
  categoryId: string;
  supercategoryId: string;
}

export interface ProductQueryParams {
  _sort?: string;
  _order?: "asc" | "desc";
  _page?: number;
  _limit?: number;
  brandId?: string[];
  subcategoryId?: string[];
  categoryId?: string[];
  supercategoryId?: string[];
  stock_gte?: number;
  stock_lte?: number;
  price_gte?: number;
  price_lte?: number;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info";
} 