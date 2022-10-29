import {Redirect, Route} from "react-router-dom";
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {calendarOutline, home, trophyOutline} from "ionicons/icons";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Leaderboard from "./pages/Loaderboard";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";

import {ChakraProvider, extendTheme, type ThemeConfig} from "@chakra-ui/react";

import Register from './pages/Register'

setupIonicReact();


// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({config});

const App: React.FC = () => (
<<<<<<< HEAD
  <ChakraProvider>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/events">
              <Events />
            </Route>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="events" href="/events">
              <IonIcon icon={calendarOutline} />
              <IonLabel>Events</IonLabel>
            </IonTabButton>
            <IonTabButton tab="leaderboard" href="/leaderboard">
              <IonIcon icon={trophyOutline} />
              <IonLabel>Leaderboard</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </ChakraProvider>
=======
    <ChakraProvider theme={theme}>
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/home">
                            <Home/>
                        </Route>
                        <Route exact path="/events">
                            <Events/>
                        </Route>
                        <Route path="/leaderboard">
                            <Leaderboard/>
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/home"/>
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="home" href="/home">
                            <IonIcon icon={home}/>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="events" href="/events">
                            <IonIcon icon={calendarOutline}/>
                            <IonLabel>Events</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="leaderboard" href="/leaderboard">
                            <IonIcon icon={trophyOutline}/>
                            <IonLabel>Leaderboard</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    </ChakraProvider>
>>>>>>> origin/AntonPieper/events
);
export default App;
