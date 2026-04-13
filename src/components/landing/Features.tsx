import { HardDrive, Bot, Unlock, Palette, Globe, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const featureIcons = [HardDrive, Bot, Unlock, Palette, Globe, ShieldCheck];
const featureKeys = ["1", "2", "3", "4", "5", "6"];

const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-surface" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t("features.label")}</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            {t("features.title")}
            <span className="text-gradient">{t("features.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("features.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 lg:p-8 rounded-2xl glass border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3 text-foreground">{t(`features.${key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`features.${key}.desc`)}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
