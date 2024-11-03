import ExerciseTutorialType from "../../enums/exercise-tutorial-type.enum";

export interface ExerciseTutorialRequest {
    name: string;
    type: ExerciseTutorialType;
    source: string | undefined;
    description: string;
}

export interface ExerciseTutorialStream {
    streamLink: string;
}
