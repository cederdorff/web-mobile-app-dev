import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { addCircle, people, reader } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import AddPage from "./pages/AddPage";
import PostsPage from "./pages/PostsPage";
import UserPage from "./pages/UserPage";
import UsersPage from "./pages/UsersPage";
/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/posts">
                        <PostsPage />
                    </Route>
                    <Route exact path="/users">
                        <UsersPage />
                    </Route>
                    <Route path="/users/:id">
                        <UserPage />
                    </Route>
                    <Route path="/add">
                        <AddPage />
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
