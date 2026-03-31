import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-completo.svg";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Track which section is visible on the home page
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sectionIds = ["features", "security", "pricing", "developers"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const navLinks = [
    { label: t("nav.features"), href: isHome ? "#features" : "/#features", sectionId: "features" },
    { label: t("nav.security"), href: isHome ? "#security" : "/#security", sectionId: "security" },
    { label: t("nav.pricing"), href: isHome ? "#pricing" : "/#pricing", sectionId: "pricing" },
    { label: t("nav.docs"), href: "/docs", sectionId: "" },
  ];

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (link.href === "/docs") {
      return location.pathname === "/docs";
    }
    if (isHome && link.sectionId) {
      return activeSection === link.sectionId;
    }
    return false;
  };

  const handleAnchorClick = (href: string) => {
    setMobileMenuOpen(false);
    if (isHome && href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderLink = (link: typeof navLinks[0], mobile = false) => {
    const active = isLinkActive(link);
    const baseClass = cn(
      "text-sm transition-colors",
      mobile ? "block py-1.5" : "",
      active
        ? "text-primary font-medium"
        : "text-muted-foreground hover:text-foreground"
    );

    if (link.href.startsWith("#")) {
      return (
        <a
          key={link.href}
          href={link.href}
          onClick={() => handleAnchorClick(link.href)}
          className={baseClass}
        >
          {link.label}
        </a>
      );
    }

    if (link.href.startsWith("/#")) {
      return (
        <Link
          key={link.href}
          to={link.href}
          onClick={() => setMobileMenuOpen(false)}
          className={baseClass}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <Link
        key={link.href}
        to={link.href}
        onClick={() => {
          setMobileMenuOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={baseClass}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Writeopia"
              className={`h-7 ${theme === "dark" ? "brightness-0 invert" : ""}`}
            />
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => renderLink(link))}
          </nav>

          {/* Right actions — desktop */}
          <div className="hidden md:flex items-center gap-1">
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
            <Link to="/download">
              <Button size="sm" className="ml-2 h-8 text-xs px-4">
                {t("nav.cta")}
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40 space-y-3">
            {navLinks.map((link) => renderLink(link, true))}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-xs font-semibold">{language === "en" ? "PT" : "EN"}</span>
              </button>
            </div>
            <Link to="/download" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="w-full h-9 text-xs mt-2">
                {t("nav.cta")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
