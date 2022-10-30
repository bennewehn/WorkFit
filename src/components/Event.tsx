import styles from "./Event.module.css";
import {FaBicycle, FaRunning, FaSwimmer, FaWalking} from "react-icons/fa";
import {Button, Heading, Text} from "@chakra-ui/react";
import {IonIcon} from "@ionic/react";
import {arrowForwardOutline} from "ionicons/icons";

export interface EventType {
    name: string,
    description: string,
    initiatorComp: number,
    disciplines: string,
    eventId: number,
    companies: number[]
}

function getIconForDiscipline(discipline: string) {
    switch (discipline) {
        case "laufen":
            return <FaWalking/>;
        case "joggen":
            return <FaRunning/>;
        case "schwimmen":
            return <FaSwimmer/>;
        case "radfahren":
            return <FaBicycle/>;
        default:
            return <></>;
    }
}

const Example: React.FC<EventType> = (props) => {
    return (
        <div className={styles.container} onClick={(e) => {
        }}>
            <div className={styles.icon}>
                {getIconForDiscipline(props.disciplines.split(",")[0])}
            </div>
            <div className={styles.eventDetails}>
                <Heading size="lg">{props.name}</Heading>
                <Text>{props.description}</Text>
                <Button className={styles.moreInfo} width="min-content"
                        rightIcon={<IonIcon icon={arrowForwardOutline}/>}>Mehr
                    Info</Button>
            </div>

        </div>
    );
};

export default Example;