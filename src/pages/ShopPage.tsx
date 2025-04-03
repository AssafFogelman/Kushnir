import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  dimensions?: string;
  material?: string;
  description?: string;
}

// Mock data - replace with API call later
const mockProducts: Product[] = [
  {
    id: "1",
    name: "ארון ספרים אורן",
    price: 1200,
    image: "/images/products/bookshelf.jpg",
    category: "furniture",
    dimensions: "180x40x200 ס״מ",
    material: "אורן",
    description: "ארון ספרים מעוצב מעץ אורן איכותי",
  },
  {
    id: "2",
    name: "שולחן אוכל אלון",
    price: 2500,
    image: "/images/products/dining-table.jpg",
    category: "furniture",
    dimensions: "160x90x75 ס״מ",
    material: "אלון",
    description: "שולחן אוכל מסורתי מעץ אלון",
  },
  // Add more mock products here
];

const ShopPage = () => {
  const { t, direction } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState("nameAsc");

  const categories = [
    { value: "all", label: t("allCategories") },
    { value: "boards", label: t("boards") },
    { value: "beams", label: t("beams") },
    { value: "furniture", label: t("furniture") },
  ];

  const sortOptions = [
    { value: "nameAsc", label: t("nameAsc") },
    { value: "nameDesc", label: t("nameDesc") },
    { value: "priceLowToHigh", label: t("priceLowToHigh") },
    { value: "priceHighToLow", label: t("priceHighToLow") },
  ];

  useEffect(() => {
    let filteredProducts = [...mockProducts];

    // Filter by category
    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "priceLowToHigh":
          return a.price - b.price;
        case "priceHighToLow":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setProducts(filteredProducts);
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (product: Product) => {
    // TODO: Implement cart functionality
    console.log("Added to cart:", product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3">
          <Input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="w-full"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select
            value={selectedCategory}
            onValueChange={(value: string) => {
              setSelectedCategory(value);
              setSearchParams({ category: value });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("filterBy")} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("sortBy")} />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">{t("noProducts")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
