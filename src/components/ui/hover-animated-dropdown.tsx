import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import HeaderButton from './header-button';

export default function AnimatedDropDown({ menuItems, label = "Options" }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative inline-block text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HeaderButton aria-haspopup="true" aria-expanded={isHovered}>
        {label}
        <motion.div
          animate={{ rotate: !isHovered ? 0 : -180 }}
          transition={{ duration: 0.150 }}
          className="ml-2 -mr-1 h-5 w-5 inline-flex items-center justify-center"
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.div>
      </HeaderButton>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 w-56 mt-3 origin-top-right rounded-lg bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-0" role="none">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 pt-5 pb-5 m-1.5 text-sm text-gray-700 rounded-lg dark:text-white font-bold hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}