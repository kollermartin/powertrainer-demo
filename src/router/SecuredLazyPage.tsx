import { ComponentType, lazy, Suspense, useContext } from "react";
import UserContext from "../store/user/user-context";
import UnauthorizedPage from "./errorPages/UnauthorizedPage";
import Spinner from "../shared/components/Spinner";

interface SecuredLazyPageProps {
    importFunc: () => Promise<{ default: ComponentType }>;
    permissions: string[];
}

const SecuredLazyPage = ({ importFunc, permissions }: SecuredLazyPageProps) => {
    const LazyComponent = lazy(importFunc);
    const userCtx = useContext(UserContext);

    const hasPermission = permissions.some((permission) => userCtx.hasPermission(permission));

    if (!hasPermission) {
        return <UnauthorizedPage />;
    }

    return (
        <Suspense fallback={<Spinner />}>
            <LazyComponent />
        </Suspense>
    );
};

export default SecuredLazyPage;
