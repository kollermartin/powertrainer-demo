import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import LoginRedirectPage from "../auth/pages/LoginRedirectPage";
import LogoutRedirectPage from "../auth/pages/LogoutRedirectPage";
import TutorialsRoot from "../features/tutorials/pages/TutorialsRoot";
import AppInitializer from "../appInitializer/AppInitializer";
import NotFoundPage from "./errorPages/NotFoundPage";
import SecuredLazyPage from "./SecuredLazyPage";
import PERMISSIONS from "../auth/Permissions";

const routerDefinition = createBrowserRouter([
    {
        path: "/",
        element: (
            // Initializer is placed here, so it is top most component and can use all the context providers
            <AppInitializer>
                <RootLayout />
            </AppInitializer>
        ),
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const HomePage = await import("../features/home/pages/HomePage");
                    return { Component: HomePage.default };
                },
            },
            {
                path: "login/redirect",
                element: <LoginRedirectPage />,
            },
            {
                path: "logout/redirect",
                element: <LogoutRedirectPage />,
            },
            {
                path: "tutorials",
                element: <TutorialsRoot />,
                children: [
                    {
                        index: true,
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/tutorials/pages/TutorialsPage")}
                                permissions={[PERMISSIONS.QUERY_TUTORIALS]}
                            />
                        ),
                    },
                    {
                        path: ":id",
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/tutorials/pages/TutorialDetailPage")}
                                permissions={[PERMISSIONS.QUERY_TUTORIALS]}
                            />
                        ),
                    },
                    {
                        path: ":id/edit",
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/tutorials/pages/EditTutorialPage")}
                                permissions={[PERMISSIONS.MANAGE_TUTORIALS]}
                            />
                        ),
                    },
                ],
            },
            {
                path: "trainings",
                children: [
                    {
                        index: true,
                        element: <Navigate to="/trainings/upcoming" />,
                    },
                    {
                        path: "new",
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/trainings/pages/NewTrainingPage")}
                                permissions={[PERMISSIONS.MANAGE_TRAININGS]}
                            />
                        ),
                    },
                    {
                        path: "administration",
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/trainings/pages/AdministrationPage")}
                                permissions={[PERMISSIONS.MANAGE_TRAININGS, PERMISSIONS.MANAGE_EXERCISE_TUTORIALS]}
                            />
                        ),
                    },
                    {
                        path: "administration/trainings",
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/trainings/pages/AdminTrainingPage")}
                                permissions={[PERMISSIONS.MANAGE_TRAININGS]}
                            />
                        ),
                    },
                    {
                        path: "administration/exercises",
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/trainings/pages/AdministrationExercisesPage")}
                                permissions={[PERMISSIONS.MANAGE_EXERCISE_TUTORIALS]}
                            />
                        ),
                    },
                    {
                        path: "exercises/new",
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/trainings/pages/NewExerciseTutorialPage")}
                                permissions={[PERMISSIONS.MANAGE_EXERCISE_TUTORIALS]}
                            />
                        ),
                    },
                    {
                        path: "exercises/edit/:id",
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/trainings/pages/EditExerciseTutorialPage")}
                                permissions={[PERMISSIONS.MANAGE_EXERCISE_TUTORIALS]}
                            />
                        ),
                    },
                    {
                        path: "exercises/detail/:id",
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/trainings/pages/ExerciseTutorialDetailPage")}
                                permissions={[PERMISSIONS.QUERY_EXERCISE_TUTORIALS]}
                            />
                        ),
                    },
                ],
            },
            {
                path: "settings",
                lazy: async () => {
                    const SettingsLayout = await import("../features/settings/general/SettingsLayout");
                    return { Component: SettingsLayout.default };
                },
                children: [
                    {
                        index: true,
                        element: (
                            <SecuredLazyPage
                                importFunc={() => import("../features/settings/profileSettings/ProfileSettingsPage")}
                                permissions={[PERMISSIONS.QUERY_USER_PROFILES]}
                            />
                        ),
                    },
                    {
                        path: "profile",
                        lazy: async () => {
                            const ProfileSettingsPage = await import(
                                "../features/settings/profileSettings/ProfileSettingsPage"
                            );
                            return { Component: ProfileSettingsPage.default };
                        },
                    },
                ],
            },
        ],
    },
]);

export default routerDefinition;
