import { useQuery } from "@tanstack/react-query";
import { ExerciseTutorial } from "../models/exercise-tutorial.model";
import { exerciseTutorialQueryKeys } from "./query-keys";
import { exerciseTutorialsMock } from "../mocks/exercise-tutorials.mock";
import { getExerciseTutorialFromExerciseTutorialsListQuery } from "./utils";

const getExerciseTutorial = async (id: string) => {
    const exerciseTutorial = getExerciseTutorialFromExerciseTutorialsListQuery(id);

    if (exerciseTutorial) {
        return new Promise<ExerciseTutorial>((resolve) => {
            resolve(exerciseTutorial);
        });
    }

    return new Promise<ExerciseTutorial>((resolve) => {
        setTimeout(() => {
            resolve(exerciseTutorialsMock[0]);
        }, 1000);
    });
};

const useGetExerciseTutorial = (id: string | undefined) => {
    if (!id) {
        throw new Error("Invalid params");
    }
    const { data, isLoading, isError } = useQuery({
        queryKey: exerciseTutorialQueryKeys.detail(id),
        queryFn: () => getExerciseTutorial(id),
        enabled: !!id,
        meta: {
            errorMessage: "exerciseTutorialFetchFailed",
        },
    });

    return {
        data,
        isLoading,
        isError,
    };
};

export default useGetExerciseTutorial;
