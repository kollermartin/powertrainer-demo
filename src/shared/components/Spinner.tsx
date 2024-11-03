import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import classes from "./Spinner.module.css";

const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;
const Spinner = () => {
    return (
        <div className={classes.spinnerLayout}>
            <Spin className={classes.spinner} indicator={antIcon} />
        </div>
    );
};

export default Spinner;
