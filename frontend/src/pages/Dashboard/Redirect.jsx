import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Redirect = () => {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(()=>{
    loginUser()
  }, [location.search, navigate])

  const loginUser = async () =>{
    const params = new URLSearchParams(location.search);
    console.log("hehe ", location.search)
    const code = params.get('code'); // Extract the 'code' parameter
    // gonna use this code to login now
    const res = await axios.get(`http://192.168.29.193:5000/login_new/${code}`)
    console.log(res)
    localStorage.setItem("ds_access_token", res.data.access_token)
    localStorage.setItem("ds_refresh_token", res.data.refresh_token)
    navigate('/dashboard')
  }
  return (
    <p>logging in..</p>
  );
};

export default Redirect;
