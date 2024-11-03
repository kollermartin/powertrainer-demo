import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apiCalls/ApiClient";

const logoutUser = async () => {
    const response = await apiClient.get<string>(`api/auth/logout`);

    // Redirect to the keycloak logout page which will redirect to BFF and then back to the app
    window.location.href = response.data;
};

const UseLogoutUser = () => {
    const navigate = useNavigate();

    const { mutateAsync, isError } = useMutation({
        mutationFn: logoutUser,
        onError: () => {
            navigate("/logout/redirect");
        },
    });

    const handleLogout = async () => {
        await mutateAsync();
    };

    return {
        handleLogout,
        isError,
    };
};

export default UseLogoutUser;
