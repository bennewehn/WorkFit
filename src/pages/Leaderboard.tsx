import LoaderboardUser from "../components/LeaderBoardUser";
import {Divider, Text} from "@chakra-ui/react";
import {IonContent, IonPage} from "@ionic/react";

const Loaderboard = () => {

    const usersFake = [{
        userId: 1, name: "TestUser", surname: "Surname", email: "test@test.com", password: "abc", balance: 10000
    }, {
        userId: 2, name: "TestUser2", surname: "Surnam2e", email: "test@tesdgt.com", password: "abc", balance: 13400
    }, {
        userId: 3, name: "Tessdg", surname: "osdhg", email: "test@tessdggt.com", password: "abc", balance: 1330
    }, {
        userId: 4, name: "sdgsdg", surname: "osdhg", email: "test@tessdggt.com", password: "abc", balance: 10
    }, {
        userId: 5, name: "dsdg", surname: "osdhg", email: "test@tessdggt.com", password: "abc", balance: 10
    }
    ];

    return (<IonPage>
        <IonContent fullscreen>
            <div style={{paddingInline: ".4em"}}>
                <Text fontSize={"4xl"} as="b" paddingBlock={"0.4em"}>Leaderboard</Text>
                {usersFake.map((user, idx, arr) => <>
                    <LoaderboardUser key={idx} placement={idx + 1}
                                     name={user.name}
                                     surname={user.surname.charAt(0) + "."}
                                     balance={user.balance}
                    />
                    {idx < arr.length - 1 && <Divider/>}
                </>)}
            </div>

        </IonContent>
    </IonPage>);
};

export default Loaderboard;
