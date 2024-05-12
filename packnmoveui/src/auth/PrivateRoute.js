import { Navigate } from 'react-router-dom';
import React from 'react';
import { isAuthenticated } from './auth';
import { useState, useEffect } from 'react';

function PrivateRoute({ component: Component, ...rest }) {
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    isAuthenticated().then(response => {
      setAuthStatus(response && response.data && response.data.valid === true);
    }).catch(error => {
      console.error("Error:", error);
        setAuthStatus(false);
    });
  }, [])

  return (
    <>
      {authStatus === null ? null : authStatus ? (
        <Component {...rest} />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  )
}
export default PrivateRoute;