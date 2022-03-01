import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButtons,
    IonButton
} from "@ionic/react";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

export default function ProfilePage() {
    const auth = getAuth();
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(auth.currentUser);
        console.log(user);
    }, [auth.currentUser, user]);

    function handleSignOut() {
        signOut(auth);
    }

    return (
        <IonPage className="posts-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile Page</IonTitle>
                    <IonButtons slot="primary">
                        <IonButton onClick={handleSignOut}>Sign Out</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItem>
                    <IonLabel>Mail:</IonLabel>
                    {user?.email}
                </IonItem>
                <IonItem>
                    <IonLabel>uid:</IonLabel>
                    {user?.uid}
                </IonItem>
            </IonContent>
        </IonPage>
    );
}
