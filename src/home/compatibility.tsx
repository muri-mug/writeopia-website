import React, { Suspense } from "react"
import { Smartphone, Monitor, AppWindow, Bot, Laptop, ChevronsLeftRightEllipsis } from 'lucide-react';
import { useTranslation } from "react-i18next";


export default function Component() {
  const platforms = [
    { name: 'Windows', color: 'blue'},
    { name: 'Linux', color: 'orange'},
    { name: 'Mac', color: 'gray'},
    { name: 'iOS', color: 'red'},
    { name: 'Android', color: 'green'},
    { name: 'Web', color: 'purple'},
  ]

  const renderPlatformIcon = (name: string) => {
    switch (name) {
      case 'Windows':
        return <AppWindow />
      case 'Linux':
        return <Laptop />
      case 'Mac':
        return <Monitor />
      case 'iOS':
        return <Smartphone />
      case 'Android':
        return <Bot />
      case 'Web':
        return <ChevronsLeftRightEllipsis />
				
      default:
        return null
    }
  }


  const renderPlatformCard = (platform: { name: string; color: string; description: string }) => (
    <div key={platform.name} className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl flex flex-col items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={`currentColor`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-12 w-12 mb-4`}
      >
        {renderPlatformIcon(platform.name)}
      </svg>
      <h3 className="text-2xl font-semibold">{platform.name}</h3>
    </div>
  )
  
  const { t } = useTranslation();

  return (
    <Suspense fallback="loading">
      <section className="w-full pt-48 pb-12 md:pb-12 pt-12 lg:pb-24 bg-gradient-to-b from-white to-gray-100 dark:from-neutral-950 dark:to-neutral-950">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('compatibility_title')}</h2>
            <p className="md:max-w-[700px] max-w-[400px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('compatibility_subtitle')}
            </p>
          </div>
          <div className="grid gap-6 mt-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map(renderPlatformCard)}
          </div>
        </div>
      </section>
    </Suspense>
  )
}