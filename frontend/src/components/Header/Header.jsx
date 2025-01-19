import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.svg"
import OutlinedButton from "../Buttons/OutlinedButton";
import Styles from "./Header.module.css"

const Header = () =>{
    const navigate = useNavigate();
    return <div className={Styles.header}>
        <div className={Styles.headerLeft} onClick={()=>navigate('/')}>
            <img src={logo} alt="" className={Styles.headerImg}/>
            <p className={Styles.headerText}>DroneSign</p>
        </div>
        <div className={Styles.headerRight}>
            <OutlinedButton text="Login/Register" onClick={()=>navigate('/auth')}/>
        </div>
    </div>
}

export default Header;