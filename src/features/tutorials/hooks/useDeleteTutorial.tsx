import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../apiCalls/QueryClient";
import { Failure } from "../../../apiCalls/Failure";
import { tutorialQueryKeys } from "./query-keys";
import { Tutorial, Tutorials } from "./Dto";
import { getTutorialFromTutorialsListQuery } from "./utils";

const deleteTutorial = async (id: string): Promise<Tutorial> => {
    if (!id) {
        throw new Error("Invalid params");
    }

    // Mocking the deletion of a tutorial and returning the deleted tutorial from cache
    const tutorialToDelete = getTutorialFromTutorialsListQuery(id);

    if (!tutorialToDelete) {
        throw new Error("Tutorial not found");
    }

    return new Promise<Tutorial>((resolve) => {
        resolve({ ...tutorialToDelete });
    });
};

const useDeleteTutorial = () => {
    const { mutate } = useMutation<Tutorial, Failure, string>({
        mutationFn: deleteTutorial,
        onSuccess: async (tutorial) => {
            // Remove the deleted tutorial from the list of tutorials
            await queryClient.setQueryData(tutorialQueryKeys.list(1, {}), (oldData: Tutorials) => {
                return {
                    ...oldData,
                    items: oldData.items.filter((item) => item.id !== tutorial.id),
                };
            });
        },
        meta: {
            errorMessage: "tutorialDeletionFailed",
            successMessage: "tutorialDeleted",
        },
    });

    const handleDelete = (id: string) => {
        mutate(id);
    };

    return {
        handleDelete,
    };
};

export default useDeleteTutorial;
