import { useMutation } from "@tanstack/react-query";
import { v4 } from "uuid";
import { ExerciseTutorialRequest } from "../models/dto/exercise-tutorials.dto";
import { ExerciseTutorial } from "../models/exercise-tutorial.model";
import { Failure } from "../../../apiCalls/Failure";
import queryClient from "../../../apiCalls/QueryClient";
import { exerciseTutorialQueryKeys } from "./query-keys";
import { TableData } from "../../../shared/models/tables/table-data-response.model";

const createExerciseTutorial = async (request: ExerciseTutorialRequest) => {
    const response: ExerciseTutorial = {
        ...request,
        id: v4().toString(),
        source: request.source ?? "",
    };

    return new Promise<ExerciseTutorial>((resolve) => {
        resolve(response);
    });
};

const useCreateExerciseTutorial = () => {
    const { mutateAsync } = useMutation<ExerciseTutorial, Failure, ExerciseTutorialRequest>({
        mutationFn: createExerciseTutorial,
        onSuccess: async (exerciseTutorial) => {
            queryClient.setQueryData(exerciseTutorialQueryKeys.list(1, {}), (oldData: TableData<ExerciseTutorial>) => {
                return {
                    ...oldData,
                    items: [...(oldData?.items ?? []), exerciseTutorial],
                };
            });
        },
        meta: {
            errorMessage: "exerciseTutorialCreateFailed",
            successMessage: "exerciseTutorialCreateSuccess",
        },
    });

    const handleCreate = async (exerciseTutorial: ExerciseTutorialRequest) => {
        await mutateAsync(exerciseTutorial);
    };

    return {
        handleCreate,
    };
};

export default useCreateExerciseTutorial;
