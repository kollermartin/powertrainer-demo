import React from "react";
import UserInfo from "./UserInfo";

export interface UserContextType {
    user: UserInfo | null;
    isUserLoggedIn: boolean;
    setUser: (user: UserInfo) => void;
    logout: () => void;
    hasPermission: (permission: string) => boolean;
}
const UserContext = React.createContext<UserContextType>({
    user: null,
    isUserLoggedIn: false,
    setUser: () => {},
    logout: () => {},
    hasPermission: () => false,
});

export default UserContext;
