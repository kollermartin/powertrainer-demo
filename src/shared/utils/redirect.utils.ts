import { Location } from "react-router-dom";

export const prepareRedirectUrlFromLocation = (location: Location): string => {
    const url = location.pathname;
    if (location.search) {
        return `${url}${location.search}`;
    }
    return url;
};

export const addParamsFromLocationToUrl = (url: string, location: Location): string => {
    if (location.search && (location.pathname !== url || location.pathname !== "/")) {
        return `${url}${location.search}&location=${location.pathname}`;
    }

    if (location.search && location.pathname && url === "/") {
        return `${url}${location.search}`;
    }

    return url;
};

export const findLocationParam = (location: Location): string | null => {
    const query = new URLSearchParams(location.search);

    return query.get("location");
};

export const prepareNavigationToLocation = (location: Location): string => {
    const query = new URLSearchParams(location.search);
    const locatioQuery = query.get("location");

    if (locatioQuery) {
        query.delete("location");

        return `${locatioQuery}?${query.toString()}`;
    }

    return "/";
};
