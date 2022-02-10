import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import UserCard from "../components/UserCard";

const User = () => {
    const params = useParams(); // useParams returns an object of key/value pairs of URL parameters.
    const [user, setUser] = useState({}); // useState allows us to track state in a function component.

    async function getUser(id) {
        const response = await fetch("https://raw.githubusercontent.com/cederdorff/web-mobile-app-dev/main/data/users.json");
        const users = await response.json(); // parse json into js array with objects
        const userData = users.find(user => user.id === id); // find a specific user by given id
        setUser(userData); // saves the user in user state
    }

    // Fired when the component routing to is about to animate into view.
    useIonViewWillEnter(() => {
        console.log("User Components: useIonViewWillEnter");
        const id = parseInt(params.id); // parsing param id to int
        getUser(id);
    });

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Users" defaultHref="/users"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{user.name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <UserCard user={user} key={user.id} />
            </IonContent>
        </IonPage>
    );
};

export default User;
