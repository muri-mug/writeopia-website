import { Link, Mail, MapPin, Phone } from "lucide-react"
import React from 'react';
import { useTranslation } from "react-i18next";

export default function AddressSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 text-center flex flex-col items-center">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-6">{t('contact_info', 'Contact Information')}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{t('our_address', 'Our Address')}</h3>
            </div>
            <address className="not-italic text-muted-foreground">
                      <a 
                href="https://taipuscode.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline"
              >
                Taipus Code
              </a>
              <br />
              Rua Francisco Deslandes, 648, apto 1103                          
              <br />
              Belo Horizonte, MG 30310-530
              <br />
              {t('country', 'Brazil')}
            </address>
          </div>          
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Email</h3>
            </div>
            <p className="text-muted-foreground">
              <a href="mailto:privacy@writeopia.com" className="hover:underline">
                privacy@writeopia.io
              </a>
            </p>

            <p className="text-muted-foreground">
              <a href="mailto:leandro@taipuscode.com" className="hover:underline">
                leandro@taipuscode.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t('privacy_footer', 'For privacy-related inquiries or to exercise your rights regarding your personal data, please contact us using the information above.')}           
          </p>
        </div>
      </div>
    </section>
  )
}

