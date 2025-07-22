import { Typography, Box, Card, CardContent, Chip } from "@mui/material";
import type { Supercategory, Category, Subcategory } from "../../types/product.types";

interface CategoryCardProps {
  supercategories: Supercategory[];
  categories: Category[];
  subcategories: Subcategory[];
  getCategoriesForSupercategory: (supercategoryId: number) => Category[];
  getSubcategoriesForCategory: (categoryId: number) => Subcategory[];
}

export default function CategoryCard({
  supercategories,
  getCategoriesForSupercategory,
  getSubcategoriesForCategory,
}: CategoryCardProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {supercategories.map((supercat) => (
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }} key={supercat.id}>
          <Card>
            <CardContent sx={{minHeight: '190px'}}>
              <Typography variant="h6" gutterBottom color="primary">
                {supercat.name}
              </Typography>
              
              {getCategoriesForSupercategory(parseInt(supercat.id)).map((category) => (
                <Box key={category.id} sx={{ ml: 2, mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {category.name}
                  </Typography>
                  
                  <Box sx={{ ml: 2 }}>
                    {getSubcategoriesForCategory(parseInt(category.id)).map((subcategory) => (
                      <Chip
                        key={subcategory.id}
                        label={subcategory.name}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}
