import { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm/ProductForm";
import { productService, brandService, categoryService, subcategoryService, supercategoryService } from "../services";
import { validateProductForm, createEmptyProduct, productToFormData, formDataToApiData, confirmUnsavedChanges } from "../utils";
import type { NewProduct, Product } from "../types/product.types";
import type { Brand, Category, Subcategory, Supercategory } from "../types/product.types";

export default function ProductFormView() {
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<NewProduct>(createEmptyProduct());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [supercategories, setSupercategories] = useState<Supercategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    if (open) {
      loadInitialData();
      if (editingProduct) {
        setFormData(productToFormData(editingProduct));
      } else {
        setFormData(createEmptyProduct());
      }
      setErrors({});
      setHasUnsavedChanges(false);
    }
  }, [open, editingProduct]);

  useEffect(() => {
    const handleOpenCreateModal = () => {
      setEditingProduct(null);
      setOpen(true);
    };

    const handleOpenEditModal = (event: Event) => {
      const customEvent = event as CustomEvent;
      setEditingProduct(customEvent.detail.product);
      setOpen(true);
    };

    window.addEventListener('openCreateModal', handleOpenCreateModal);
    window.addEventListener('openEditModal', handleOpenEditModal);

    return () => {
      window.removeEventListener('openCreateModal', handleOpenCreateModal);
      window.removeEventListener('openEditModal', handleOpenEditModal);
    };
  }, []);

  const loadInitialData = async () => {
    try {
      const [brandsRes, supercategoriesRes, categoriesRes, subcategoriesRes] = await Promise.all([
        brandService.getAll(),
        supercategoryService.getAll(),
        categoryService.getAll(),
        subcategoryService.getAll(),
      ]);

      setBrands(brandsRes.data);
      setSupercategories(supercategoriesRes.data);
      setCategories(categoriesRes.data);
      setSubcategories(subcategoriesRes.data);
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    }
  };

  const handleFormChange = (field: keyof NewProduct, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleClose = async () => {
    if (hasUnsavedChanges) {
      const confirmed = await confirmUnsavedChanges();
      if (confirmed) {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  const handleSubmit = async () => {
    console.log("Validando formulario con datos:", formData);
    const validationErrors = validateProductForm(formData);
    console.log("Errores de validación:", validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log("Errores establecidos:", validationErrors);
      return;
    }

    try {
      const productData = formDataToApiData(formData);

      if (editingProduct) {
        await productService.update(editingProduct.id, productData);
      } else {
        await productService.create(productData);
      }

      setHasUnsavedChanges(false);
      setOpen(false);

      const event = new CustomEvent('productsUpdated');
      window.dispatchEvent(event);

      const successEvent = new CustomEvent('showSnackbar', {
        detail: {
          message: editingProduct ? "Producto actualizado exitosamente" : "Producto creado exitosamente", 
          severity: "success"
        }
      });
      window.dispatchEvent(successEvent);
    } catch (error) {
      console.error("Error guardando el producto:", error);

      const errorEvent = new CustomEvent('showSnackbar', {
        detail: {
          message: "Error guardando el producto",
          severity: "error"
        }
      });
      window.dispatchEvent(errorEvent);
    }
  };

  return (
    <ProductForm
      open={open}
      editingProduct={editingProduct}
      formData={formData}
      errors={errors}
      loading={loading}
      brands={brands}
      supercategories={supercategories}
      categories={categories}
      subcategories={subcategories}
      onClose={handleClose}
      onSubmit={handleSubmit}
      onFormChange={handleFormChange}
    />
  );
}
