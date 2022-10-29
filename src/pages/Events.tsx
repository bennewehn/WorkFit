import {IonContent, IonPage} from "@ionic/react";
import styles from "./Events.module.css";
import {Input} from "@chakra-ui/react";

const Events: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <div>
                    <img className={styles.logo} src="assets/images/logo.png" alt="Logo"/>
                    <Input placeholder="Search"/>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Events;
