import { Col, Divider, Result, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ExerciseTutorial } from "../../models/exercise-tutorial.model";
import classes from "./ExerciseTutorialDetail.module.css";
import ExerciseTutorialType from "../../enums/exercise-tutorial-type.enum";
import VideoPlayer from "../../../videos/components/videoPlayer/VideoPlayer";
import YoutubePlayer from "../../../../shared/components/YoutubePlayer";
import Container from "../../../../shared/components/Container";
import ResponsiveContainer from "../../../../shared/components/ResponsiveContainer";
import useGetTutorialStream from "../../../tutorials/hooks/useGetTutorialStream";

const ExerciseTutorialDetail = ({ data, displayTitle = true }: ExerciseTutorialDetailProps) => {
    const { t } = useTranslation(["trainings", "common"]);
    const { streamLink, isLoading, isError, shouldLoadVideo, handleShouldLoadVideo } = useGetTutorialStream(
        data.source,
    );
    return (
        <Container className={classes.containerContent}>
            {displayTitle && (
                <Row>
                    <Typography.Title level={2}>{data.name}</Typography.Title>
                    <Divider />
                </Row>
            )}
            {data.type === ExerciseTutorialType.NONE && (
                <Row justify="center">
                    <Col>
                        <Result status="info" title={t("noExerciseTutorialSource")} />
                    </Col>
                </Row>
            )}
            {data.type === ExerciseTutorialType.POWERTRAINER && (
                <ResponsiveContainer size="small">
                    <VideoPlayer
                        streamLink={streamLink}
                        shouldLoadVideo={shouldLoadVideo}
                        handleShouldLoadVideo={handleShouldLoadVideo}
                        isError={isError}
                        isLoading={isLoading}
                    />
                </ResponsiveContainer>
            )}
            {data.type === ExerciseTutorialType.YOUTUBE && (
                <ResponsiveContainer size="medium">
                    <YoutubePlayer url={data.source} />
                </ResponsiveContainer>
            )}
            {data.description && (
                <Row>
                    <Col span={24}>
                        <Typography.Title level={4}>{t("common:description")}</Typography.Title>
                    </Col>
                    <Col>
                        <Typography.Text>{data.description}</Typography.Text>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

interface ExerciseTutorialDetailProps {
    data: ExerciseTutorial;
    displayTitle?: boolean;
}
export default ExerciseTutorialDetail;
