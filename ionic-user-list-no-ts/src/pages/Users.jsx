import { IonAvatar, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState, useEffect } from "react";

const Users = () => {
    const [users, setUsers] = useState([]); // useState allows us to track state in a function component.

    async function loadUsers() {
        const response = await fetch("https://raw.githubusercontent.com/cederdorff/web-mobile-app-dev/main/data/users.json");
        const data = await response.json(); // parse json into js array with objects
        setUsers(data); // saves all fetched users in the state users
    }

    // useEffect allows you to perform side effects in your components.
    useEffect(() => {
        loadUsers();
    }, []); // empty array as dependency - makes sure to run only on the first render

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Users</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Users</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {users.map(user => (
                        <IonItem button key={user.id} routerLink={`users/${user.id}`}>
                            <IonAvatar slot="start">
                                <IonImg src={user.image} />
                            </IonAvatar>
                            <IonLabel>
                                <h2>{user.name}</h2>
                                <p>{user.title}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Users;
