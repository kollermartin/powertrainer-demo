import React from "react";
import UserContext, { UserContextType } from "./user-context";
import UserInfo from "./UserInfo";
import PERMISSIONS from "../../auth/Permissions";
import Role from "./role";

interface UserProviderProps {
    children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = React.useState<UserInfo | null>(() => {
        const userJson = localStorage.getItem("saved-user");
        const userData = {
            firstName: "Joe",
            lastName: "Doe",
            email: "joe.doe@foo.cz",
            permissions: Object.values(PERMISSIONS),
            id: "123",
            role: Role.Trainer,
        };
        return userJson ? JSON.parse(userJson) : userData;
    });

    const setUserHandler = (userInfo: UserInfo) => {
        setUser(userInfo);
        localStorage.setItem("saved-user", JSON.stringify(userInfo));
    };

    const logoutUserHandler = () => {
        setUser(null);
        localStorage.removeItem("saved-user");
    };

    const userContext: UserContextType = React.useMemo(
        () => ({
            setUser: setUserHandler,
            user,
            isUserLoggedIn: !!user,
            logout: logoutUserHandler,
            hasPermission: (permission: string): boolean => {
                return !!user && user.permissions.includes(permission);
            },
        }),
        [user],
    );
    return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};

export default UserProvider;
