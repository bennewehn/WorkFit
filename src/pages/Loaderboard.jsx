import { IonContent, IonPage } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import LoaderboardUser from '../components/LeaderBoardUser';
import { TokenContext } from '../loginContext'
const Loaderboard = () => {

  const { token } = useContext(TokenContext)

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://etazeta.dev/WorkFit/WorkFit/dbif/get_ranked.php", {
      method: "POST",
      headers: myHeaders,
    })
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.log(error));
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {
          data.map((user, idx) =>
            <LoaderboardUser key={idx} placement={idx + 1}
              name={user.firstname}
              surname={user.lastname.charAt(0) + "."}
              balance={user.balance}
            />)
        }
      </IonContent>
    </IonPage>
  );
};

export default Loaderboard;
