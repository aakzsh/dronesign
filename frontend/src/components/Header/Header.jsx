import logo from "../../assets/icons/logo.svg"
import OutlinedButton from "../Buttons/OutlinedButton";
import Styles from "./Header.module.css"

const Header = () =>{
    return <div className={Styles.header}>
        <div className={Styles.headerLeft}>
            <img src={logo} alt="" className={Styles.headerImg}/>
            <p className={Styles.headerText}>DroneSign</p>
        </div>
        <div className={Styles.headerRight}>
            <OutlinedButton text="Login/Register"/>
        </div>
    </div>
}

export default Header;