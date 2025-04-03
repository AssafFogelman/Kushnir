import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shkolnik Carpentry</h3>
            <p className="text-sm text-muted-foreground">
              {t("companyDescription")}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("categories")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop?category=boards"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("boards")}
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=beams"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("beams")}
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=furniture"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("furniture")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact")}</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                {t("phone")}: +972-50-123-4567
              </li>
              <li className="text-sm text-muted-foreground">
                {t("email")}: info@shkolnik.com
              </li>
              <li className="text-sm text-muted-foreground">
                {t("address")}: 123 Wood Street, Tel Aviv, Israel
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("language")}</h3>
            <button
              onClick={() => setLanguage(language === "he" ? "en" : "he")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {language === "he" ? "English" : "עברית"}
            </button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Shkolnik Carpentry. {t("rights")}
          </p>
          <div className="mt-2">
            <Link to="/privacy" className="hover:text-foreground">
              {t("privacy")}
            </Link>
            <span className="mx-2">•</span>
            <Link to="/terms" className="hover:text-foreground">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
