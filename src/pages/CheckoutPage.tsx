import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatPrice } from "@/lib/utils";

const checkoutSchema = z.object({
  phone: z.string().min(10, "מספר טלפון חייב להכיל לפחות 10 ספרות"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  address: z
    .object({
      street: z.string().min(1, "שדה חובה"),
      number: z.string().min(1, "שדה חובה"),
      floor: z.string().optional(),
      apartment: z.string().optional(),
      notes: z.string().optional(),
    })
    .optional(),
  invoice: z.object({
    firstName: z.string().min(1, "שדה חובה"),
    lastName: z.string().min(1, "שדה חובה"),
    companyName: z.string().optional(),
    companyNumber: z.string().optional(),
  }),
  shippingMethod: z.enum(["pickup", "delivery"]),
  couponCode: z.string().optional(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "חובה לאשר את מדיניות הפרטיות",
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { items, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: "pickup",
      privacyPolicy: false,
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      // Here we would integrate with the payment providers
      // For now, we'll just simulate a successful payment
      console.log("Processing payment with data:", data);

      // Clear cart and redirect to success page
      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const calculateTotal = () => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingCost =
      shippingMethod === "delivery"
        ? items.reduce((sum, item) => sum + (item.shippingFee || 0), 0)
        : 0;
    return subtotal + shippingCost - couponDiscount;
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">{t("yourCart")}</h2>
        <p className="text-lg text-muted-foreground mb-4">{t("cartEmpty")}</p>
        <Button onClick={() => navigate("/shop")}>
          {t("continueShopping")}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-right">{t("checkout")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-right">{t("orderSummary")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="text-right">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {t("quantity")}: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t("shipping")}:</span>
                  <span>
                    {shippingMethod === "delivery"
                      ? formatPrice(
                          items.reduce(
                            (sum, item) => sum + (item.shippingFee || 0),
                            0
                          )
                        )
                      : t("freeShipping")}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{t("coupon")}:</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>{t("total")}:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Shipping Method */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-right">
              {t("shippingMethod")}
            </h2>
            <RadioGroup
              value={shippingMethod}
              onValueChange={(value: "pickup" | "delivery") =>
                setShippingMethod(value)
              }
              className="flex flex-col gap-4"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="cursor-pointer">
                  {t("pickup")}
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery" className="cursor-pointer">
                  {t("delivery")}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-right">
              {t("contactInfo")}
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">{t("phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="text-right"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="text-right"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {shippingMethod === "delivery" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-right">
                {t("shippingAddress")}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="street">{t("street")}</Label>
                  <Input
                    id="street"
                    {...register("address.street")}
                    className="text-right"
                  />
                  {errors.address?.street && (
                    <p className="text-red-500 text-sm">
                      {errors.address.street.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="number">{t("number")}</Label>
                  <Input
                    id="number"
                    {...register("address.number")}
                    className="text-right"
                  />
                  {errors.address?.number && (
                    <p className="text-red-500 text-sm">
                      {errors.address.number.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="floor">{t("floor")}</Label>
                  <Input
                    id="floor"
                    {...register("address.floor")}
                    className="text-right"
                  />
                </div>
                <div>
                  <Label htmlFor="apartment">{t("apartment")}</Label>
                  <Input
                    id="apartment"
                    {...register("address.apartment")}
                    className="text-right"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">{t("deliveryNotes")}</Label>
                  <Input
                    id="notes"
                    {...register("address.notes")}
                    className="text-right"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Invoice Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-right">
              {t("invoiceDetails")}
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName">{t("firstName")}</Label>
                <Input
                  id="firstName"
                  {...register("invoice.firstName")}
                  className="text-right"
                />
                {errors.invoice?.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.invoice.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">{t("lastName")}</Label>
                <Input
                  id="lastName"
                  {...register("invoice.lastName")}
                  className="text-right"
                />
                {errors.invoice?.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.invoice.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="companyName">
                  {t("companyName")} ({t("optional")})
                </Label>
                <Input
                  id="companyName"
                  {...register("invoice.companyName")}
                  className="text-right"
                />
              </div>
              <div>
                <Label htmlFor="companyNumber">
                  {t("companyNumber")} ({t("optional")})
                </Label>
                <Input
                  id="companyNumber"
                  {...register("invoice.companyNumber")}
                  className="text-right"
                />
              </div>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-right">
              {t("couponCode")}
            </h2>
            <div className="flex gap-2">
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder={t("enterCouponCode")}
                className="text-right"
              />
              <Button
                type="button"
                onClick={() => {
                  // Here we would validate the coupon code with the backend
                  setCouponDiscount(50); // Example discount
                }}
              >
                {t("apply")}
              </Button>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox id="privacyPolicy" {...register("privacyPolicy")} />
            <Label htmlFor="privacyPolicy" className="text-sm">
              {t("privacyPolicyAgreement")}
              <a
                href="/privacy-policy"
                className="text-blue-600 hover:underline mr-1"
              >
                {t("privacyPolicy")}
              </a>
            </Label>
          </div>
          {errors.privacyPolicy && (
            <p className="text-red-500 text-sm">
              {errors.privacyPolicy.message}
            </p>
          )}

          {/* Payment Buttons */}
          <div className="space-y-4">
            <Button type="submit" className="w-full" size="lg">
              {t("payWithCreditCard")}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              size="lg"
            >
              {t("payWithBit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
