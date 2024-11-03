import queryClient from "../../../apiCalls/QueryClient";
import { tutorialQueryKeys } from "./query-keys";
import { Tutorials } from "./Dto";

// Helper for demo purposes, to look for a cached tutorial in the tutorials list
// Dont care about hardcoding the list index in query keys, as this is just a helper for demo purposes
export const getTutorialFromTutorialsListQuery = (id: string) => {
    const tutorials = queryClient.getQueryData(tutorialQueryKeys.list(1, {})) as Tutorials;
    return tutorials?.items.find((tutorial) => tutorial.id === id);
};
