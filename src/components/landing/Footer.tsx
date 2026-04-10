import { Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import logo from "@/assets/logo-completo.svg";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/writeopia/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/Writeopia/Writeopia", label: "GitHub" },
];

const Footer = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <footer className="pt-12 pb-8 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-6">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className={`h-8 ${theme === "dark" ? "brightness-0 invert" : ""}`} />
          </a>
          <p className="text-muted-foreground max-w-xs text-sm">{t("footer.desc")}</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors">
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col items-center gap-2">
          <p className="text-muted-foreground text-sm">{t("footer.copyright")}</p>
          <span className="text-sm text-muted-foreground">{t("footer.madeWith")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
