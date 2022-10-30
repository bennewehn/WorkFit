import {IonContent, IonIcon, IonPage} from "@ionic/react";
import TopBar from "../components/TopBar";
import SearchBar from "../components/SearchBar";

import styles from "./Events.module.css";
import Event, {EventType} from "../components/Event";
import {Button, Divider, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {checkmark, chevronDownOutline} from "ionicons/icons";
import {useEffect, useState} from "react";

const exampleTypes = [
    "running",
    "walking"
];
const exampleAssociations = [
    {
        code: 1231112,
        company: "EDAG"
    }
];


function getEvents(token: string) {
    return new Promise<EventType[]>((resolve, reject) => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
            "useremail": "martin.landsiedel@gmail.com",
            "password": "password",
            "code": 4
        });


        fetch("https://etazeta.dev/WorkFit/WorkFit/dbif/get_events.php", {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
}

function login() {
    return new Promise<{ token: string }>((resolve, reject) => {

        const raw = JSON.stringify({
            "useremail": "martin.landsiedel@gmail.com",
            "password": "password",
            "code": 4
        });

        fetch("https://etazeta.dev/WorkFit/WorkFit/dbif/login.php", {
            method: "POST",
            body: raw,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
}

const Events: React.FC = () => {
        const [showOnlyMine, setShowOnlyMine] = useState<boolean>(false);
        const emptyIcon = <div className={styles.oneEm}></div>;
        const checkmarkIcon = <IonIcon icon={checkmark}/>;
        const [data, setData] = useState<EventType[]>([]);
        console.log(data);
        useEffect(() => {
            login().then(({token}) => getEvents(token)).then((value)=>setData(value));
        }, []);
        return (
            <IonPage>
                <IonContent fullscreen>
                    <TopBar fixed>
                        <SearchBar/>
                    </TopBar>
                    <Menu>
                        <MenuButton className={styles.filterMenu} as={Button}
                                    rightIcon={<IonIcon icon={chevronDownOutline}/>}>
                            {showOnlyMine ? "Meine Events" : "Alle Events"}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => setShowOnlyMine(true)}
                                      icon={showOnlyMine ? checkmarkIcon : emptyIcon}>Meine Events</MenuItem>
                            <MenuItem onClick={() => setShowOnlyMine(false)}
                                      icon={showOnlyMine ? emptyIcon : checkmarkIcon}>Alle Events</MenuItem>
                        </MenuList>
                    </Menu>
                    <main className={styles.container}>
                        {
                            data.map((event, i, array) => {
                                return <div key={i}><Event {...event} />
                                    {i < array.length - 1 ? <Divider/> : <div></div>}</div>;
                            })
                        }
                    </main>
                </IonContent>
            </IonPage>
        );
    }
;

export default Events;
