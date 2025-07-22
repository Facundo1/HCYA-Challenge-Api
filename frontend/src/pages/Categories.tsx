import { Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { brandService, categoryService, subcategoryService, supercategoryService } from "../services";
import type { Brand, Category, Subcategory, Supercategory } from "../types/product.types";
import BrandsSection from "../components/Categories/BrandsSection";
import CategoriesSummary from "../components/Categories/CategoriesSummary";
import CategoryCard from "../components/Categories/CategoryCard";

export default function Categories() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [supercategories, setSupercategories] = useState<Supercategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
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
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoriesForSupercategory = (supercategoryId: number) => {
    return categories.filter(cat => cat.supercategoryId === supercategoryId);
  };

  const getSubcategoriesForCategory = (categoryId: number) => {
    return subcategories.filter(subcat => subcat.categoryId === categoryId);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Estructura de Categorías
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Visualiza la jerarquía completa de categorías del sistema.
      </Typography>

      <BrandsSection brands={brands} />

      <CategoryCard
        supercategories={supercategories}
        categories={categories}
        subcategories={subcategories}
        getCategoriesForSupercategory={getCategoriesForSupercategory}
        getSubcategoriesForCategory={getSubcategoriesForCategory}
      />

      <CategoriesSummary supercategories={supercategories.length} categories={categories.length} subcategories={subcategories.length} brands={brands.length} />
    </Box>
  );
}
