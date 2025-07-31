import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

export default function Pitch() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen space-y-12 pt-24 p-6">    
      <DataChoice />
      <AiChoice />
      <OpenFormat />
      <Design />
    </section>
  );
}

function DataChoice() {
  const { t } = useTranslation();

  return (
    <Suspense fallback="loading">
      <div className="flex flex-col-reverse lg:flex-row items-center py-10">   
        <div className="p-6 px-10 items-center justify-center dark:text-gray-200 text-left max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold">{t('pitch_data_choice_title')}</h2>
          <p className="text-2xl md:text-3xl mt-2 text-gray-500 dark:text-gray-400">{t('pitch_data_choice_subtitle')}</p>
        </div>     
        
        <div className='w-10'/>

        <img src="/data_choice.svg" alt={t('pitch_data_choice_title')} className="w-60 h-60 md:w-80 md:h-80 object-cover" />
      </div>
    </Suspense>
  );
}

function AiChoice() {
  const { t } = useTranslation();

  return (
    <Suspense fallback="loading">
      <div className="flex flex-col lg:flex-row items-center py-10">        
        <img src="/ai_choice.svg" alt={t('pitch_ai_choice_title')} className="w-60 h-60 md:w-80 md:h-80 object-cover" />

        <div className='w-10'/>

        <div className="p-6 px-10 items-center justify-center dark:text-gray-200 text-left max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold">{t('pitch_ai_choice_title')}</h2>
          <p className="text-2xl md:text-3xl mt-2 text-gray-500 dark:text-gray-400">{t('pitch_ai_choice_subtitle')}</p>
        </div>
      </div>
    </Suspense>
  );
}

function OpenFormat() {
  const { t } = useTranslation();

  return (
    <Suspense fallback="loading">
      <div className="flex flex-col-reverse lg:flex-row items-center py-10">   
        <div className="p-6 px-10 items-center justify-center dark:text-gray-200 text-left max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold">{t('pitch_no_lockin_title')}</h2>
          <p className="text-2xl md:text-3xl mt-2 text-gray-500 dark:text-gray-400">{t('pitch_no_lockin_subtitle')}</p>
        </div>     
        
        <div className='w-10'/>

        <img src="/open_format.svg" alt={t('pitch_no_lockin_title')} className="w-60 h-60 md:w-80 md:h-80 object-cover" />
      </div>
    </Suspense>
  );
}

function Design() {
  const { t } = useTranslation();

  return (
    <Suspense fallback="loading">
      <div className="flex flex-col lg:flex-row items-center pt-10">
        <img src="/web_design.svg" alt={t('pitch_pretty_design_title')} className="w-60 h-60 md:w-80 md:h-80 object-cover" />

        <div className='w-10'/>

        <div className="p-6 px-10 items-center justify-center dark:text-gray-200 text-left max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold">{t('pitch_pretty_design_title')}</h2>
          <p className="text-2xl md:text-3xl mt-2 text-gray-500 dark:text-gray-400">{t('pitch_pretty_design_subtitle')}</p>
        </div>
      </div>
    </Suspense>
  );
}

