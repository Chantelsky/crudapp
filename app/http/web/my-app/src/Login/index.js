import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

const Login = (props) => {
  const [auth, setAuth] = useState(null);

  const checkAuthentication = async () => {
    const authenticated = await props.auth.isAuthenticated();
    if (authenticated !== auth) {
      setAuth(authenticated);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const login = async (e) => {
    props.auth.login('/home');
  };

  return auth ? (
    <Redirect to='/home' />
  ) : (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Button variant='contained' color='primary' onClick={login}>
        Login with Okta
      </Button>
    </div>
  );
};

export default withAuth(Login);
