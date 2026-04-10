import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Mail, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().trim().email().max(255);

const CTA = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({
        title: language === "en" ? "Invalid email" : "Email inválido",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data });

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({
          title: language === "en" ? "Already subscribed!" : "Já inscrito!",
          description: language === "en" ? "This email is already on our list." : "Este email já está na nossa lista.",
        });
        setSubscribed(true);
      } else {
        toast({
          title: language === "en" ? "Error" : "Erro",
          description: language === "en" ? "Please try again later." : "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
      return;
    }

    setSubscribed(true);
    toast({
      title: language === "en" ? "Subscribed!" : "Inscrito!",
      description: language === "en" ? "You'll receive updates about Writeopia." : "Você receberá novidades sobre o Writeopia.",
    });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl glass border border-primary/10 shadow-elevated overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t("cta.badge")}</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-foreground">
              {t("cta.title")}
              <span className="text-gradient">{t("cta.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">{t("cta.subtitle")}</p>

            {/* Buttons */}
            <div className="flex items-center justify-center mb-10">
              <Link to="/download">
                <Button variant="hero" size="xl" className="group">
                  {t("hero.demo")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Newsletter form */}
            <div className="max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-3">
                {language === "en"
                  ? "Join our newsletter to stay updated"
                  : "Inscreva-se na newsletter para receber novidades"}
              </p>
              {subscribed ? (
                <div className="flex items-center justify-center gap-2 text-primary font-medium">
                  <Check className="w-5 h-5" />
                  {language === "en" ? "You're subscribed!" : "Você está inscrito!"}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <Input
                    type="email"
                    placeholder={language === "en" ? "Enter your email" : "Seu email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 bg-card/80 border-border/60"
                  />
                  <Button type="submit" variant="default" size="lg" className="h-12 px-6 gap-2" disabled={loading}>
                    <Mail className="w-4 h-4" />
                    {loading
                      ? (language === "en" ? "..." : "...")
                      : (language === "en" ? "Subscribe" : "Inscrever")}
                  </Button>
                </form>
              )}
              <p className="text-xs text-muted-foreground/70 mt-2">
                {language === "en"
                  ? "No spam. Unsubscribe anytime."
                  : "Sem spam. Cancele quando quiser."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
