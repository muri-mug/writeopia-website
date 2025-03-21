import React from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {    
  const { t } = useTranslation();

  return (
    <section className="w-screen pb-8 pl-8 pr-8 flex flex-col space-y-4 text-start">
      <div>
        <h2 className="mx-auto max-w-[900px] pt-4 pb-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Privacy
        </h2>
        <p className="mx-auto max-w-[900px] text-md">
          {t('privacy_body1', 'We take privacy very seriously and we understand how frustrating it is when apps collect your data without your knowledge.')}      
          <br/><br/>

          {t('privacy_body2', 'At Writeopia we have the fundamental principles:')}      
          <br/><br/>
          {t('privacy_principle1', '- Users have full control over their data and can choose not to send any information through the app at any time. If a feature requires data to function, the app will clearly inform the user about this need before any data is shared.')}      
          <br/>
          {t('privacy_principle2', '- The app will always support full offline usage.')}          
          <br/>
          {t('privacy_principle3', '- We don\'t share your personal information with anyone except to comply with the law or protect our rights.')}                  
          <br/>
          {t('privacy_principle4', '- We do\'t ask you for personal information unless we truly need it.')}
          <br/>
          {t('privacy_principle5', '- We don\'t store personal information on our servers unless required for the on-going operation of the service.')}          
          <br/>
        </p> 
      </div>       
    </section>
  )
}