import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { t, direction } = useLanguage();

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          {product.dimensions && (
            <p className="mt-1 text-sm text-gray-500">
              {t("dimensions")}: {product.dimensions}
            </p>
          )}
          {product.material && (
            <p className="mt-1 text-sm text-gray-500">
              {t("material")}: {product.material}
            </p>
          )}
        </div>
        <p className="text-sm font-medium text-gray-900">
          {t("price")}: {product.price} {t("shekel")}
        </p>
      </div>
      <div className="mt-4">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full"
          variant="outline"
        >
          {t("addToCart")}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
