import React, { Suspense } from 'react';
import '../App.css';
import DefaultLink from '../components/ui/default-link';
import { useTranslation } from 'react-i18next';

export default function NewsletterSection() {
  const { t } = useTranslation();
  
  return (
    <Suspense fallback="loading">
      <section className="w-screen pt-12 md:pt-24 lg:pt-32 pb-52 pl-8 pr-8 flex flex-col space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t('call_to_alpha_title', 'Be one of the first to try')}
        </h2>
        <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
          {t('call_to_alpha_subtitle', 'Download our alpha version and try our platform.')}
        </p>  
        <div className="space-y-2 space-x-2 pt-3">              
          <DefaultLink to='download'>{t('call_to_alpha')}</DefaultLink>    
        </div>

        <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl pt-8">
          {t('wishlist_teaser', 'Join Writeopia newsletter now to stay updated on its latest features!')}
        </p>  
        <div className="space-y-2 space-x-2 pt-3">         
          <DefaultLink to='https://forms.gle/QFoewRrehmkXWuMo8'>Join Waitlist</DefaultLink>    
        </div>
      </section>
    </Suspense>
  )
}