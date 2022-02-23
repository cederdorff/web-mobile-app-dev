import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { add, reader } from "ionicons/icons";
import PostsPage from "./pages/PostsPage";
import AddPage from "./pages/AddPage";

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
import UserPage from "./pages/UserPage";

setupIonicReact();

export default function App() {
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/posts">
                            <PostsPage />
                        </Route>
                        <Route exact path="/add">
                            <AddPage />
                        </Route>
                        <Route path="/users/:id">
                            <UserPage />
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
                        <IonTabButton tab="add" href="/add">
                            <IonIcon icon={add} />
                            <IonLabel>Add</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
}
