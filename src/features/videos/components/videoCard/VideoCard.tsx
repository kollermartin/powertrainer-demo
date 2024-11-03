import { Link } from "react-router-dom";
import { Card } from "antd";
import { ReactNode } from "react";
import VideoPlayer, { VideoPlayerProps } from "../videoPlayer/VideoPlayer";
import classes from "./VideoCard.module.css";

interface VideoCardProps extends VideoPlayerProps {
    id: string;
    title?: string;
    linkTo?: string;
    actions?: ReactNode;
}

const VideoCard = ({
    id,
    title = "",
    linkTo = "",
    streamLink,
    shouldLoadVideo,
    isLoading,
    handleShouldLoadVideo,
    isError,
    actions = null,
}: VideoCardProps) => {
    const prepareVideoCardTitleAndLink = () => {
        if (title && !linkTo) {
            return <Card.Meta className={classes.meta} title={title} />;
        }
        if (title && linkTo) {
            return (
                <Link to={linkTo}>
                    <Card.Meta className={classes.meta} title={title} />
                </Link>
            );
        }

        return null;
    };

    return (
        <Card
            className={classes.card}
            key={id}
            actions={actions ? [actions] : undefined}
            cover={
                <VideoPlayer
                    streamLink={streamLink}
                    isError={isError}
                    shouldLoadVideo={shouldLoadVideo}
                    handleShouldLoadVideo={handleShouldLoadVideo}
                    isLoading={isLoading}
                />
            }
        >
            {prepareVideoCardTitleAndLink()}
        </Card>
    );
};

export default VideoCard;
