import React from "react";
import useAuthResponseInterceptor from "../auth/hooks/useAuthResponseInterceptor";
import useValidateUser from "./useValidateUser";
import useCheckUserProfileCompletion from "./useCheckUserProfileCompletion";

interface AppInitializerProps {
    children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
    const isUserValid = useValidateUser();
    useCheckUserProfileCompletion(isUserValid);
    // This is used to refresh token if user is logged in and token is expired
    useAuthResponseInterceptor();

    return children;
};
export default AppInitializer;
