import React, { Suspense } from "react"
import { Mail } from "lucide-react"
import { useTranslation } from "react-i18next"

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with our team",
}

export default function ContactPage() {
  const { t } = useTranslation()
  
  return (
    <Suspense>
      <div className="flex min-h-screen w-full py-12 px-6">
        <div className="mx-auto max-w-md space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("contact_title", "Contact Us")}
          </h1>

          <p className="text-muted-foreground">
            {t("contact_subtitle", "We'd love to hear from you. Have questions, feedback, or need assistance?")}      
          </p>

          <div className="rounded-lg border bg-card p-8 shadow-sm">
            <p className="text-lg">{t("contact_send_email", "You can send an email at")}</p>
            <a
              href="mailto:hello@writeopia.io"
              className="mt-2 block text-xl font-medium text-primary hover:underline md:text-2xl"
            >
              hello@writeopia.io
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            {t("contact_time_reply", "We typically respond to all inquiries within 24-48 hours during business days.")}
          </p>
        </div>
      </div>
    </Suspense>
  )
}

