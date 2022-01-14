import { IonItem, IonLabel, IonAvatar, IonImg } from "@ionic/react";

export const UserListItem = (props: any) => {
    return (
        <IonItem button routerLink={`users/${props.user.id}`}>
            <IonAvatar slot="start">
                <IonImg src={props.user.image} />
            </IonAvatar>
            <IonLabel>
                <h2>{props.user.name}</h2>
                <p>{props.user.title}</p>
            </IonLabel>
        </IonItem>
    );
};
