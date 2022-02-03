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
import { addCircle, people, reader } from "ionicons/icons";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Add from "./pages/Add";

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
import User from "./pages/User";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/posts">
                        <Posts />
                    </Route>
                    <Route exact path="/users">
                        <Users />
                    </Route>
                    <Route path="/users/:id">
                        <User />
                    </Route>
                    <Route path="/add">
                        <Add />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/posts" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="Posts" href="/posts">
                        <IonIcon icon={reader} />
                        <IonLabel>Posts</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="users" href="/users">
                        <IonIcon icon={people} />
                        <IonLabel>Users</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="add" href="/add">
                        <IonIcon icon={addCircle} />
                        <IonLabel>Add</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
