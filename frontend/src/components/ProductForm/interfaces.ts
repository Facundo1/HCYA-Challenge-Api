import type { Brand, Category, NewProduct, Product, Subcategory, Supercategory } from "../../types/product.types";

export interface ProductFormProps {
    open: boolean;
    editingProduct: Product | null;
    formData: NewProduct;
    errors: Record<string, string>;
    loading: boolean;
    brands: Brand[];
    supercategories: Supercategory[];
    categories: Category[];
    subcategories: Subcategory[];
    onClose: () => void;
    onSubmit: () => void;
    onFormChange: (field: keyof NewProduct, value: any) => void;
}
