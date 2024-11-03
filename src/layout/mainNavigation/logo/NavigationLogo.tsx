import { Link } from "react-router-dom";
import { useContext } from "react";
import logoBlack from "../../../assets/logos/3-black.svg";
import logoWhite from "../../../assets/logos/3-white.svg";
import ThemeContext from "../../../store/theme/theme-context";
import classes from "./NavigationLogo.module.css";

const NavigationLogo = () => {
    const themeCtx = useContext(ThemeContext);

    return (
        <div className={classes.logoContainer}>
            <Link to="/">
                <img className={classes.logo} src={themeCtx.isLightTheme ? logoBlack : logoWhite} alt="page logo" />
            </Link>
        </div>
    );
};

export default NavigationLogo;
