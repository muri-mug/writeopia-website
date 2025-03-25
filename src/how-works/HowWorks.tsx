import React from 'react';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function WriteopiaExplainer() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t('work_it_works_title', 'How Writeopia Works')}
        
      </motion.h1>
      <motion.p
        className="text-lg text-gray-400 max-w-4xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('how_it_works_subtitle', 'Writeopia is a real-time text editor that lets you interact with AI while ensuring complete privacy. It uses Ollama to generate AI responses directly on your device, so your data never leaves your computer.')}
      </motion.p>
      
      <div className="flex flex-col gap-8 w-full max-w-5xl">
        <CardInstall />

        <FeatureCard3
          icon="/lab_experiment.png"
          title={t('experiment_ai_models', 'Experiment with AI models')}
          description={t('how_it_works_experiment_description1', 'Writeopia can interact with many AI models throught Ollama. Consider those models as your little AI assistants, search for the one prefer or just click in the recomended ones.')}
          description2={t('download_and_choose_ai', 'Once you download them, you can choose and experiment.')}
          description3={t('experiment_ai_suggestion', 'Don\'t know which one to choose? Just click in the recommended ones and have fun!')}
        />
        <FeatureCard3
          icon="/office_work.png"
          title={t('start_writing', 'Start Writing!')}
          description={t('start_writing_description1', 'After the model is configured in your machine, you can make questions and get help to write. Just select the question in the text and select "Ask AI".')}
          description2={t('start_writing_description2', 'Your computer will run the AI for you, so your data never leaves your computer and you never reach a limit of usage.')}
          description3={t('happy_writting', 'Happy writting!')}
        />
      </div>
    </div>
  );
}

function CardInstall() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="bg-neutral-900 p-10 rounded-2xl shadow-lg flex flex-col items-center text-center w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <img src="/Loading.png" alt="Screenshot of Writeopia" className="w-60 h-60 md:w-80 md:h-80 pt-10 object-cover" />
      <h2 className="text-2xl font-semibold mb-3">{t('install_ollama', 'Install Ollama')}</h2>
      <p className="text-lg font-semibold text-gray-400 pb-14 px-10">{t('install_ollama_description_1', 'Ollama runs directly on your machine. Go to ')}<a href='https://ollama.com' className='underline'>ollama.com</a>{t('install_ollama_description_2', ' and download the app. Start it in your machine and you can use Writeopia with AI help!')}</p>
    </motion.div>
  );
}

function FeatureCard3({ icon, title, description, description2, description3 }) {
  return (
    <motion.div
      className="bg-neutral-900 p-10 rounded-2xl shadow-lg flex flex-col items-center text-center w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <img src={icon} alt="Screenshot of Writeopia" className="w-60 h-60 md:w-80 md:h-80 pt-10 object-cover" />    
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <p className="text-lg font-semibold font-semibold text-gray-400 py-2 px-10">{description}</p>
      <p className="text-lg font-semibold text-gray-400 pt-2 pb-2 px-10">{description2}</p>
      <p className="text-lg font-semibold text-gray-400 pt-2 pb-14 px-10">{description3}</p>
    </motion.div>
  );
}
