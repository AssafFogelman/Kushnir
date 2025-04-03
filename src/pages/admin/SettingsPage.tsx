import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPage = () => {
  const { t, direction } = useLanguage();
  const [settings, setSettings] = useState({
    storeName: "Shkolnik",
    currency: "ILS",
    language: "he",
    taxRate: 17,
    shippingCost: 0,
    freeShippingThreshold: 1000,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]:
        name === "taxRate" ||
        name === "shippingCost" ||
        name === "freeShippingThreshold"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update
    console.log("Settings updated:", settings);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{t("settings")}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("generalSettings")}</CardTitle>
            <CardDescription>{t("generalSettingsDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("storeName")}
              </label>
              <Input
                name="storeName"
                value={settings.storeName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("currency")}
              </label>
              <Select
                value={settings.currency}
                onValueChange={(value) =>
                  setSettings((prev) => ({ ...prev, currency: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("selectCurrency")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ILS">₪ (ILS)</SelectItem>
                  <SelectItem value="USD">$ (USD)</SelectItem>
                  <SelectItem value="EUR">€ (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("language")}
              </label>
              <Select
                value={settings.language}
                onValueChange={(value) =>
                  setSettings((prev) => ({ ...prev, language: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="he">עברית</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("taxSettings")}</CardTitle>
            <CardDescription>{t("taxSettingsDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("taxRate")} (%)
              </label>
              <Input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleInputChange}
                min="0"
                max="100"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("shippingSettings")}</CardTitle>
            <CardDescription>
              {t("shippingSettingsDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("shippingCost")} ({settings.currency})
              </label>
              <Input
                type="number"
                name="shippingCost"
                value={settings.shippingCost}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("freeShippingThreshold")} ({settings.currency})
              </label>
              <Input
                type="number"
                name="freeShippingThreshold"
                value={settings.freeShippingThreshold}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">{t("saveChanges")}</Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
