import MeasurementUnit from "../enums/measurement-unit.enum";

export interface Measurement {
    unit: MeasurementUnit;
    value: number;
}
