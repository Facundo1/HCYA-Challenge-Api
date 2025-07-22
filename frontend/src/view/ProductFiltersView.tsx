import { useState, useEffect, useRef } from "react";
import ProductFilters from "../components/ProductFilters/ProductFilters";
import { brandService, categoryService, subcategoryService, supercategoryService } from "../services";
import type { ProductQueryParams } from "../types/product.types";
import type { Brand, Category, Subcategory, Supercategory } from "../types/product.types";

export default function ProductFiltersView() {
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
  const [supercategories, setSupercategories] = useState<Supercategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [brandsRes, supercategoriesRes, categoriesRes, subcategoriesRes] = await Promise.all([
        brandService.getAll(),
        supercategoryService.getAll(),
        categoryService.getAll(),
        subcategoryService.getAll(),
      ]);
      setBrands(brandsRes.data || []);
      setSupercategories(supercategoriesRes.data || []);
      setCategories(categoriesRes.data || []);
      setSubcategories(subcategoriesRes.data || []);
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = Array.isArray(categories) ? categories.filter(cat =>
    !filters.supercategoryId?.length || filters.supercategoryId.includes(cat.supercategoryId.toString())
  ) : [];

  const filteredSubcategories = Array.isArray(subcategories) ? subcategories.filter(subcat =>
    !filters.categoryId?.length || filters.categoryId.includes(subcat.categoryId.toString())
  ) : [];

  const handleFilterChange = (field: keyof ProductQueryParams, value: any) => {
    const newFilters = {
      ...filters,
      [field]: value,
      _page: 1,
    };
    setFilters(newFilters);

    const event = new CustomEvent('filtersChanged', {
      detail: { filters: newFilters }
    });
    window.dispatchEvent(event);
  };

  const searchTimeoutRef = useRef<number | null>(null);

  const handleSearchChange = (field: keyof ProductQueryParams, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      _page: 1,
    }));

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const newFilters = {
        ...filters,
        [field]: value,
        _page: 1,
      };

      const event = new CustomEvent('filtersChanged', {
        detail: { filters: newFilters }
      });
      window.dispatchEvent(event);
    }, 300);
  };

  const handleClearFilters = () => {
    const newFilters = {
      _sort: "name",
      _order: "asc" as const,
      _page: 1,
      _limit: 10,
      brandId: [],
      categoryId: [],
      subcategoryId: [],
      supercategoryId: [],
      name_like: "",
      description_like: "",
      sku_like: "",
    };
    setFilters(newFilters);

    const event = new CustomEvent('filtersChanged', {
      detail: { filters: newFilters }
    });
    window.dispatchEvent(event);
  };

  return (
    <ProductFilters
      filters={filters}
      brands={Array.isArray(brands) ? brands : []}
      supercategories={Array.isArray(supercategories) ? supercategories : []}
      categories={filteredCategories}
      subcategories={filteredSubcategories}
      onFilterChange={handleFilterChange}
      onSearchChange={handleSearchChange}
      onClearFilters={handleClearFilters}
    />
  );
}
