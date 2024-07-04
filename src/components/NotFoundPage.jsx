import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div >
      <h1> 404 - Page Not Found</h1>
      {/* add implementation to check if signed in or not to change routing back */}
      <Link to='/'> Home</Link>
    </div>
  );
};

export default NotFoundPage;
