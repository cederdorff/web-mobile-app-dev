import { IonLabel, IonAvatar, IonImg } from "@ionic/react";
import { useEffect, useState } from "react";

export default function UserDetail({ userId }) {
    const [user, setUser] = useState({});
    const url = `https://race-rest-default-rtdb.firebaseio.com/users/${userId}.json`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data));
    }, [url]);

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
