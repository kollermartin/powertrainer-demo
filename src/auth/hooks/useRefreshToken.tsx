import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

const refreshToken = async () => {
    await axios.post("/api/auth/refresh-token", null, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
    });
};

const useRefreshToken = () => {
    const { mutateAsync } = useMutation({
        mutationFn: refreshToken,
    });

    const handleTokenRefresh = useCallback(async () => {
        await mutateAsync();
    }, [mutateAsync]);

    return {
        handleTokenRefresh,
    };
};

export default useRefreshToken;
