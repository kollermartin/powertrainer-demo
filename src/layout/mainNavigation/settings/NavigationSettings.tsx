import { useContext } from "react";
import UserContext from "../../../store/user/user-context";
import UserSettings from "./UserSettings";
import LoginButton from "./LoginButton";
import { prepareFullName } from "../../../shared/utils/general.utils";

const NavigationSettings = () => {
    const userCtx = useContext(UserContext);

    return (
        <>
            {userCtx.isUserLoggedIn && <UserSettings username={prepareFullName(userCtx.user)} />}
            {!userCtx.isUserLoggedIn && <LoginButton />}
        </>
    );
};

export default NavigationSettings;
