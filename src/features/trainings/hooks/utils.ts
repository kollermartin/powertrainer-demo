import { exerciseTutorialQueryKeys } from "./query-keys";
import queryClient from "../../../apiCalls/QueryClient";
import { TableData } from "../../../shared/models/tables/table-data-response.model";
import { ExerciseTutorial } from "../models/exercise-tutorial.model";

// Helper for demo purposes, to look for a cached exercise tutorial in the exercise tutorials list
// Dont care about hardcoding the list index in query keys, as this is just a helper for demo purposes
export const getExerciseTutorialFromExerciseTutorialsListQuery = (id: string) => {
    const exerciseTutorials = queryClient.getQueryData(
        exerciseTutorialQueryKeys.list(1, {}),
    ) as TableData<ExerciseTutorial>;
    return exerciseTutorials?.items.find((exerciseTutorial) => exerciseTutorial.id === id);
};
