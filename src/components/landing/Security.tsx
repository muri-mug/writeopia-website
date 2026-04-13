import { Shield, Key, Eye, Server, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const securityFeatureKeys = ["f1", "f2", "f3", "f4", "f5", "f6"];

const Security = () => {
  const { t } = useLanguage();

  return (
    <section id="security" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t("security.label")}</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
              {t("security.title")}
              <span className="text-gradient">{t("security.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{t("security.subtitle")}</p>
            <ul className="space-y-4">
              {securityFeatureKeys.map((key, index) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{t(`security.${key}`)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative p-8 rounded-3xl glass border border-border/50 shadow-elevated">
              <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-8 shadow-glow animate-pulse-glow">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{t("security.encryption")}</span>
                  </div>
                  <p className="font-display font-bold text-2xl text-foreground">AES-256</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{t("security.uptime")}</span>
                  </div>
                  <p className="font-display font-bold text-2xl text-foreground">99.99%</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{t("security.datacenters")}</span>
                  </div>
                  <p className="font-display font-bold text-2xl text-foreground">{t("security.datacentersValue")}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{t("security.certifications")}</span>
                  </div>
                  <p className="font-display font-bold text-2xl text-foreground">ISO 27001</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/30 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Security;
