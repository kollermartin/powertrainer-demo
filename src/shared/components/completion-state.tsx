import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import classes from "./completion-state.module.css";

interface CompletionStateProps {
    completed: boolean;
}

const completionState = ({ completed }: CompletionStateProps) => {
    return completed ? (
        <CheckCircleOutlined className={`${classes.training} ${classes.trainingCompleted}`} />
    ) : (
        <CloseCircleOutlined className={`${classes.training} ${classes.trainingNotCompleted}`} />
    );
};

export default completionState;
