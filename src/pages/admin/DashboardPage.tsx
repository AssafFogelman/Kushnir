import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

const DashboardPage = () => {
  const { t, direction } = useLanguage();

  // Mock data - replace with API calls later
  const stats = [
    {
      title: t("totalProducts"),
      value: "24",
      icon: Package,
      description: t("activeProducts"),
    },
    {
      title: t("totalOrders"),
      value: "156",
      icon: ShoppingCart,
      description: t("thisMonth"),
    },
    {
      title: t("totalCustomers"),
      value: "89",
      icon: Users,
      description: t("registeredUsers"),
    },
    {
      title: t("totalRevenue"),
      value: "₪45,231",
      icon: DollarSign,
      description: t("thisMonth"),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{t("dashboard")}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
