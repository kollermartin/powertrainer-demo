import { ExerciseTutorialAutocompleteOption } from "../models/exercise-tutorial.model";
import ExerciseTutorialType from "../enums/exercise-tutorial-type.enum";

export const exerciseTutorialsAutocompleteMock: ExerciseTutorialAutocompleteOption[] = [
    {
        id: "1",
        name: "Squat",
        type: ExerciseTutorialType.YOUTUBE,
    },
    {
        id: "2",
        name: "Deadlift",
        type: ExerciseTutorialType.YOUTUBE,
    },
    {
        id: "3",
        name: "Military Press",
        type: ExerciseTutorialType.YOUTUBE,
    },
    {
        id: "4",
        name: "Bench Press",
        type: ExerciseTutorialType.YOUTUBE,
    },
];
