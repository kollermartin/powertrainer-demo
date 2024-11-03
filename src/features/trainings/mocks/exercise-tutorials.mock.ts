import { ExerciseTutorial } from "../models/exercise-tutorial.model";
import ExerciseTutorialType from "../enums/exercise-tutorial-type.enum";

export const exerciseTutorialsMock: ExerciseTutorial[] = [
    {
        name: "Squat",
        type: ExerciseTutorialType.YOUTUBE,
        source: "https://www.youtube.com/watch?v=Rvy12jFLBFo",
        description: "Squat description",
        id: "1",
    },
    {
        name: "Deadlift",
        type: ExerciseTutorialType.YOUTUBE,
        source: "https://www.youtube.com/watch?v=AweC3UaM14o",
        description: "Deadlift description",
        id: "2",
    },
    {
        name: "Military Press",
        type: ExerciseTutorialType.YOUTUBE,
        source: "https://www.youtube.com/watch?v=G2qpTG1Eh40",
        description: "Military Press description",
        id: "3",
    },
    {
        name: "Bench Press",
        type: ExerciseTutorialType.YOUTUBE,
        source: "https://www.youtube.com/watch?v=0GyGajjDYiI",
        description: "Bench Press description",
        id: "4",
    },
];
