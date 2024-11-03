import { useCallback, useEffect, useLayoutEffect, useState } from "react";

const useIsScrollable = <T>(dependencies: T[], isLoading: boolean, hasMore: boolean, next: () => void) => {
    const [node, setNode] = useState<HTMLDivElement>();
    const ref = useCallback((cnode: HTMLDivElement) => {
        setNode(cnode);
    }, []);

    const [isScrollable, setIsScrollable] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (!node || dependencies.length <= 0) return;

        setIsScrollable(node.scrollHeight > node.clientHeight);
    }, [dependencies.length, node]);

    useLayoutEffect(() => {
        if (!node) return undefined;

        const handleWindowResize = () => {
            setIsScrollable(node.scrollHeight > node.clientHeight);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, [node]);

    useEffect(() => {
        if (!node || isLoading || dependencies.length === 0) return;

        if (!isScrollable && hasMore) {
            next();
        }
    }, [isLoading, isScrollable, hasMore, node]);

    return [ref] as const;
};

export default useIsScrollable;
