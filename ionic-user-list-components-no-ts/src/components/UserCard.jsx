import { globe, mail, phonePortraitSharp } from "ionicons/icons";
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonItem, IonLabel } from "@ionic/react";

export default function UserCard({ user }) {
    return (
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
    );
}
