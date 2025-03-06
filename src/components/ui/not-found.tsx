import React from 'react';
import VariantLink from './variant-link';

const NotFound: React.FC = () => {
  return (
    <div className="w-screen pt-20 flex items-center justify-center">
      <div className="text-center">        
        <p className="text-2xl mt-4">Oops! The page you're looking for doesn't exist.</p>        
        <img src="/page_not_found.svg" alt="Not found" className=""/>
        <VariantLink to="/">
            Go Back Home
        </VariantLink>
      </div>
    </div>
  );
};

export default NotFound;