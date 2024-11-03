import { TFunction } from "i18next";
import DifficultyLoad from "../enums/difficulty-load.enum";
import DifficultyType from "../enums/difficulty-type.enum";
import DIFFICULTY_RPE from "../const/difficulty.const";
import MeasurementUnit from "../enums/measurement-unit.enum";

export const getDifficultyOptions = (t: TFunction) => [
    {
        label: <span>{t("difficultyLoadGroup")}</span>,
        title: "difficultyLoadGroup",
        options: Object.values(DifficultyLoad)
            .filter((loadValue) => +loadValue > 0)
            .map((loadValue) => ({
                label: <span>{t(`difficultyLoad${loadValue}`)}</span>,
                value: `${DifficultyType.LOAD}-${loadValue}`,
            })),
    },
    {
        label: <span>{t("difficultyRpeGroup")}</span>,
        title: "difficultyRpeGroup",
        options: DIFFICULTY_RPE.map((rpeValue) => ({
            label: <span>{t("difficultyRpe", { value: rpeValue })}</span>,
            value: `${DifficultyType.RPE}-${rpeValue}`,
        })),
    },
];

export const getMeasurementUnitOptions = (t: TFunction) =>
    Object.values(MeasurementUnit)
        .filter((val) => +val > 0)
        .map((unit) => ({
            label: <span>{t(`measurementUnit${unit}`)}</span>,
            value: unit,
        }));
