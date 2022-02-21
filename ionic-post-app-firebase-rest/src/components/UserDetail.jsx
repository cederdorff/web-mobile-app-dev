import { IonLabel, IonAvatar, IonImg } from "@ionic/react";
import { useEffect, useState } from "react";

export default function UserDetail({ userId }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function loadUserData() {
            const response = await fetch(`https://race-rest-default-rtdb.firebaseio.com/users/${userId}.json`);
            const data = await response.json();
            setUser(data);
        }
        loadUserData();
    }, [userId]);

    return (
        <>
            <IonAvatar slot="start">
                <IonImg src={user.image} />
            </IonAvatar>
            <IonLabel>
                <h2>{user.name}</h2>
                <p>{user.title}</p>
            </IonLabel>
        </>
    );
}
