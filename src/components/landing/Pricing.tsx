import { Button } from "@/components/ui/button";
import { Check, Building2, User, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t("pricing.individual"),
      icon: User,
      description: t("pricing.individualDesc"),
      price: t("pricing.custom"),
      period: "",
      featureKeys: ["pricing.i.f1", "pricing.i.f2", "pricing.i.f3", "pricing.i.f4", "pricing.i.f5", "pricing.i.f6"],
      popular: true,
      buttonVariant: "default" as const,
    },
    {
      name: t("pricing.team"),
      icon: Building2,
      description: t("pricing.teamDesc"),
      price: "",
      period: "",
      featureKeys: ["pricing.t.f1", "pricing.t.f2", "pricing.t.f3", "pricing.t.f4", "pricing.t.f5", "pricing.t.f6", "pricing.t.f7", "pricing.t.f8"],
      popular: false,
      buttonVariant: "outline" as const,
    },
    {
      name: t("pricing.enterprise"),
      icon: Heart,
      description: t("pricing.enterpriseDesc"),
      price: "",
      period: "",
      featureKeys: ["pricing.e.f1", "pricing.e.f2", "pricing.e.f3", "pricing.e.f4", "pricing.e.f5", "pricing.e.f6", "pricing.e.f7", "pricing.e.f8"],
      popular: false,
      buttonVariant: "outline" as const,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-surface" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t("pricing.label")}</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            {t("pricing.title")}
            <span className="text-gradient">{t("pricing.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-elevated ${
                plan.popular ? "glass border-primary/50 shadow-glow" : "glass border-border/50 hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary text-sm font-semibold text-white">
                  {t("pricing.popular")}
                </div>
              )}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${plan.popular ? "bg-gradient-primary shadow-glow" : "bg-muted"}`}>
                <plan.icon className={`w-7 h-7 ${plan.popular ? "text-white" : "text-primary"}`} />
              </div>
              <h3 className="font-display font-bold text-2xl mb-2 text-foreground">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="font-display font-bold text-4xl text-foreground">
                  {plan.price || t("pricing.ctaSales")}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.featureKeys.map((key) => (
                  <li key={key} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{t(key)}</span>
                  </li>
                ))}
              </ul>
              <Link to="/download" className="w-full">
                <Button variant={plan.buttonVariant} size="lg" className="w-full">
                  {plan.price ? t("pricing.ctaStart") : t("pricing.ctaSales")}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
