import ExerciseTutorialType from "../enums/exercise-tutorial-type.enum";

export interface ExerciseTutorialOverview {
    id: string;
    name: string;
    type: ExerciseTutorialType;
}

export interface ExerciseTutorial {
    id: string;
    name: string;
    type: ExerciseTutorialType;
    source: string;
    description?: string;
}

export interface ExerciseTutorialAutocompleteOption {
    id: string;
    name: string;
    type: ExerciseTutorialType;
}
