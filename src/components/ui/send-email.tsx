import React from 'react';
import { useTranslation } from "react-i18next";
import { useForm, ValidationError } from '@formspree/react';

export default function NewsletterSignup() {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm("xqapywng");

  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }

  return (
    <div className="flex justify-center items-center">  
      <form onSubmit={handleSubmit} className="space-x-2 space-y-2 md:space-y-0 flex flex-col md:flex-row items-center">
        <input
          id="email"
          type="email" 
          name="email"          
          placeholder="Enter your email"
          className="border px-3 py-2 rounded-md w-[350px] dark:border-black bg-white dark:bg-gray-700"
        />
        
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />        
        <button type="submit" disabled={state.submitting} className="bg-black dark:bg-gray-700 text-white px-2.5 py-2.5 border border-black dark:border-gray-700 rounded-xl cursor-pointer text-base font-bold mr-1.5 hover:bg-gray-600 hover:border-gray-600">
          {t('join_newsletter', 'Join our newsletter')}
        </button>
      </form>
    </div>
  );  
}