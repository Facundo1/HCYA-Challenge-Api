import type { Brand, Category, ProductQueryParams, Subcategory, Supercategory } from "../../types/product.types";


export interface ProductFiltersProps {
    filters: ProductQueryParams;
    brands: Brand[];
    supercategories: Supercategory[];
    categories: Category[];
    subcategories: Subcategory[];
    onFilterChange: (field: keyof ProductQueryParams, value: unknown) => void;
    onClearFilters: () => void;
}