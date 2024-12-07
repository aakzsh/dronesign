import ContainedButton from "../../components/Buttons/ContainedButton";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import Header from "../../components/Header/Header";
import Styles from "./Landing.module.css";
import drone3 from "../../assets/images/drone1.jpg";
import drone2 from "../../assets/images/drone2.jpg";
import drone1 from "../../assets/images/drone3.jpg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <main className={Styles.mainBody}>
        <div className={Styles.container}>
          <div className={Styles.left}>
            <img src={drone1} className={Styles.drone1} alt="" />
          </div>
          <div className={Styles.right}>
            <img src={drone2} className={Styles.drone2} alt="" />
            <img src={drone3} className={Styles.drone3} alt="" />
          </div>
        </div>
        <p className={Styles.mainText}>
          Register your Civilian Drones in minutes
          <br />
          and be compliant with government laws
        </p>
        <p className={Styles.powered}>powered by DocuSign</p>
        <div className={Styles.ctas}>
          <ContainedButton text="Register your first Drone" onClick={()=>console.log("hehe")} />
          <OutlinedButton text="Discover" onClick={()=>navigate('/discover')}/>
        </div>
      </main>
    </>
  );
};

export default Landing;
