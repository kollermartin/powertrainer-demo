import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import common_en from "./namespaces/common/common_en.json";
import common_cs from "./namespaces/common/common_cs.json";
import events_en from "./namespaces/events/events_en.json";
import events_cs from "./namespaces/events/events_cs.json";
import results_en from "./namespaces/results/results_en.json";
import results_cs from "./namespaces/results/results_cs.json";
import trainings_en from "./namespaces/trainings/trainings_en.json";
import trainings_cs from "./namespaces/trainings/trainings_cs.json";
import tutorials_en from "./namespaces/tutorials/tutorials_en.json";
import tutorials_cs from "./namespaces/tutorials/tutorials_cs.json";
import userProfiles_cs from "./namespaces/userProfiles/userProfiles_cs.json";
import userProfiles_en from "./namespaces/userProfiles/userProfiles_en.json";
import notifications_en from "./namespaces/notifications/notifications_en.json";
import notifications_cs from "./namespaces/notifications/notifications_cs.json";
import clients_en from "./namespaces/clients/clients_en.json";
import clients_cs from "./namespaces/clients/clients_cs.json";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                common: common_en,
                events: events_en,
                results: results_en,
                trainings: trainings_en,
                tutorials: tutorials_en,
                userProfiles: userProfiles_en,
                notifications: notifications_en,
                clients: clients_en,
            },
            cs: {
                common: common_cs,
                events: events_cs,
                results: results_cs,
                trainings: trainings_cs,
                tutorials: tutorials_cs,
                userProfiles: userProfiles_cs,
                notifications: notifications_cs,
                clients: clients_cs,
            },
        },
        fallbackLng: "en",
        lng: "en",
        defaultNS: "common",
    })
    .then();

export default i18next;
