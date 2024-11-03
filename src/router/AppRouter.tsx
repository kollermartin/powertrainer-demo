import { RouterProvider } from "react-router-dom";
import routerDefinition from "./routerDefinition";

const AppRouter = () => {
    return <RouterProvider router={routerDefinition} />;
};

export default AppRouter;
