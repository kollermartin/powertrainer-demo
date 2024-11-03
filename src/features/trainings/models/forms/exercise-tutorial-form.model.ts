import { DefaultOptionType } from "antd/lib/select";
import ExerciseTutorialType from "../../enums/exercise-tutorial-type.enum";

export interface IExerciseTutorialForm {
    name: string;
    type: ExerciseTutorialType;
    youtubeLink?: string;
    powerTrainerSource?: DefaultOptionType;
    description: string;
}
