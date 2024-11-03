import { useContext } from "react";
import UserContext from "../../store/user/user-context";

const usePermission = (permission: string) => {
    const userCtx = useContext(UserContext);
    return userCtx.hasPermission(permission);
};

export default usePermission;
