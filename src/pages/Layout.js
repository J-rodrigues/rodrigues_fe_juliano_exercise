import React from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Header from 'components/Header';

const Layout = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <Header title={location?.state?.title || 'Teams'} showBackButton={location?.key !== 'default'} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
