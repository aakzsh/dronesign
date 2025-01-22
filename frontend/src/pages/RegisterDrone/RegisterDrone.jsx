import { useEffect, useState } from "react";
import Styles from "./RegisterDrone.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import ContainedButton from "../../components/Buttons/ContainedButton";
import logo from "../../assets/icons/logo.svg"
import GradientButton from "../../components/Buttons/GradientButton";
import { Button } from "@mui/material";
export const RegisterDrone = () =>{
    const [accessCode, setAccessCode] = useState(null);
    const [formData, setFormData] = useState({
        ownerName: '',
        buyDate: '',
        monetaryValue: '',
        droneNickname: '',
        droneModel: '',
        province: '',
        zipcode: '',
        city: '',
      });
      useEffect(() => {
        setAccessCode(localStorage.getItem("ds_access_token"));
      }, []);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const navigate = useNavigate()
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hehe")
        console.log(formData)
        console.log('Form Submitted:', formData);
        const fdata = formData
        const email = localStorage.getItem("ds_email")
        const ds_account_id = localStorage.getItem("ds_account_id")
        fdata.email = email
        fdata.account_id = ds_account_id
        const res = await axios.get(`http://192.168.29.193:5000/create_envelope/${accessCode}`,

            {
                params: {
                    data: JSON.stringify(fdata) // Serialize the object into a JSON string
                  }
            }
        )
        console.log(res)
        alert('Drone registered successfully!');
        navigate('/success')
      };
      const handleLogout = () => {
        localStorage.removeItem("ds_access_token");
        sessionStorage.removeItem("access_token");
        navigate('/auth');
      };
    
    return (
       <>
        <div className={Styles.header}>
        <div className={Styles.headerLeft} onClick={()=>navigate('/')}>
            <img src={logo} alt="" className={Styles.headerImg}/>
            <p className={Styles.headerText}>DroneSign | Register New Drone</p>
        </div>
        <div className={Styles.headerRight}>
        <GradientButton text="Autofill using AI" onClick={()=>{
            alert("Feature in progress!")
        }} />
        <div style={{"width": "0.5rem"}}></div>
        <OutlinedButton text="Logout" onClick={handleLogout} />
            {/* <OutlinedButton text="Login/Register" onClick={()=>navigate('/auth')}/> */}
        </div>
    </div>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
           
      <center><h2>Hi, let's register your drone</h2></center>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="ownerName" style={{ display: 'block', marginBottom: '5px' }}>
            Owner Name:
          </label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="buyDate" style={{ display: 'block', marginBottom: '5px' }}>
            Buy Date:
          </label>
          <input
            type="date"
            id="buyDate"
            name="buyDate"
            value={formData.buyDate}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="monetaryValue" style={{ display: 'block', marginBottom: '5px' }}>
            Monetary Value (in USD):
          </label>
          <input
            type="number"
            id="monetaryValue"
            name="monetaryValue"
            value={formData.monetaryValue}
            onChange={handleChange}
            placeholder="Enter the value of the drone"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="droneNickname" style={{ display: 'block', marginBottom: '5px' }}>
            Drone Nickname:
          </label>
          <input
            type="text"
            id="droneNickname"
            name="droneNickname"
            value={formData.droneNickname}
            onChange={handleChange}
            placeholder="Give your drone a nickname"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="droneModel" style={{ display: 'block', marginBottom: '5px' }}>
            Drone Model and Company:
          </label>
          <input
            type="text"
            id="droneModel"
            name="droneModel"
            value={formData.droneModel}
            onChange={handleChange}
            placeholder="e.g., DJI Phantom 4"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="province" style={{ display: 'block', marginBottom: '5px' }}>
            State/Province:
          </label>
          <select
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="" disabled>
              Select a state
            </option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            {/* Add other states as needed */}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="zipcode" style={{ display: 'block', marginBottom: '5px' }}>
            Zip Code:
          </label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            placeholder="e.g., 90210"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="city" style={{ display: 'block', marginBottom: '5px' }}>
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <center><button type="submit" style={{ backgroundColor: "#4C00FF",
        color: "#FFFFFF",
        padding: "12px 24px",
        borderRadius: "8px",
        textTransform: "none",
        fontSizeAdjust: true,
        fontWeight: "400",
        fontSize: "13px",
        border: "1px solid #4C00FF",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        cursor: 'pointer',
        "&:hover": {
          backgroundColor: "#3B00CC",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
        }, }}>
          Proceed
        </button></center>
      </form>
    </div>
       </>
  );
}