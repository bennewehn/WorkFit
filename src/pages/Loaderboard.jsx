import { IonContent, IonPage } from '@ionic/react';
import './Home.css';
import LoaderboardUser from '../components/LeaderBoardUser';
import { Text } from '@chakra-ui/react';

const Loaderboard = () => {

  const usersFake = [
    {
      userId: 1,
      name: "TestUser",
      surname: "Surname",
      email: "test@test.com",
      password: "abc",
      balance: 10000
    },
    {
      userId: 2,
      name: "TestUser2",
      surname: "Surnam2e",
      email: "test@tesdgt.com",
      password: "abc",
      balance: 13400
    },
    {
      userId: 3,
      name: "Tessdg",
      surname: "osdhg",
      email: "test@tessdggt.com",
      password: "abc",
      balance: 1330
    },
    {
      userId: 4,
      name: "sdgsdg",
      surname: "osdhg",
      email: "test@tessdggt.com",
      password: "abc",
      balance: 10
    },
    {
      userId: 5,
      name: "dsdg",
      surname: "osdhg",
      email: "test@tessdggt.com",
      password: "abc",
      balance: 10
    }

  ]

  return (
    <IonPage>
      <IonContent fullscreen>
        <Text fontSize={"4xl"} as="b" padding={"0.4em"} >Leaderboard</Text>
        {
          usersFake.map((user, idx) =>
            <LoaderboardUser key={idx} placement={idx + 1}
              name={user.name}
              surname={user.surname.charAt(0) + "."}
              balance={user.balance}
            />)
        }
      </IonContent>
    </IonPage>
  );
};

export default Loaderboard;
