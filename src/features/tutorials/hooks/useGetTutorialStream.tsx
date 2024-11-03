import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import apiClient from "../../../apiCalls/ApiClient";
import { DetailParams } from "./Dto";
import { TUTORIAL_PATH } from "../const/tutorials.const";
import { tutorialQueryKeys } from "./query-keys";

const fetchStreamUrl = async ({ id, signal }: DetailParams) => {
    if (!id || !signal) {
        throw new Error("Invalid params");
    }

    const response = await apiClient.get<string>(`${TUTORIAL_PATH}/${id}/stream`, {
        signal,
    });

    return response.data;
};

const UseGetTutorialStream = (videoId: string | undefined) => {
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: tutorialQueryKeys.stream(videoId),
        queryFn: ({ signal }) => fetchStreamUrl({ id: videoId, signal }),
        enabled: shouldLoadVideo,
    });

    const handleShouldLoadVideo = (value: boolean) => {
        setShouldLoadVideo(value);
    };

    return {
        streamLink: data,
        isLoading,
        isError,
        shouldLoadVideo,
        handleShouldLoadVideo,
    };
};

export default UseGetTutorialStream;
