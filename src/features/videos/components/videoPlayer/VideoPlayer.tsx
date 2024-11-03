import { useEffect, useRef } from "react";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import { App } from "antd";
import { useTranslation } from "react-i18next";
import VideoPreview from "./VideoPreview";
import Spinner from "../../../../shared/components/Spinner";

export interface VideoPlayerProps {
    streamLink: string | undefined;
    isLoading: boolean;
    isError: boolean;
    shouldLoadVideo: boolean;
    handleShouldLoadVideo: (value: boolean) => void;
}

const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    aspectRatio: "16:9",
};

const VideoPlayer = ({ streamLink, isError, isLoading, shouldLoadVideo, handleShouldLoadVideo }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<Player | null>(null);
    const { notification } = App.useApp();
    const { t } = useTranslation("common");

    const loadVideoHandler = () => {
        handleShouldLoadVideo(true);
    };

    useEffect(() => {
        if (shouldLoadVideo && streamLink && !isLoading && !isError) {
            const sources = [
                {
                    src: streamLink,
                    type: "application/x-mpegURL",
                    withCredentials: true,
                },
            ];
            if (!playerRef.current) {
                const videoElement = document.createElement("video");
                videoElement.classList.add("video-js", "vjs-big-play-centered");

                if (videoRef.current) {
                    videoRef.current.appendChild(videoElement);
                }

                playerRef.current = videojs(videoElement, {
                    ...videoJsOptions,
                    sources,
                });
            } else {
                const player = playerRef.current;
                player.autoplay(videoJsOptions.autoplay as never);
                player.src(sources);
            }
        }
    }, [streamLink, isError, isLoading, shouldLoadVideo]);

    useEffect(() => {
        return () => {
            if (playerRef.current) {
                if (!playerRef.current.isDisposed()) {
                    playerRef.current.dispose();
                }
                playerRef.current = null;
            }
        };
    }, []);

    if (isError) {
        notification.error({
            message: t("videoFetchFailed"),
        });
        return <div>Unexpected error</div>;
    }

    if (shouldLoadVideo && isLoading) {
        return <Spinner />;
    }

    const videoPlayer = (
        <div data-vjs-player="">
            <div style={{ width: "100%" }} ref={videoRef} />
        </div>
    );

    return shouldLoadVideo ? videoPlayer : <VideoPreview onClick={loadVideoHandler} />;
};

export default VideoPlayer;
