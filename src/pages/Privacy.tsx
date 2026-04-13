import { Link } from "react-router-dom";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import logo from "@/assets/logo-completo.svg";

const PRINCIPLES = ["1", "2", "3", "4", "5"] as const;

const PrivacyContent = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Minimal nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Writeopia"
              className={`h-7 ${theme === "dark" ? "brightness-0 invert" : ""}`}
            />
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle language"
            >
              <span className="text-xs font-semibold">{language === "en" ? "PT" : "EN"}</span>
            </button>
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("privacy.back")}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 pb-32 px-6 md:px-12 lg:px-20">

          {/* Header block */}
          <div className="mb-20">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-medium">
              {t("privacy.label")}
            </p>
            <h1 className="font-display font-bold text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-10">
              {t("privacy.title1")}<br />
              <span className="text-gradient">{t("privacy.title2")}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {t("privacy.intro")}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 mb-20" />

          {/* Principles */}
          <div className="mb-20">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-12 font-medium">
              {t("privacy.principles.label")}
            </p>
            <ol>
              {PRINCIPLES.map((n) => (
                <li key={n} className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_2fr_3fr] gap-x-8 md:gap-x-16 items-baseline border-t border-border/50 py-8">
                  <span className="text-xs text-muted-foreground/40 font-mono leading-none pt-1">
                    {n.padStart(2, "0")}
                  </span>
                  <p className="font-display font-bold text-xl md:text-2xl text-foreground leading-snug">
                    {t(`privacy.principle.${n}.title`)}
                  </p>
                  <p className="col-start-2 md:col-start-3 text-sm text-muted-foreground leading-relaxed mt-2 md:mt-0">
                    {t(`privacy.principle.${n}.desc`)}
                  </p>
                </li>
              ))}
              <li className="border-t border-border/50" />
            </ol>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 mb-20" />

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-12 font-medium">
              {t("privacy.contact.label")}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-4 font-medium">
                  {t("privacy.contact.address.label")}
                </p>
                <p className="text-muted-foreground leading-loose">
                  Writeopia<br />
                  Raoul Wallenbergplantsoen 12<br />
                  Gouda — 2801 BB<br />
                  Netherlands
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-4 font-medium">
                  {t("privacy.contact.email.label")}
                </p>
                <a
                  href="mailto:privacy@writeopia.io"
                  className="text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                >
                  privacy@writeopia.io
                </a>
                <p className="text-muted-foreground/60 text-sm mt-5 leading-relaxed">
                  {t("privacy.contact.note")}
                </p>
              </div>
            </div>
          </div>

      </main>

      {/* Minimal footer */}
      <footer className="py-8 border-t border-border/40">
        <div className="container mx-auto px-4 flex justify-center">
          <p className="text-sm text-muted-foreground">© 2026 Writeopia.</p>
        </div>
      </footer>
    </div>
  );
};

const Privacy = () => (
  <ThemeProvider>
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  </ThemeProvider>
);

export default Privacy;
