import { IonLabel, IonAvatar, IonImg } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function UserDetail({ uid }) {
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        fetch(`https://race-rest-default-rtdb.firebaseio.com/users/${uid}.json`)
            .then(response => response.json())
            .then(data => setUser(data));
    }, [uid]);

    function goToUserDetailView() {
        history.push(`users/${uid}`);
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
