import React, { useEffect } from 'react';
import ContainedButton from '../../components/Buttons/ContainedButton';
import Styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';

const DocuSignLogin = () => {
  const navigate = useNavigate();

  // Redirect the user to the DocuSign authorization URL
  const handleLogin = () => {
    const clientId = 'c8db0424-1e5e-4c98-9cec-dbcd1d0ba9bc';
    const redirectUri = 'http://localhost:3000/ds/callback';
    const authUrl = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature+impersonation&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = authUrl;
  };

  // Check for a valid access token in sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    if (token && token.startsWith('e')) {
      navigate('/dashboard'); // Redirect to dashboard if token is valid
    }
  }, [navigate]);

  return (
    <main className={Styles.mainbody}>
      <p>Authenticate yourself with DocuSign</p>
      <ContainedButton text="Authenticate" onClick={handleLogin} />
    </main>
  );
};

export default DocuSignLogin;
