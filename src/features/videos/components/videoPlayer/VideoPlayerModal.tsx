import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import VideoPlayer, { VideoPlayerProps } from "./VideoPlayer";

interface VideoPlayerModalProps extends VideoPlayerProps {
    open: boolean;
    onOk: () => void;
}

const VideoPlayerModal = ({
    open,
    onOk,
    shouldLoadVideo,
    handleShouldLoadVideo,
    isError,
    isLoading,
    streamLink,
}: VideoPlayerModalProps) => {
    const { t } = useTranslation("common");
    return (
        <Modal
            maskClosable
            closable
            open={open}
            onOk={onOk}
            onCancel={onOk}
            footer={
                <Button onClick={() => onOk()} type="primary">
                    {t("close")}
                </Button>
            }
        >
            <VideoPlayer
                shouldLoadVideo={shouldLoadVideo}
                handleShouldLoadVideo={handleShouldLoadVideo}
                isError={isError}
                isLoading={isLoading}
                streamLink={streamLink}
            />
        </Modal>
    );
};

export default VideoPlayerModal;
