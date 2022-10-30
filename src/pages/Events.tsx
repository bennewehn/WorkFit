import {IonContent, IonIcon, IonPage} from "@ionic/react";
import TopBar from "../components/TopBar";
import SearchBar from "../components/SearchBar";

import styles from "./Events.module.css";
import Event, {EventType} from "../components/Event";
import {Button, Divider, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {checkmark, chevronDownOutline} from "ionicons/icons";
import {useEffect, useRef, useState} from "react";
import dbLogin from "../utils/Login";
import useLogout from "../utils/Logout";


function getEvents(token: string) {
    return new Promise<EventType[]>((resolve, reject) => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
            "useremail": "antonpieper@gmx.de",
            "password": "AntonPieper"
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

const Events: React.FC = () => {
        const [showOnlyMine, setShowOnlyMine] = useState<boolean>(false);
        const emptyIcon = <div className={styles.oneEm}></div>;
        const checkmarkIcon = <IonIcon icon={checkmark}/>;
        const [data, setData] = useState<EventType[]>([]);
        const rawData = useRef<EventType[]>([]);
        const logout = useLogout();

        const onInput: (text: string) => void = (text) => {
            console.log(rawData.current);
            setData(rawData.current.filter((event) => event.name.includes(text) || event.description.includes(text)));
        };

        useEffect(() => {
            dbLogin({
                "useremail": "martin.landsiedel@gmail.com",
                "password": "password",
            }).then(async ({token}) => {
                if (!token) logout();
                rawData.current = await getEvents(token!);
                onInput("");
            });
        }, []);
        return (
            <IonPage>
                <IonContent fullscreen>
                    <TopBar fixed>
                        <SearchBar onInput={onInput}/>
                    </TopBar>
                    <Menu>
                        <MenuButton position="fixed" top="5em" zIndex={999999} backdropFilter="blur(3rem)" margin=".5em"
                                    as={Button}
                                    rightIcon={<IonIcon icon={chevronDownOutline}/>}>
                            {showOnlyMine ? "Meine Events" : "Alle Events"}
                        </MenuButton>
                        <MenuList backgroundColor="var(--ion-background-color)">
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
