import React, { useState, useEffect, useRef } from 'react';
import HeaderButton from './header-button';

function DropdownMenu() {
    return (
      <div className="relative inline-block group">
        <HeaderButton>Dropdown</HeaderButton>
        {/* Dropdown menu shown on hover */}
        <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-100 transform transition-opacity duration-200 ease-in-out z-10">
          <a href="#option1" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800">
            Option 1
          </a>
          <a href="#option2" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800">
            Option 2
          </a>
          <a href="#option3" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800">
            Option 3
          </a>
        </div>
      </div>
    );
  }

export default DropdownMenu;