import type { NewProduct } from "../types/product.types";

export interface ValidationErrors {
  [key: string]: string;
}

export const validateProductForm = (formData: NewProduct): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.name.trim()) {
    errors.name = "El nombre es requerido";
  } else if (formData.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  if (formData.price <= 0) {
    errors.price = "El precio debe ser mayor a 0";
  } else if (formData.price > 999999) {
    errors.price = "El precio no puede ser mayor a 999,999";
  }

  if (formData.stock === undefined || formData.stock === null || formData.stock === 0) {
    errors.stock = "El stock es requerido";
  } else if (formData.stock < 0) {
    errors.stock = "El stock no puede ser negativo";
  } else if (formData.stock > 999999) {
    errors.stock = "El stock no puede ser mayor a 999,999";
  }

  if (!formData.sku.trim()) {
    errors.sku = "El SKU es requerido";
  } else if (formData.sku.trim().length < 3) {
    errors.sku = "El SKU debe tener al menos 3 caracteres";
  }

  if (!formData.brandId) {
    errors.brandId = "La marca es requerida";
  }

  if (!formData.supercategoryId) {
    errors.supercategoryId = "La supercategoría es requerida";
  }

  if (!formData.categoryId) {
    errors.categoryId = "La categoría es requerida";
  }

  if (!formData.subcategoryId) {
    errors.subcategoryId = "La subcategoría es requerida";
  }

  if (!formData.description.trim()) {
    errors.description = "La descripción es requerida";
  } else if (formData.description.length > 500) {
    errors.description = "La descripción no puede tener más de 500 caracteres";
  }

  if (!formData.imgUrl || formData.imgUrl.trim() === "") {
    errors.imgUrl = "La URL de la imagen es requerida";
  } else if (!formData.imgUrl.startsWith('http://') && !formData.imgUrl.startsWith('https://')) {
    errors.imgUrl = "La URL debe comenzar con http:// o https://";
  }

  return errors;
};