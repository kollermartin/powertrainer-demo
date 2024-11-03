import ReactPlayer from "react-player/youtube";

interface YoutubePlayerProps {
    url: string;
}

const YoutubePlayer = ({ url }: YoutubePlayerProps) => {
    return <ReactPlayer controls url={url} width="100%" />;
};

export default YoutubePlayer;
