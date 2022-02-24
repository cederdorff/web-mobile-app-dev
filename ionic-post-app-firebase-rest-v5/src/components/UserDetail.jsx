import { IonLabel, IonAvatar, IonImg } from "@ionic/react";
import { useHistory } from "react-router-dom";

export default function UserDetail({ user }) {
    const history = useHistory();

    function goToUserDetailView() {
        history.push(`users/${user.id}`);
    }

    return (
        <>
            <IonAvatar slot="start" onClick={goToUserDetailView}>
                <IonImg src={user?.image} />
            </IonAvatar>
            <IonLabel onClick={goToUserDetailView}>
                <h2>{user?.name}</h2>
                <p>{user?.title}</p>
            </IonLabel>
        </>
    );
}
