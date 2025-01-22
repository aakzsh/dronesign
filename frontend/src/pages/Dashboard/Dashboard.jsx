import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContainedButton from '../../components/Buttons/ContainedButton';
import axios from 'axios';
import Styles from "./Dashboard.module.css"
import OutlinedButton from '../../components/Buttons/OutlinedButton';
import logo from "../../assets/icons/logo.svg"

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [accessCode, setAccessCode] = useState(null);
  const [isLoginSet, setIsLoginSet] = useState(false);
  const [username, setUsername] = useState("")
  const [accountID, setAccountID] = useState("")
  const [envelopes, setEnvelopes] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const fetchData = async (tokenn, accid) => {
    try {
      const response = await axios
      .get("http://192.168.29.193:5000/envelopes/"+tokenn, {
        params: { from_date: "2024-01-01T00:00:00Z", account_id: accid },
      })

      if (response.data.envelopes) {
        console.log(response.data.envelopes)
        setEnvelopes(response.data.envelopes);
        setActiveTab(response.data.envelopes[0]?.envelopeId || null); // Set the first tab as active
      }
    } catch (error) {
      console.error("Error fetching envelopes:", error);
    }
  };

  // useEffect(() => {
  //   // Fetch data from API


    
  // }, []);

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
    console.log(userData.data)
    setUsername(userData.data.name)
    console.log("check", userData.data.accounts[0].account_id)
    setAccountID(userData.data.accounts[0].account_id)
    // xyzxyz
    localStorage.setItem("ds_account_id", userData.data.accounts[0].account_id)
    localStorage.setItem("ds_email", userData.data.email)
    await fetchData(token, userData.data.accounts[0].account_id);
  }

  // Fetch and set access token from localStorage when the query string changes
  useEffect(() => {
    navigateIfLoggedin()
  }, []);

  const registerDrone = () =>{
    alert("registering")
    navigate('/register-drone')
  }

  // Fetch and set access token from localStorage when the query string changes
  useEffect(() => {
    setAccessCode(localStorage.getItem("ds_access_token"));
  }, [location.search]);

  // const getStatusColor = (status) => {
  //   switch (status.toLowerCase()) {
  //     case "completed":
  //       return "green";
  //     case "sent":
  //       return "blue";
  //     default:
  //       return "gray";
  //   }
  // };
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

  function formatCuteDate(timestamp) {
    const date = new Date(timestamp);
    
    // Get parts of the date
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    };
  
    return date.toLocaleString('en-US', options);
  }

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
      <div className={Styles.header}>
        <div className={Styles.headerLeft} onClick={()=>navigate('/')}>
            <img src={logo} alt="" className={Styles.headerImg}/>
            <p className={Styles.headerText}>DroneSign | Dashboard</p>
        </div>
        <div className={Styles.headerRight}>
        <ContainedButton text="Register New Drone" onClick={registerDrone} />
        <div style={{"width": "0.5rem"}}></div>
        <OutlinedButton text="Logout" onClick={handleLogout} />
            {/* <OutlinedButton text="Login/Register" onClick={()=>navigate('/auth')}/> */}
        </div>
    </div>
    <main className={Styles.mainbody}>
        <p className={Styles.text1}>Hi {username}</p>
        <h3>Your registered Drone Documents</h3>
        {envelopes.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '20px', 
                  border: '2px dashed #ff6b6b', 
                  borderRadius: '10px', 
                  backgroundColor: '#ffecec', 
                  color: '#ff6b6b', 
                  fontSize: '20px', 
                  fontWeight: 'bold' 
                }}>
                  <p>No Drones registered yet! Start with registering your first drone</p>
                </div>
      ) : (
        <div style={{ 
          display: 'flex', 
          height: 'calc(100vh - 14rem)', 
          // border: '2px solid #ddd' 
        }}>
          
          {/* Left side with 2x2 grid layout */}
          <div style={{ 
            flex: 1, 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gridGap: '20px', 
            overflow: 'scroll'
            // padding: '20px' 
          }}>
            {envelopes.map((envelope) => (
              <div 
              key={envelope.envelopeId} 
              style={{ 
                backgroundColor: 
                  activeTab === envelope.envelopeId
                    ? "#0032B230"
                    : "#4C00FF10",
                borderRadius: '10px', 
                padding: '20px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.01)', 
                fontSize: '18px', 
                fontWeight: 'bold', 
                height: '15rem', // Ensuring landscape look
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'Inter, sans-serif',
                position: 'relative',
                gap: '20px'
              }}
            >
              {/* PDF Icon on the left side */}
              <div style={{ flexShrink: 0 }}>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/337/337946.png" 
                  alt="PDF Icon" 
                  style={{ width: '75px', height: '75px' }} 
                />
              </div>
            
              {/* Envelope details on the right side */}
              <div style={{ flex: 1, textAlign: 'left' }}>
                <p style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>
                  {envelope.emailSubject.split("-")[0]}
                </p>
                <p style={{ margin: '5px 0 0', fontSize: '16px', color: '#555' }}>
                  Status: {envelope.status}
                </p>
              </div>
            
              {/* View link in bottom right */}
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: '15px', 
                  right: '20px', 
                  fontSize: '16px', 
                  color: '#4C00FF', 
                  cursor: 'pointer' 
                }} 
                onClick={() => setActiveTab(envelope.envelopeId)}
              >
                View →
              </div>
            </div>
            ))}
          </div>
    
          {/* Vertical divider line */}
          <div style={{ 
            width: '2px', 
            backgroundColor: '#00000020' ,
            marginLeft: '1rem'
          }}></div>
    
          {/* Right side with heading and text */}
          {activeTab && (
        <div style={{ padding: "20px",width: '30%' }}>
          {envelopes
            .filter((envelope) => envelope.envelopeId === activeTab)
            .map((envelope) => (
              <div  
              key={envelope.envelopeId}
              style={{ 
                // width: '20%', 
                padding: '40px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'start', 
                // lineHeight: '1.2em'
                // textAlign: 'center' 
              }}>
                <h2 style={{ marginBottom: '20px', color: '#333', fontWeight:"normal"}}>Contract Explorer</h2>
                <p className={Styles.strong}>
                      <strong>Drone:</strong> {envelope.emailSubject.split("-")[0] || "Unidentified"}
                    </p>
                <p className={Styles.strong}>
                      <strong>Status:</strong> {envelope.status}
                    </p>
                    <p className={Styles.strong}>
                      <strong>Envelope ID:</strong> {envelope.envelopeId}
                    </p>
                    <p className={Styles.strong}>
                      <strong>Created At:</strong> {formatCuteDate(envelope.createdDateTime)}
                    </p>
                    <p className={Styles.strong}>
                      <strong>Sent At:</strong> {formatCuteDate(envelope.sentDateTime)}
                    </p>
                    <p className={Styles.strong}>
                      <strong>Completed At:</strong> {formatCuteDate(envelope.completedDateTime)}
                  </p>
                  <br />
                  <ContainedButton text="View Document" onClick={async()=>{
                  const response = await axios.get(
                    `http://192.168.29.193:5000/get_doc/${accountID}/envelopes/${envelope.envelopeId}`,
                    // 'https://demo.docusign.net/restapi/v2.1/accounts/743f01c6-40d5-43ae-b39e-ef38eb9a7f41/envelopes/69bf8f17-6eae-4349-bce7-06cfd2d3cc3c/documents/1', {
                    {
                      params: {
                        token: accessCode,
                      },
                      responseType: 'blob' // Important to receive binary data
                    });
                
                    // Create a URL for the PDF Blob
                    const fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                
                    // Open the PDF in a new tab
                    window.open(fileURL, '_blank');
                  }}/>
              </div>
            ))}
        </div>
      )}
          
          
        </div>
      )}
    </main>
    </div>
    
  );
};

export default Dashboard;
