import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ColSize } from "antd/es/grid";
import useGetTutorial from "../hooks/useGetTutorial";
import classes from "./TutorialDetailPage.module.css";
import RichEditor from "../../editor/RichEditor";
import VideoPlayer from "../../videos/components/videoPlayer/VideoPlayer";
import Spinner from "../../../shared/components/Spinner";
import Container from "../../../shared/components/Container";
import useGetTutorialStream from "../hooks/useGetTutorialStream";

const sizeXs: ColSize = {
    span: 20,
    offset: 2,
};

const sizeMd: ColSize = {
    span: 16,
    offset: 4,
};

const sizeXl: ColSize = {
    span: 14,
    offset: 5,
};

const sizeXxl: ColSize = {
    span: 12,
    offset: 6,
};

const TutorialDetailPage = () => {
    const { id } = useParams<string>();

    const { t } = useTranslation("tutorials");
    const { isLoading, isError, data } = useGetTutorial(id);
    const {
        streamLink,
        isLoading: isLoadingVideo,
        isError: isErrorVideo,
        shouldLoadVideo,
        handleShouldLoadVideo,
    } = useGetTutorialStream(id);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <div>Unexpected error</div>;
    }

    return (
        data && (
            <>
                <Row>
                    <Col xs={sizeXs} md={sizeMd} xl={sizeXl} xxl={sizeXxl}>
                        <Typography.Title className={classes.title}>{data.title}</Typography.Title>
                    </Col>
                </Row>
                <Row>
                    <Col xs={sizeXs} md={sizeMd} xl={sizeXl} xxl={sizeXxl}>
                        <Container>
                            <VideoPlayer
                                streamLink={streamLink}
                                handleShouldLoadVideo={handleShouldLoadVideo}
                                shouldLoadVideo={shouldLoadVideo}
                                isLoading={isLoadingVideo}
                                isError={isErrorVideo}
                            />
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col xs={sizeXs} md={sizeMd} xl={sizeXl} xxl={sizeXxl}>
                        <Typography.Title level={3}>{t("description")}</Typography.Title>
                        <RichEditor readonly value={data.description} />
                    </Col>
                </Row>
            </>
        )
    );
};

export default TutorialDetailPage;
