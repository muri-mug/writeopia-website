import React, { Suspense } from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';
import ReactPlayer from "react-player";


export default function DemoVideoPt() {
  const { t } = useTranslation();

  return (
      <div>    
        <div className="relative w-full max-w-7xl mx-auto aspect-video px-4 object-cover py-4">
          <ReactPlayer playing={false} url="https://writeopia.io/videos/demo.mov" loop={true} muted={true} controls={true} width="100%" height="100%" />
        </div>        
      </div>
  );
}