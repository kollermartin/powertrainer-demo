import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../store/user/user-context";
import Spinner from "../../shared/components/Spinner";

const LogoutRedirectPage = () => {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);

    useEffect(() => {
        userCtx.logout();
        navigate("/");
    }, [navigate, userCtx]);
    return <Spinner />;
};

export default LogoutRedirectPage;
