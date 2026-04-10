import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const testimonialKeys = ["1", "2", "3", "4", "5", "6"];

const Testimonials = () => {
  const { t } = useLanguage();
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            {t("testimonials.label")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            {t("testimonials.title")}
            <span className="text-gradient">{t("testimonials.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("testimonials.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplayPlugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonialKeys.map((key) => (
                <CarouselItem key={key} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group p-6 lg:p-8 rounded-2xl glass border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-foreground leading-relaxed mb-6 flex-1 italic">
                      "{t(`testimonials.${key}.quote`)}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm shrink-0">
                        {t(`testimonials.${key}.name`).split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-display font-semibold text-sm text-foreground">
                          {t(`testimonials.${key}.name`)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t(`testimonials.${key}.role`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 border-border hover:bg-muted hover:border-primary/50" />
              <CarouselNext className="static translate-y-0 border-border hover:bg-muted hover:border-primary/50" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
