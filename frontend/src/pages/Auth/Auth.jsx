import React, { useEffect } from 'react';
import ContainedButton from '../../components/Buttons/ContainedButton';
import Styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../assets/icons/logo.svg"

const DocuSignLogin = () => {
  const navigate = useNavigate();

  // Redirect the user to the DocuSign authorization URL
  const handleLogin =async () => {
    // const res = await axios.get('http://192.168.29.193:5000/login')
    // console.log(res.data)
    // localStorage.setItem("ds_access_token", res.data.access_token)
    // navigateIfLoggedin()
    const clientId = '51d9a5db-91a9-4781-a070-c14b5a111907';
    const redirectUri = 'http://localhost:3000/ds/callback';
    const authUrl = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature+impersonation&client_id=${clientId}&redirect_uri=${redirectUri}`
    // const authUrl = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature+impersonation&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = authUrl;
  };


  const navigateIfLoggedin = async () =>{
    const token = localStorage.getItem("ds_access_token");
    // alert(token!=null && token.startsWith('e'))
    if(token!=null && token.startsWith('e')){
      navigate('/dashboard');
    }

  }

  // Fetch and set access token from localStorage when the query string changes
  useEffect(() => {
    navigateIfLoggedin()
  }, []);

  
  // Check for a valid access token in sessionStorage
  // useEffect(() => {
  //   const token = sessionStorage.getItem('ds_access_token');
  //   if (token && token.startsWith('e')) {
  //     navigate('/dashboard'); // Redirect to dashboard if token is valid
  //   }
  //   else{
  //     alert("oops, "+token)
  //   }
  // }, [navigate]);

  return (
    <main className={Styles.mainbody}>
      <img src={logo} className={Styles.logo} alt="" />
      <p className={Styles.authText}>Authenticate with DocuSign</p>
      <ContainedButton text="Authenticate" onClick={handleLogin} />
    </main>
  );
};

export default DocuSignLogin;
