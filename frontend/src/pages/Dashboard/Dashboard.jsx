import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContainedButton from '../../components/Buttons/ContainedButton';
import axios from 'axios';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [accessCode, setAccessCode] = useState(null);
  const [isLoginSet, setIsLoginSet] = useState(false);
  const [username, setUsername] = useState("")


  const navigateIfLoggedin = async () =>{
    const token = localStorage.getItem("ds_access_token");
    // alert(token!=null && token.startsWith('e'))
    if(token==null){
      navigate('/auth');
    }
    const userData = await axios.get('https://account-d.docusign.com/oauth/userinfo', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    setUsername(userData.data.name)
  }

  // Fetch and set access token from localStorage when the query string changes
  useEffect(() => {
    navigateIfLoggedin()
  }, []);

  const registerDrone = () =>{
    alert("registering")
  }

  // Fetch and set access token from localStorage when the query string changes
  useEffect(() => {
    setAccessCode(localStorage.getItem("ds_access_token"));
  }, [location.search]);

  // Fetch login data and store it in sessionStorage
  const fetchLoginData = async () => {
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL;
      const endpoint = "login";
      const response = await axios.get(`${baseUrl}${endpoint}`);
      const data = response.data;

      if (data && typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
          sessionStorage.setItem(key, value); // Storing key-value pairs
        });
      }
      setIsLoginSet(true);
      setCallLogin(false)
    } catch (error) {
      console.error("Failed to fetch login data:", error);
    }
    
  };

  const [callLogin, setCallLogin] = useState(true)

  // Trigger fetching login data on component mount
  useEffect(() => {
    if(callLogin){
      fetchLoginData();
    }
  }, []);

  // Check login status when login data is set
  useEffect(() => {
    if (isLoginSet) {
      const loggedIn = sessionStorage.getItem('access_token');
      if (!loggedIn) {
        navigate('/auth');
      } else {
        console.log("Logged in successfully");
      }
    }
  }, [isLoginSet, navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("ds_access_token");
    sessionStorage.removeItem("access_token");
    navigate('/auth');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Access Code: {accessCode}</p>
      <ContainedButton text="Register New Drone" onClick={registerDrone} />
      <ContainedButton text="Logout" onClick={handleLogout} />
      <p>User name: {username}</p>
    </div>
  );
};

export default Dashboard;
