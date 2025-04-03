import React, { Suspense } from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';
import ReactPlayer from "react-player";


export default function Hero() {
  const { t } = useTranslation();

  return (
    <Suspense fallback="loading">
      <div className="subheader">    
        <p className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold dark:text-gray-200 tracking-tighter p-8'>{t('hero1')}<span className="highlight">{t('hero2')}</span></p>        
        <p className="max-w-[600px] text-gray-500 dark:text-gray-400 font-semibold text-xl pb-20 px-8">{t('subhero')}</p>
        
        <div className="relative w-full max-w-7xl mx-auto aspect-video px-4 object-cover dark:hidden">
          <ReactPlayer playing={false} url="https://writeopia.io/videos/hero_video_light.mov" loop={true} muted={true} controls={true} width="100%" height="100%" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto aspect-video px-4 object-cover hidden dark:block">
          <ReactPlayer playing={false} url="https://writeopia.io/videos/hero_video.mov" loop={true} muted={true} controls={true} width="100%" height="100%" />
        </div>        
      </div>
    </Suspense>
  );
}
