import { useMutation } from "@tanstack/react-query";
import { TutorialDetail, Tutorials, UpdateTutorialParams, UpdateTutorialRequest } from "./Dto";
import queryClient from "../../../apiCalls/QueryClient";
import { Failure } from "../../../apiCalls/Failure";
import { tutorialQueryKeys } from "./query-keys";
import { getTutorialFromTutorialsListQuery } from "./utils";

const updateTutorial = async ({ request, id }: UpdateTutorialParams) => {
    if (!request || !id) {
        throw new Error("Invalid params");
    }

    const tutorial = getTutorialFromTutorialsListQuery(id);

    if (!tutorial) {
        throw new Error("Tutorial not found");
    }

    return new Promise<TutorialDetail>((resolve) => {
        resolve({ ...tutorial, ...request });
    });
};

const useUpdateTutorial = () => {
    const { mutate } = useMutation<TutorialDetail, Failure, UpdateTutorialParams>({
        mutationFn: updateTutorial,
        onSuccess: async (tutorialDetail) => {
            await queryClient.setQueryData(tutorialQueryKeys.list(1, {}), (oldData: Tutorials) => {
                return {
                    ...oldData,
                    items: oldData.items.map((item) => (item.id === tutorialDetail.id ? tutorialDetail : item)),
                };
            });
        },
        meta: {
            errorMessage: "tutorialUpdateFailed",
            successMessage: "tutorialUpdated",
        },
    });

    const handleUpdate = (request: UpdateTutorialRequest, id?: string) => {
        mutate({ id, request });
    };

    return {
        handleUpdate,
    };
};

export default useUpdateTutorial;
