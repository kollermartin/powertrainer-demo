import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../apiCalls/QueryClient";
import { Failure } from "../../../apiCalls/Failure";
import { exerciseTutorialQueryKeys } from "./query-keys";
import { ExerciseTutorial } from "../models/exercise-tutorial.model";
import { getExerciseTutorialFromExerciseTutorialsListQuery } from "./utils";
import { TableData } from "../../../shared/models/tables/table-data-response.model";

const deleteExerciseTutorial = async (id: string): Promise<ExerciseTutorial> => {
    if (!id) {
        throw new Error("Invalid params");
    }

    const exerciseTutorials = getExerciseTutorialFromExerciseTutorialsListQuery(id);

    if (!exerciseTutorials) {
        throw new Error("Exercise tutorial not found");
    }

    return new Promise<ExerciseTutorial>((resolve) => {
        resolve(exerciseTutorials);
    });
};

const useDeleteExerciseTutorial = () => {
    const { mutate } = useMutation<{ id: string }, Failure, string>({
        mutationFn: deleteExerciseTutorial,
        onSuccess: async (exerciseTutorial) => {
            await queryClient.setQueryData(
                exerciseTutorialQueryKeys.list(1, {}),
                (oldData: TableData<ExerciseTutorial>) => {
                    return {
                        ...oldData,
                        items: oldData.items.filter((item) => item.id !== exerciseTutorial.id),
                    };
                },
            );
        },
        meta: {
            errorMessage: "exerciseTutorialDeletionFailed",
            successMessage: "exerciseTutorialDeleted",
        },
    });

    const handleDelete = (id: string) => {
        mutate(id);
    };

    return {
        handleDelete,
    };
};

export default useDeleteExerciseTutorial;
