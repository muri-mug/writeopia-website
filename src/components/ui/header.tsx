import React, { useState } from 'react';
import { Spiral as Hamburger } from 'hamburger-react'
import LargeButton from "./large-button"
import '../../App.css';
import Divider from './divider';
import HeaderLink from './header-link';
import AnimatedDropDown from './hover-animated-dropdown';
import { Link } from 'react-router-dom';
import MediumLink from './menu-medium-link';
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import LargeLink from './menu-large-link';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useTheme } from '../../ThemeContext';
import { SunMedium, Moon } from 'lucide-react';

export default function Header() {
  const { isDarkTheme, setDarkTheme, setLightTheme } = useTheme()

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isProductOpen, setIsProductOpen] = useState(false);

  const toggleProductScreen = () => {
    setIsProductOpen(!isProductOpen);
  };

  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const toggleCommunityScreen = () => {
    setIsCommunityOpen(!isCommunityOpen);
  };

  const docs = i18next.t("header_documentation")

  const secondItems = [
    { label: 'Download', href: '/download' },
    { label: docs, href: 'https://docs.writeopia.io/' },
  ];

  const thirdItems = [
    { label: t('contact_title', 'Contact Us'), href: '/contact' },
    { label: 'Github', href: 'https://github.com/leandroBorgesFerreira/Writeopia' },
    { label: 'Linkedin', href: 'https://www.linkedin.com/company/writeopia/' },
    { label: 'Discord', href: 'https://discord.gg/GDm9Nth2rx' },
    { label: 'Instagram', href: 'https://www.instagram.com/writeopia.io' },
    { label: 'Bluesky', href: 'https://bsky.app/profile/writeopia.bsky.social' },
  ];

  return (
    <header className='flex w-screen flex-row pt-6 pb-6'>
      <Link to="/" className="z-40">
        <img className='header-logo z-40 ml-6' src="/logo.png" alt="Writeopia logo" />
      </Link>
      <nav className="ml-auto pr-10 hidden md:flex items-center">
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/explanation">{t('how_it_works', 'How it works')}</HeaderLink>
        <AnimatedDropDown menuItems={secondItems} label={t('header_product')} />
        <AnimatedDropDown menuItems={thirdItems} label={t('header_community', 'Community')} />                

        <button
          onClick={() => (isDarkTheme ? setLightTheme() : setDarkTheme())}
          className="ml-4 px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
        >
          {isDarkTheme ? <SunMedium size={20} /> : <Moon size={20} />}
        </button>
      </nav>
      <div className={`z-40 ml-auto ${isOpen ? 'visible' : 'md:hidden'}  mr-6`}>
        <Hamburger toggled={isOpen} toggle={toggleMenu} size={20} />
      </div>                      
      <div className={`fixed inset-0 bg-gray-100 dark:bg-neutral-950  z-30 pt-6 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col items-start gap-6 w-screen pt-28">
          <LargeLink to="/">Home</LargeLink>
          <Divider />        

          <LargeLink to="/explanation">{t('how_it_works', 'How it works')}</LargeLink>        
          <Divider />        
          <LargeButton onClick={toggleProductScreen}>
            {t('header_product')}
            {
              <motion.div
                animate={{ rotate: !isProductOpen ? 0 : -180 }}
                transition={{ duration: 0.150 }}
                className="ml-2 -mr-1 h-5 w-5 inline-flex items-center justify-center"
              >
                <ChevronDown className="h-5 w-5" aria-hidden="true" />
              </motion.div>
            }               
          </LargeButton>            
          <div className={`flex flex-col ${isProductOpen ? 'visible' : 'hidden'}`}>              
            {secondItems.map((item) => (
              <MediumLink to={item.href}>{item.label}</MediumLink>
            ))}              
          </div>
          <Divider />        
          <LargeButton onClick={toggleCommunityScreen}>
            {t('header_community', 'Community')}            
            {
              <motion.div
                animate={{ rotate: !isCommunityOpen ? 0 : -180 }}
                transition={{ duration: 0.150 }}
                className="ml-2 -mr-1 h-5 w-5 inline-flex items-center justify-center"
              >
                <ChevronDown className="h-5 w-5" aria-hidden="true" />
              </motion.div>
            }
            </LargeButton>
          <div className={`flex flex-col ${isCommunityOpen ? 'visible' : 'hidden'}`}>
            {thirdItems.map((item) => (
              <MediumLink to={item.href}>{item.label}</MediumLink>
            ))}              
          </div>
        </nav>
      </div>      
    </header>
  );
}
