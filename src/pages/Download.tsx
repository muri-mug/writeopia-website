import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download as DownloadIcon, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/landing/Header";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type Platform = "windows" | "linux" | "mac";

const detectPlatform = (): Platform => {
  const ua = navigator.userAgent.toLowerCase();
  if (/macintosh|mac os x/.test(ua)) return "mac";
  if (/windows/.test(ua)) return "windows";
  return "linux";
};

const platformLabels: Record<Platform, string> = {
  windows: "Windows",
  linux: "Linux",
  mac: "Mac",
};

const betaSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
});

const DownloadContent = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [platform, setPlatform] = useState<Platform>("linux");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = betaSchema.safeParse({ name, email });
    if (!parsed.success) {
      toast({
        title: language === "en" ? "Please fill in all fields correctly" : "Preencha todos os campos corretamente",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ name: parsed.data.name, email: parsed.data.email });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({
          title: language === "en" ? "Already registered!" : "Já cadastrado!",
          description: language === "en" ? "This email is already on our list." : "Este email já está na nossa lista.",
        });
        setRegistered(true);
      } else {
        toast({
          title: language === "en" ? "Error" : "Erro",
          description: language === "en" ? "Please try again later." : "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
      return;
    }

    setRegistered(true);
    toast({
      title: language === "en" ? "Welcome to the Beta!" : "Bem-vindo ao Beta!",
      description: language === "en" ? "You're now a beta tester. Download below!" : "Você agora é um beta tester. Baixe abaixo!",
    });
  };

  const handleDownload = () => {
    window.open("https://writeopia.io/download", "_blank");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center pt-14 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        </div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Left: Beta registration form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
                {language === "en"
                  ? <>Become a <span className="text-gradient">Beta Tester</span></>
                  : <>Seja um <span className="text-gradient">Beta Tester</span></>}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0">
                {language === "en"
                  ? "Register to join the beta and download the latest version."
                  : "Cadastre-se para participar do beta e baixar a versão mais recente."}
              </p>

              <div className="max-w-md mx-auto lg:mx-0">
                {registered ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-medium justify-center lg:justify-start">
                      <Check className="w-5 h-5" />
                      {language === "en" ? "You're registered!" : "Você está cadastrado!"}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {language === "en"
                        ? `Download the latest version for ${platformLabels[platform]}:`
                        : `Baixe a versão mais recente para ${platformLabels[platform]}:`}
                    </p>

                    <Button onClick={handleDownload} variant="hero" size="xl" className="group">
                      <DownloadIcon className="w-5 h-5" />
                      {language === "en" ? `Download for ${platformLabels[platform]}` : `Baixar para ${platformLabels[platform]}`}
                    </Button>

                    {/* Platform selector */}
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {(Object.keys(platformLabels) as Platform[]).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPlatform(p)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                            platform === p
                              ? "bg-primary/20 border-primary/50 text-foreground shadow-glow"
                              : "glass border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                          }`}
                        >
                          {platformLabels[p]}
                        </button>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground/70 mt-2">
                      {language === "en"
                        ? "Available on Windows, Mac & Linux"
                        : "Disponível para Windows, Mac e Linux"}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <Input
                      type="text"
                      placeholder={language === "en" ? "Your name" : "Seu nome"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 bg-card/80 border-border/60"
                    />
                    <Input
                      type="email"
                      placeholder={language === "en" ? "Your email" : "Seu email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-card/80 border-border/60"
                    />
                    <Button type="submit" variant="hero" size="xl" className="w-full group" disabled={loading}>
                      {loading
                        ? "..."
                        : language === "en"
                          ? "Join Beta & Download"
                          : "Participar do Beta & Baixar"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-xs text-muted-foreground/70 text-center">
                      {language === "en"
                        ? "No spam. We only send important updates."
                        : "Sem spam. Enviamos apenas atualizações importantes."}
                    </p>
                    <p className="text-xs text-muted-foreground/70 text-center">
                      {language === "en"
                        ? "Available on Windows, Mac & Linux"
                        : "Disponível para Windows, Mac e Linux"}
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right: App preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden glass border border-border/50 shadow-elevated">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-card/60">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/70" />
                    <div className="w-3 h-3 rounded-full bg-accent/70" />
                    <div className="w-3 h-3 rounded-full bg-primary/70" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="text-xs text-muted-foreground font-medium">Writeopia</span>
                  </div>
                </div>
                <div className="p-6 md:p-8 bg-card/40 min-h-[350px] flex flex-col">
                  <div className="flex gap-4 mb-6">
                    <div className="w-48 space-y-3 hidden md:block">
                      <div className="text-xs text-muted-foreground font-medium mb-3">Folders</div>
                      {["Welcome!", "Using AI", "Saving Notes", "Using Commands"].map((item) => (
                        <div key={item} className="text-sm text-muted-foreground/80 hover:text-foreground transition-colors cursor-default py-1">
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 rounded-xl border border-border/30 p-6 bg-background/50">
                      <div className="w-full h-6 rounded bg-primary/20 mb-4" />
                      <h3 className="font-display font-bold text-lg mb-2 text-foreground">Privacy matters</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === "en"
                          ? "Tap here to write the next big thing. Your ideas deserve privacy and freedom."
                          : "Toque aqui para escrever a próxima grande ideia. Suas ideias merecem privacidade e liberdade."}
                      </p>
                      <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/30">
                        <div className="text-xs text-muted-foreground mb-1 font-medium">AI generated</div>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          {language === "en"
                            ? "Privacy is essential for personal freedom and dignity..."
                            : "Privacidade é essencial para liberdade pessoal e dignidade..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-border/40">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Writeopia.</p>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {language === "en" ? "Privacy" : "Privacidade"}
          </a>
        </div>
      </footer>
    </div>
  );
};

const Download = () => (
  <ThemeProvider>
    <LanguageProvider>
      <DownloadContent />
    </LanguageProvider>
  </ThemeProvider>
);

export default Download;