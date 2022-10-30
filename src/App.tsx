import { Redirect, Route } from "react-router-dom";
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
import { IonReactRouter } from "@ionic/react-router";
import { calendarOutline, home, trophyOutline } from "ionicons/icons";
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

import { ChakraProvider, extendTheme, type ThemeConfig } from "@chakra-ui/react";

import Register from './pages/Register'
import Login from "./pages/Login";
import WorkoutList from "./pages/WorkoutList";
import { TokenContext } from "./loginContext";
import { useState } from "react";

setupIonicReact();


// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({ config });

const App: React.FC = () => {

    const [token, setToken] = useState("")

    return <ChakraProvider theme={theme}>
        <TokenContext.Provider value={{ token, setToken }}>
            <IonApp>
                <IonReactRouter>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/app">
                        <IonApp>
                            <IonReactRouter>
                                <IonTabs>
                                    <IonRouterOutlet>
                                        <Route exact path="/app/workouts">
                                            <WorkoutList />
                                        </Route>
                                        <Route exact path="/app/home">
                                            <Home />
                                        </Route>
                                        <Route exact path="/app/events"> <Events />
                                        </Route>
                                        <Route exact path="/app/leaderboard">
                                            <Leaderboard />
                                        </Route>
                                        <Route exact  path="/app">
                                            <Redirect to="/app/home" />
                                        </Route>
                                    </IonRouterOutlet>
                                    <IonTabBar slot="bottom">
                                        <IonTabButton tab="home" href="/app/home">
                                            <IonIcon icon={home} />
                                            <IonLabel>Home</IonLabel>
                                        </IonTabButton>
                                        <IonTabButton tab="events" href="/app/events">
                                            <IonIcon icon={calendarOutline} />
                                            <IonLabel>Events</IonLabel>
                                        </IonTabButton>
                                        <IonTabButton tab="leaderboard" href="/app/leaderboard">
                                            <IonIcon icon={trophyOutline} />
                                            <IonLabel>Leaderboard</IonLabel>
                                        </IonTabButton>
                                    </IonTabBar>
                                </IonTabs>
                            </IonReactRouter>
                        </IonApp>
                    </Route>
                </IonReactRouter>
            </IonApp>
        </TokenContext.Provider>
    </ChakraProvider>
};
export default App;
