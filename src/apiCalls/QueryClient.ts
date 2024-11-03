import { Mutation, MutationCache, Query, QueryCache, QueryClient, QueryKey } from "@tanstack/react-query";
import { notification } from "antd";
import i18n from "i18next";
import { AxiosError } from "axios";
import defaultNotificationConfig from "../configs/notification.config";
import { ErrorData } from "../shared/models/error.model";

const prepareErrorMessage = (
    entity: Query<unknown, unknown, unknown, QueryKey> | Mutation<unknown, unknown, unknown, unknown>,
    error: AxiosError,
) => {
    const errorResponse = error.response?.data as ErrorData;
    const specificErrorCodes = entity.meta?.specificErrorCodes as string[];

    if (specificErrorCodes && specificErrorCodes.includes(errorResponse.code)) {
        return errorResponse.code;
    }

    if (entity.meta?.errorMessage) {
        return entity.meta.errorMessage as string;
    }

    return "somethingWentWrong";
};

const handleErrorNotification = (
    entity: Query<unknown, unknown, unknown, QueryKey> | Mutation<unknown, unknown, unknown, unknown>,
    error: AxiosError,
) => {
    const errorMessage = prepareErrorMessage(entity, error);

    notification.error({
        ...defaultNotificationConfig,
        message: i18n.t(errorMessage, { ns: "notifications" }),
    });
};

const handleSuccessNotification = (
    entity: Query<unknown, unknown, unknown, QueryKey> | Mutation<unknown, unknown, unknown, unknown>,
) => {
    const successMessage = entity?.meta?.successMessage as string;

    if (successMessage) {
        notification.success({
            ...defaultNotificationConfig,
            message: i18n.t(successMessage, { ns: "notifications" }),
        });
    }
};

const initializeQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
        queryCache: new QueryCache({
            onError: (error, query) => handleErrorNotification(query, error as AxiosError),
            onSuccess: (_, query) => handleSuccessNotification(query),
        }),
        mutationCache: new MutationCache({
            onError: (_err, _var, _context, mutation) => handleErrorNotification(mutation, _err as AxiosError),
            onSuccess: (_data, _var, _context, mutation) => handleSuccessNotification(mutation),
        }),
    });
};

const queryClient = initializeQueryClient();

export default queryClient;
