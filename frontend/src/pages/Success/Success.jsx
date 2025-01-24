import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Success.module.css";
import logo from "../../assets/icons/logo.svg";
const DroneRegistrationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <main className={Styles.mainbody}>
      <img src={logo} className={Styles.logo} alt="" />
      <p className={Styles.authText}>Your drone is registered successfully!</p>
      <p style={{ fontSize: "1rem" }}>
        Redirecting you to the dashboard in 3 seconds...
      </p>
    </main>
  );
};

export default DroneRegistrationSuccess;
