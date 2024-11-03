import { useMutation } from "@tanstack/react-query";
import { ExerciseTutorialRequest } from "../models/dto/exercise-tutorials.dto";
import { ExerciseTutorial } from "../models/exercise-tutorial.model";
import queryClient from "../../../apiCalls/QueryClient";
import { exerciseTutorialQueryKeys } from "./query-keys";
import { getExerciseTutorialFromExerciseTutorialsListQuery } from "./utils";
import { TableData } from "../../../shared/models/tables/table-data-response.model";

interface UpdateExerciseTutorialParams {
    id: string;
    request: ExerciseTutorialRequest;
}

const updateExerciseTutorial = async ({ id, request }: UpdateExerciseTutorialParams) => {
    if (!request || !id) {
        throw new Error("Invalid params");
    }

    const tutorial = getExerciseTutorialFromExerciseTutorialsListQuery(id);

    if (!tutorial) {
        throw new Error("Exercise tutorial not found");
    }

    return new Promise<ExerciseTutorial>((resolve) => {
        resolve({ ...tutorial, ...request, source: request.source ?? "" });
    });
};

const useUpdateExerciseTutorial = () => {
    const { mutateAsync } = useMutation<ExerciseTutorial, unknown, UpdateExerciseTutorialParams>({
        mutationFn: updateExerciseTutorial,
        onSuccess: async (tutorial) => {
            queryClient.setQueryData(exerciseTutorialQueryKeys.list(1, {}), (oldData: TableData<ExerciseTutorial>) => {
                return {
                    ...oldData,
                    items: oldData?.items.map((item) => (item.id === tutorial.id ? tutorial : item)),
                };
            });
        },
        meta: {
            errorMessage: "exerciseTutorialUpdateFailed",
            successMessage: "exerciseTutorialUpdated",
        },
    });

    const handleUpdate = async (request: ExerciseTutorialRequest, id: string) => {
        await mutateAsync({ id, request });
    };

    return {
        handleUpdate,
    };
};

export default useUpdateExerciseTutorial;
