import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import MainApp from "./MainApp";
import "./index.css";
import ThemeProvider from "./store/theme/ThemeProvider";
import queryClient from "./apiCalls/QueryClient";
import UserProvider from "./store/user/UserProvider";
import "./localization/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <MainApp />
                </UserProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>,
);
