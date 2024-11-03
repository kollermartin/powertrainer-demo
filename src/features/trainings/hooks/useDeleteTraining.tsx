import { useMutation } from "@tanstack/react-query";
import { Failure } from "../../../apiCalls/Failure";
import queryClient from "../../../apiCalls/QueryClient";
import { administrationTrainingsQueryKeys } from "./query-keys";
import { TableData } from "../../../shared/models/tables/table-data-response.model";
import { AdministrationTraining } from "../models/training.model";

const deleteTraining = async (id: string): Promise<AdministrationTraining> => {
    if (!id) {
        throw new Error("Invalid params");
    }

    const trainings = queryClient.getQueryData<TableData<AdministrationTraining>>(
        administrationTrainingsQueryKeys.list(1, {}),
    );
    const trainingToDelete = trainings?.items.find((training) => training.id === id);

    if (!trainingToDelete) {
        throw new Error("Training not found");
    }

    return new Promise((resolve) => {
        resolve(trainingToDelete);
    });
};

const useDeleteTraining = () => {
    const { mutate } = useMutation<AdministrationTraining, Failure, string>({
        mutationFn: deleteTraining,
        onSuccess: async (training) => {
            await queryClient.setQueryData(
                administrationTrainingsQueryKeys.list(1, {}),
                (oldData: TableData<AdministrationTraining>) => {
                    return {
                        ...oldData,
                        items: oldData.items.filter((item) => item.id !== training.id),
                    };
                },
            );
        },
        meta: {
            errorMessage: "trainingDeletionFailed",
            successMessage: "trainingDeleted",
        },
    });

    const handleDelete = (id: string) => {
        mutate(id);
    };

    return {
        handleDelete,
    };
};

export default useDeleteTraining;
