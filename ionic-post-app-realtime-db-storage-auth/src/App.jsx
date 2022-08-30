import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { add, person, reader } from "ionicons/icons";
import PostsPage from "./pages/PostsPage";
import AddPage from "./pages/AddPage";
import UserPage from "./pages/UserPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage";

setupIonicReact();

function PrivateRoutes() {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/posts" component={PostsPage} />
                <Route exact path="/add" component={AddPage} />
                <Route path="/users/:id" component={UserPage} />
                <Route exact path="/profile" component={ProfilePage} />
                <Redirect exact from="/" to="/posts" />
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
                <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={person} />
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
}

function PublicRoutes() {
    return (
        <IonRouterOutlet>
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
        </IonRouterOutlet>
    );
}

export default function App() {
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(localStorage.getItem("userIsAuthenticated"));
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user);
                // User is authenticated
                setUserIsAuthenticated(true);
                localStorage.setItem("userIsAuthenticated", true);
            } else {
                // User is signed out
                setUserIsAuthenticated(false);
                localStorage.removeItem("userIsAuthenticated", false);
            }
        });
    }, [auth]);

    return (
        <IonApp>
            <IonReactRouter>
                {userIsAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
                <Route>{userIsAuthenticated ? <Redirect to="/posts" /> : <Redirect to="/signin" />}</Route>
            </IonReactRouter>
        </IonApp>
    );
}
