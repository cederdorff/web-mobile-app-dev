import { useState } from "react";
import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from "@ionic/react";
import { useParams } from "react-router";
import userService from "../services/usersService";
import { globe, mail, phonePortraitSharp } from "ionicons/icons";

function User() {
    const [user, setUser] = useState<any>({});
    const params = useParams<{ id: string }>();

    useIonViewWillEnter(async () => {
        const userData = await userService.getUser(params.id);
        setUser(userData);
    });

    return (
        <IonPage id="user-detail-page">
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
}

export default User;
