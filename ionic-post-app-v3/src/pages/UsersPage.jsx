import { useEffect, useState } from "react";
import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from "@ionic/react";
import UserListItem from "../components/UserListItem";
import userService from "../services/usersService";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    async function loadUsers() {
        const userData = await userService.getUsers();
        setUsers(userData);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    async function refresh(e) {
        const userData = await userService.fetchUsers();
        setUsers(userData);
        setTimeout(() => {
            e.detail.complete();
        }, 1000);
    }

    return (
        <IonPage id="users-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Users</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Users</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    {users.map(user => (
                        <UserListItem key={user.id} user={user} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}
