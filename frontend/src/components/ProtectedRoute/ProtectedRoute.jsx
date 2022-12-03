import { bool, oneOfType, arrayOf, node, string } from 'prop-types';
import React from 'react';
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute({ loggedIn, children, redirectPath }) {
  if (!loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children || <Outlet />;
}

ProtectedRoute.propTypes = {
  loggedIn: bool,
  redirectPath: string,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

ProtectedRoute.defaultProps = {
  loggedIn: false,
  redirectPath: '/',
};

export default ProtectedRoute;
