import VideoCard from "../../videos/components/videoCard/VideoCard";
import useGetTutorialStream from "../hooks/useGetTutorialStream";

interface TutorialVideoCardProps {
    id: string;
    title: string;
    linkTo: string;
}

const TutorialVideoCard = ({ id, title, linkTo }: TutorialVideoCardProps) => {
    const { streamLink, isLoading, isError, shouldLoadVideo, handleShouldLoadVideo } = useGetTutorialStream(id);

    return (
        <VideoCard
            id={id}
            title={title}
            linkTo={linkTo}
            streamLink={streamLink}
            isLoading={isLoading}
            isError={isError}
            shouldLoadVideo={shouldLoadVideo}
            handleShouldLoadVideo={handleShouldLoadVideo}
        />
    );
};

export default TutorialVideoCard;
