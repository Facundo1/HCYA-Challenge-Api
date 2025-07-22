import type { Brand, Category, Product, Subcategory } from "../../types/product.types";

export interface ProductTableProps {
    products: Product[];
    totalProducts: number;
    loading: boolean;
    page: number;
    rowsPerPage: number;
    brands: Brand[];
    categories: Category[];
    subcategories: Subcategory[];
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSort: (field: string) => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}