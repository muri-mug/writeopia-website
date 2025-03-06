import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <a href="/">Go back to the homepage</a>
      </div>
    </div>
  );
};

export default NotFound;