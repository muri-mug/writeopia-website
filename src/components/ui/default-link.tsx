import React from 'react';
import { Link } from 'react-router-dom';

const DefaultLink = ({ style = {}, to = '/', children }: { style?: React.CSSProperties, to?: string, children: React.ReactNode }) => 
  <Link className='bg-black dark:bg-gray-700 text-white px-2.5 py-2.5 border border-black dark:border-gray-700 rounded-xl cursor-pointer text-base font-bold mr-1.5 hover:bg-gray-600 hover:border-gray-600' style={style} to={to} >
    {children}
  </Link>;

export default DefaultLink;