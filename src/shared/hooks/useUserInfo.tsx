import { useContext } from "react";
import UserContext from "../../store/user/user-context";
import Role from "../../store/user/role";

const useUserInfo = () => {
    const userContext = useContext(UserContext);

    const isTrainer = userContext.user?.role === Role.Trainer;
    const isAthlete = userContext.user?.role === Role.Athlete;

    return {
        isTrainer,
        isAthlete,
    };
};

export default useUserInfo;
