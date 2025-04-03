/* cspell:disable */
import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "he" | "en";
type Direction = "rtl" | "ltr";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  he: {
    home: "בית",
    shop: "חנות",
    cart: "עגלה",
    categories: "קטגוריות",
    boards: "לוחות",
    beams: "קורות",
    furniture: "ריהוט",
    contact: "צור קשר",
    phone: "טלפון",
    email: 'דוא"ל',
    address: "כתובת",
    privacy: "מדיניות פרטיות",
    terms: "תנאי שימוש",
    rights: "כל הזכויות שמורות",
    companyDescription:
      "יצירת עבודות עץ איכותיות מאז 1990. המקור המהימן שלך לריהוט ומוצרי עץ מותאמים אישית.",
    // Home page translations
    heroTitle: "ריהוט עץ מותאם אישית",
    heroSubtitle: "יצירת עבודות עץ איכותיות בדיוק לפי מידותיך",
    featuredProducts: "מוצרים מומלצים",
    viewAll: "צפה בכל המוצרים",
    aboutUs: "אודותינו",
    aboutUsText:
      "אנחנו מתמחים בייצור ריהוט עץ מותאם אישית באיכות הגבוהה ביותר. כל מוצר שלנו מיוצר בעבודת יד עם תשומת לב לפרטים הקטנים ביותר.",
    whyChooseUs: "למה לבחור בנו?",
    quality: "איכות",
    qualityText: "אנחנו משתמשים רק בחומרי הגלם הטובים ביותר",
    craftsmanship: "אומנות",
    craftsmanshipText: "כל מוצר מיוצר בעבודת יד על ידי בעלי מקצוע מיומנים",
    customization: "התאמה אישית",
    customizationText: "אנחנו מתאימים כל מוצר לצרכים הספציפיים שלך",
    ctaTitle: "מוכנים להתחיל?",
    ctaSubtitle: "צרו איתנו קשר עוד היום לקבלת הצעת מחיר",
    ctaButton: "צור קשר",
    // Product related translations
    addToCart: "הוסף לעגלה",
    price: "מחיר",
    shekel: "₪",
    dimensions: "מידות",
    material: "חומר",
    description: "תיאור",
    filterBy: "סנן לפי",
    sortBy: "מיין לפי",
    priceLowToHigh: "מחיר: מהנמוך לגבוה",
    priceHighToLow: "מחיר: מהגבוה לנמוך",
    nameAsc: "שם: א-ת",
    nameDesc: "שם: ת-א",
    allCategories: "כל הקטגוריות",
    search: "חיפוש",
    noProducts: "לא נמצאו מוצרים",
    // Cart related translations
    yourCart: "העגלה שלך",
    cartEmpty: "העגלה ריקה",
    continueShopping: "המשך בקניות",
    proceedToCheckout: "המשך לתשלום",
    quantity: "כמות",
    remove: "הסר",
    subtotal: "סכום ביניים",
    total: "סה״כ",
    shipping: "משלוח",
    freeShipping: "משלוח חינם",
    // Checkout related translations
    checkout: "תשלום",
    shippingMethod: "שיטת משלוח",
    pickup: "איסוף עצמי (ללא עלות)",
    delivery: "משלוח",
    contactInfo: "פרטי התקשרות",
    shippingAddress: "כתובת למשלוח",
    street: "רחוב",
    number: "מספר",
    floor: "קומה",
    apartment: "מספר דירה",
    deliveryNotes: "הערות למשלוח",
    invoiceDetails: "פרטי חשבונית",
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    companyName: "שם החברה",
    companyNumber: "ח.פ.",
    optional: "אופציונלי",
    couponCode: "קוד קופון",
    enterCouponCode: "הזן קוד קופון",
    apply: "החל",
    privacyPolicyAgreement: "קראתי ואני מסכים ל",
    privacyPolicy: "מדיניות הפרטיות",
    payWithCreditCard: "שלם עם כרטיס אשראי",
    payWithBit: "שלם עם ביט",
    orderSummary: "סיכום הזמנה",
    placeOrder: "שלח הזמנה",
  },
  en: {
    home: "Home",
    shop: "Shop",
    cart: "Cart",
    categories: "Categories",
    boards: "Boards",
    beams: "Beams",
    furniture: "Furniture",
    contact: "Contact",
    phone: "Phone",
    email: "Email",
    address: "Address",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    rights: "All rights reserved",
    companyDescription:
      "Crafting quality woodwork since 1990. Your trusted source for custom furniture and wood products.",
    // Home page translations
    heroTitle: "Custom Wood Furniture",
    heroSubtitle:
      "Crafting quality woodwork tailored to your exact specifications",
    featuredProducts: "Featured Products",
    viewAll: "View All Products",
    aboutUs: "About Us",
    aboutUsText:
      "We specialize in crafting custom wood furniture of the highest quality. Each piece is handcrafted with attention to the finest details.",
    whyChooseUs: "Why Choose Us?",
    quality: "Quality",
    qualityText: "We use only the finest materials",
    craftsmanship: "Craftsmanship",
    craftsmanshipText: "Each piece is handcrafted by skilled artisans",
    customization: "Customization",
    customizationText: "We tailor each piece to your specific needs",
    ctaTitle: "Ready to Get Started?",
    ctaSubtitle: "Contact us today for a free quote",
    ctaButton: "Contact Us",
    // Product related translations
    addToCart: "Add to Cart",
    price: "Price",
    shekel: "₪",
    dimensions: "Dimensions",
    material: "Material",
    description: "Description",
    filterBy: "Filter by",
    sortBy: "Sort by",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    nameAsc: "Name: A-Z",
    nameDesc: "Name: Z-A",
    allCategories: "All Categories",
    search: "Search",
    noProducts: "No products found",
    // Cart related translations
    yourCart: "Your Cart",
    cartEmpty: "Your cart is empty",
    continueShopping: "Continue Shopping",
    proceedToCheckout: "Proceed to Checkout",
    quantity: "Quantity",
    remove: "Remove",
    subtotal: "Subtotal",
    total: "Total",
    shipping: "Shipping",
    freeShipping: "Free Shipping",
    // Checkout related translations
    checkout: "Checkout",
    shippingMethod: "Shipping Method",
    pickup: "Pickup (Free)",
    delivery: "Delivery",
    contactInfo: "Contact Information",
    shippingAddress: "Shipping Address",
    street: "Street",
    number: "Number",
    floor: "Floor",
    apartment: "Apartment",
    deliveryNotes: "Delivery Notes",
    invoiceDetails: "Invoice Details",
    firstName: "First Name",
    lastName: "Last Name",
    companyName: "Company Name",
    companyNumber: "Company Number",
    optional: "Optional",
    couponCode: "Coupon Code",
    enterCouponCode: "Enter Coupon Code",
    apply: "Apply",
    privacyPolicyAgreement: "I have read and agree to the",
    privacyPolicy: "Privacy Policy",
    payWithCreditCard: "Pay with Credit Card",
    payWithBit: "Pay with Bit",
    orderSummary: "Order Summary",
    placeOrder: "Place Order",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("he");
  const direction = language === "he" ? "rtl" : "ltr";

  const t = (key: string) =>
    translations[language][
      key as keyof (typeof translations)[typeof language]
    ] || key;

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      <div dir={direction} lang={language}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
