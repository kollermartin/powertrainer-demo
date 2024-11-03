import dayjs from "dayjs";
import { DefaultOptionType } from "antd/lib/select";
import MeasurementUnit from "../../enums/measurement-unit.enum";

export interface ExerciseForm {
    exerciseTutorial: DefaultOptionType;
    reps: number | null;
    sets: number | null;
    measurementValue: number | null;
    measurementUnit: MeasurementUnit;
    // difficulty is in value and type format split by '-'
    // e.g. '1-2' where 1 is type and 2 is value
    difficulty: string;
    note: string;
}

interface TrainingForm {
    assigneeId: DefaultOptionType;
    name: string;
    scheduledDate: dayjs.Dayjs | string;
    exercises: ExerciseForm[];
}

export interface ITrainingsForm {
    trainings: TrainingForm[];
}
