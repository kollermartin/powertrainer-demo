import { useQuery } from "@tanstack/react-query";
import { DetailParams, TutorialDetail } from "./Dto";
import { tutorialQueryKeys } from "./query-keys";
import { getTutorialFromTutorialsListQuery } from "./utils";
import { tutorialDetailMock } from "../components/mocks/tutorial-detail.mock";

const fetchTutorial = async ({ id, signal }: DetailParams) => {
    if (!id || !signal) {
        throw new Error("Invalid params");
    }

    // Mocking the fetching of a tutorial and returning the tutorial
    const tutorial = getTutorialFromTutorialsListQuery(id);

    if (tutorial) {
        const tutorialDetail = { ...tutorial, description: "Random mocked description" } as TutorialDetail;
        return new Promise<TutorialDetail>((resolve) => {
            resolve(tutorialDetail);
        });
    }

    return new Promise<TutorialDetail>((resolve) => {
        setTimeout(() => resolve(tutorialDetailMock), 1000);
    });
};

const useGetTutorial = (id?: string, enabled: boolean = true) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: tutorialQueryKeys.detail(id),
        queryFn: ({ signal }) => fetchTutorial({ id, signal }),
        enabled,
    });

    return {
        data,
        isLoading,
        isError,
    };
};

export default useGetTutorial;
