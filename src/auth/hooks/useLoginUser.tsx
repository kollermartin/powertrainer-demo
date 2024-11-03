import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import UserContext from "../../store/user/user-context";
import apiClient from "../../apiCalls/ApiClient";

const loginUser = async (redirectTo: string) => {
    const response = await apiClient.get<string>(`api/auth/login`, {
        params: {
            redirectTo,
        },
    });

    // Redirect to the keycloak login page which will redirect to BFF and then back to the app
    window.location.href = response.data;
};

const useLoginUser = () => {
    const userCtx = useContext(UserContext);

    const { mutateAsync } = useMutation({
        mutationFn: loginUser,
        onError: () => {
            userCtx.logout();
        },
        meta: {
            errorMessage: "unableToLogin",
        },
    });

    const handleLogin = async (redirectTo: string) => {
        await mutateAsync(redirectTo);
    };

    return {
        handleLogin,
    };
};

export default useLoginUser;
