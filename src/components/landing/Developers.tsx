import { Code2, Blocks, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const features = [
  { icon: Code2, titleKey: "dev.f1.title", descKey: "dev.f1.desc" },
  { icon: Blocks, titleKey: "dev.f2.title", descKey: "dev.f2.desc" },
  { icon: Github, titleKey: "dev.f3.title", descKey: "dev.f3.desc" },
];

const Developers = () => {
  const { t } = useLanguage();

  return (
    <section id="developers" className="py-24 border-t border-border/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            {t("dev.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t("dev.title")}
            <span className="text-primary">{t("dev.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("dev.subtitle")}
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {features.map((f, i) => (
            <motion.div
              key={f.titleKey}
              className="group text-center space-y-3 p-6 rounded-2xl border border-transparent hover:border-border/50 hover:bg-muted/20 transition-colors"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <f.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-semibold text-foreground">{t(f.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(f.descKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* Code snippet preview */}
        <motion.div
          className="max-w-2xl mx-auto mb-12 rounded-xl border border-border/50 bg-muted/30 overflow-hidden shadow-lg shadow-primary/5"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">build.gradle.kts</span>
          </div>
          <pre className="p-6 text-sm font-mono text-foreground/80 overflow-x-auto">
            <code>{`implementation("io.writeopia:writeopia-core:1.0.0")
implementation("io.writeopia:writeopia-ui:1.0.0")

// Optional modules
implementation("io.writeopia:writeopia-persistence:1.0.0")
implementation("io.writeopia:writeopia-network:1.0.0")`}</code>
          </pre>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <a href="/docs">
            <Button variant="outline" size="lg" className="gap-2">
              <Code2 className="w-4 h-4" />
              {t("dev.cta")}
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Developers;
