import type { Brand, Category, ProductQueryParams, Subcategory, Supercategory } from "../../types/product.types";


export interface ProductFiltersProps {
    filters: ProductQueryParams;
    brands: Brand[];
    supercategories: Supercategory[];
    categories: Category[];
    subcategories: Subcategory[];
    onFilterChange: (field: keyof ProductQueryParams, value: any) => void;
    onSearchChange: (field: keyof ProductQueryParams, value: string) => void;
    onClearFilters: () => void;
}