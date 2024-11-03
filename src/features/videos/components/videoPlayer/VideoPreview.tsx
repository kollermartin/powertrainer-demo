import { CaretRightOutlined } from "@ant-design/icons";
import { MouseEventHandler, useContext } from "react";
import logoBlack from "../../../../assets/logos/2-black.svg";
import logoWhite from "../../../../assets/logos/2-white.svg";
import classes from "./VideoPreview.module.css";
import ThemeContext from "../../../../store/theme/theme-context";

interface VideoPreviewProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const VideoPreview = ({ onClick }: VideoPreviewProps) => {
    const themeCtx = useContext(ThemeContext);

    return (
        <div className={classes.imageContainer}>
            <img src={themeCtx.isLightTheme ? logoBlack : logoWhite} alt="video thumbnail" className={classes.image} />
            <div className={classes.overlay}>
                <button type="button" onClick={onClick} className={classes.playButton} aria-label="play video">
                    <CaretRightOutlined className={classes.icon} />
                </button>
            </div>
        </div>
    );
};

export default VideoPreview;
