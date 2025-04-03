import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import "@/styles/wood-pattern.css";

const HomePage = () => {
  const { t, direction } = useLanguage();

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center wood-pattern">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t("heroTitle")}
          </h1>
          <p className="text-xl md:text-2xl mb-8">{t("heroSubtitle")}</p>
          <Button size="lg" asChild>
            <Link to="/shop">{t("viewAll")}</Link>
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-4 ${direction === "rtl" ? "md:order-2" : ""}`}
          >
            <h2 className="text-3xl font-bold">{t("aboutUs")}</h2>
            <p className="text-lg text-muted-foreground">{t("aboutUsText")}</p>
          </div>
          <div className={`${direction === "rtl" ? "md:order-1" : ""}`}>
            <img
              src="/images/workshop.jpg"
              alt="Workshop"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("whyChooseUs")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{t("quality")}</h3>
              <p className="text-muted-foreground">{t("qualityText")}</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                {t("craftsmanship")}
              </h3>
              <p className="text-muted-foreground">{t("craftsmanshipText")}</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                {t("customization")}
              </h3>
              <p className="text-muted-foreground">{t("customizationText")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">{t("ctaTitle")}</h2>
          <p className="text-xl text-muted-foreground">{t("ctaSubtitle")}</p>
          <Button size="lg" asChild>
            <Link to="/contact">{t("ctaButton")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
