import { Col, Row } from "antd";
import classes from "./TutorialsGrid.module.css";
import { Tutorials } from "../hooks/Dto";
import TutorialVideoCard from "./TutorialVideoCard";

interface TutorialsGridProps {
    data: Tutorials;
}

const TutorialsGrid = ({ data }: TutorialsGridProps) => {
    return (
        <Row gutter={[16, 16]} justify={{ xs: "center", md: "start" }} className={classes.marginTop}>
            {data.items.map((x) => {
                return (
                    <Col sm={24} md={12} lg={8} xl={6} key={x.id}>
                        <TutorialVideoCard id={x.id} title={x.title} linkTo={`/tutorials/${x.id}`} />
                    </Col>
                );
            })}
        </Row>
    );
};

export default TutorialsGrid;
