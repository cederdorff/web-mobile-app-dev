import { IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { globe, mail, phonePortraitSharp } from "ionicons/icons";
import { useParams } from "react-router";

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
                <IonCard>
                    <IonImg src={user.image} />
                    <IonCardHeader>
                        <IonCardTitle>{user.name}</IonCardTitle>
                        <IonCardSubtitle>{user.title}</IonCardSubtitle>
                    </IonCardHeader>

                    <IonItem href={`mailto:${user.mail}`}>
                        <IonIcon icon={mail} slot="start" />
                        <IonLabel>{user.mail}</IonLabel>
                    </IonItem>

                    <IonItem href={`tel:${user.phone}`}>
                        <IonIcon icon={phonePortraitSharp} slot="start" />
                        <IonLabel>{user.phone}</IonLabel>
                    </IonItem>
                    <IonItem href="https://eaaa.dk">
                        <IonIcon icon={globe} slot="start" />
                        <IonLabel>eaaa.dk</IonLabel>
                    </IonItem>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default User;
