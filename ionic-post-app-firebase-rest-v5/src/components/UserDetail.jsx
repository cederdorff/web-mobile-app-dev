import { IonLabel, IonAvatar, IonImg } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function UserDetail({ userId }) {
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        async function loadUserData() {
            const response = await fetch(`https://race-rest-default-rtdb.firebaseio.com/users/${userId}.json`);
            const data = await response.json();
            setUser(data);
        }
        loadUserData();
    }, [userId]);

    function goToUserDetailView() {
        history.push(`users/${userId}`);
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
