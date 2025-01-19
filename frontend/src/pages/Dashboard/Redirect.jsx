import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Redirect = () => {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const code = params.get('code'); // Extract the 'code' parameter
    localStorage.setItem("ds_access_token", code)
    navigate('/dashboard')
  }, [location.search, navigate])

  return (
    <p>logging in..</p>
  );
};

export default Redirect;
