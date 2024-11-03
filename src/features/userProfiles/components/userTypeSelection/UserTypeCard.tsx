import { Card } from "antd";
import classes from "./UserTypeCard.module.css";

interface UserTypeCardProps {
    imgSrc: string;
    title: string;
    info: string;
    selected: boolean;
    onClick: () => void;
}

const UserTypeCard = ({ imgSrc, title, info, selected, onClick }: UserTypeCardProps) => {
    const handleCardClick = () => {
        onClick();
    };

    return (
        <Card
            className={selected ? classes.selected : classes.unselected}
            onClick={handleCardClick}
            cover={<img alt="Info" src={imgSrc} />}
        >
            <Card.Meta title={title} description={<span>{info}</span>} />
        </Card>
    );
};

export default UserTypeCard;
