import { useMutation } from "@tanstack/react-query";
import { v4 } from "uuid";
import { CreateTrainingRequest } from "../models/dto/training.dto";
import { Failure } from "../../../apiCalls/Failure";
import { AdministrationTraining } from "../models/training.model";
import { userProfilesAutocompleteMock } from "../../../shared/mocks/user-profiles-autocomplete.mock";
import queryClient from "../../../apiCalls/QueryClient";
import { administrationTrainingsQueryKeys } from "./query-keys";
import { TableData } from "../../../shared/models/tables/table-data-response.model";

const createTrainings = async (request: CreateTrainingRequest) => {
    // Mocking the creation of trainings
    const response: AdministrationTraining[] = request.trainings.map((training) => ({
        ...training,
        createdOnUtc: new Date().toUTCString(),
        id: v4().toString(),
        completed: false,
        assigneeName:
            userProfilesAutocompleteMock.find((user) => user.userProfileId === training.assigneeId)?.name ?? "John Doe",
    }));

    return response;
};

const useCreateTraining = () => {
    const { mutateAsync } = useMutation<AdministrationTraining[], Failure, CreateTrainingRequest>({
        mutationFn: createTrainings,
        onSuccess: (newTrainings) => {
            queryClient.setQueryData(
                administrationTrainingsQueryKeys.list(1, {}),
                (oldData: TableData<AdministrationTraining>) => {
                    return {
                        ...oldData,
                        items: [...(oldData?.items ?? []), ...newTrainings],
                    };
                },
            );
        },
        meta: {
            errorMessage: "trainingCreateFailed",
            successMessage: "trainingCreateSuccess",
        },
    });

    const handleCreate = async (trainings: CreateTrainingRequest) => {
        await mutateAsync(trainings);
    };

    return {
        handleCreate,
    };
};

export default useCreateTraining;
