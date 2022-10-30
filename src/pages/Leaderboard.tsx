import LoaderboardUser from "../components/LeaderBoardUser";
import {Divider, Heading, Text} from "@chakra-ui/react";
import {IonContent, IonPage} from "@ionic/react";
import {useContext, useEffect, useState} from "react";
import {TokenContext} from "../loginContext";
import TopBar from "../components/TopBar";

const Loaderboard = () => {

    const {token} = useContext(TokenContext);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const [data, setData] = useState<{ firstname: string, lastname: string, balance: number }[]>([]);

    useEffect(() => {
        fetch("https://etazeta.dev/WorkFit/WorkFit/dbif/get_ranked.php", {
            method: "POST",
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log(error));
    }, []);

    return (<IonPage>
        <IonContent fullscreen>
            <TopBar/>
            <div style={{paddingInline: ".7em"}}>
                <Heading fontSize="4xl" as="h2" paddingBlock={"0.4em"}>Leaderboard</Heading>
                {data.map((user, idx, arr) => <>
                    <LoaderboardUser key={idx} placement={idx + 1}
                                     name={user.firstname}
                                     surname={user.lastname.charAt(0) + "."}
                                     balance={user.balance}
                    />
                    {idx < arr.length - 1 && <Divider/>}
                </>)}
            </div>

        </IonContent>
    </IonPage>);
};

export default Loaderboard;
