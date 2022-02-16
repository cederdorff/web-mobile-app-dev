import { IonItem, IonLabel, IonAvatar, IonImg } from "@ionic/react";

export default function UserListItem({ user }) {
    return (
        <IonItem button routerLink={`users/${user.id}`}>
            <IonAvatar slot="start">
                <IonImg src={user.image} />
            </IonAvatar>
            <IonLabel>
                <h2>{user.name}</h2>
                <p>{user.title}</p>
            </IonLabel>
        </IonItem>
    );
}
