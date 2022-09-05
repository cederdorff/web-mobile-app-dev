import { IonAvatar, IonImg, IonLabel } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function UserAvatar({ uid }) {
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        async function loadUserData() {
            const response = await fetch(`https://race-rest-default-rtdb.firebaseio.com/users/${uid}.json`);
            const data = await response.json();
            setUser(data);
        }
        loadUserData();
    }, [uid]);

    function goToUserDetailView() {
        history.push(`users/${uid}`);
    }

    return (
        <>
            <IonAvatar slot="start" onClick={goToUserDetailView}>
                <IonImg src={user.image} />
            </IonAvatar>
            <IonLabel onClick={goToUserDetailView}>
                <h2>{user.name}</h2>
                <p>{user.title}</p>
            </IonLabel>
        </>
    );
}
