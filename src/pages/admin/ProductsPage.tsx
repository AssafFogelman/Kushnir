import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

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
];

const AdminProducts = () => {
  const { t, direction } = useLanguage();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    image: "",
    category: "furniture",
    dimensions: "",
    material: "",
    description: "",
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formData } : p
        )
      );
    } else {
      setProducts([
        ...products,
        {
          ...formData,
          id: Date.now().toString(),
        } as Product,
      ]);
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      price: 0,
      image: "",
      category: "furniture",
      dimensions: "",
      material: "",
      description: "",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("products")}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t("addProduct")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? t("editProduct") : t("addProduct")}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("name")}
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("price")}
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("image")}
                </label>
                <Input
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("category")}
                </label>
                <Input
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("dimensions")}
                </label>
                <Input
                  value={formData.dimensions}
                  onChange={(e) =>
                    setFormData({ ...formData, dimensions: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("material")}
                </label>
                <Input
                  value={formData.material}
                  onChange={(e) =>
                    setFormData({ ...formData, material: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("description")}
                </label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                {editingProduct ? t("update") : t("add")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("price")}</TableHead>
            <TableHead>{t("category")}</TableHead>
            <TableHead>{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {product.price} {t("shekel")}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProducts;
