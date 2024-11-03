import NavigationLogo from "../logo/NavigationLogo";
import NavigationMenu from "./NavigationMenu";
import NavigationMode from "./NavigationMode";

const SideNavigation = () => {
    return (
        <>
            <NavigationLogo />
            <NavigationMenu navigationMode={NavigationMode.INLINE} />
        </>
    );
};

export default SideNavigation;
