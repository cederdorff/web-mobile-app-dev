import { IonItem, IonAvatar, IonImg, IonLabel } from "@ionic/react";

export default function UserListItem({ user }) {
    return (
        <IonItem button key={user.id} routerLink={`users/${user.id}`}>
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
