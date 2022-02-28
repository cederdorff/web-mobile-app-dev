import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import PostListItem from "../components/PostCard";
import UserCard from "../components/UserCard";
import { getUserRef, postsRef } from "../firebase-config";
import { onValue, query, orderByChild, equalTo, get } from "firebase/database";

export default function UserPage() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const params = useParams();
    const userId = params.id;

    async function getUserDataOnce() {
        const snapshot = await get(getUserRef(userId));
        const userData = snapshot.val();
        setUser({
            id: userId,
            ...userData
        });
        return userData;
    }

    async function listenOnChange() {
        const postsByUserId = query(postsRef, orderByChild("uid"), equalTo(userId));
        const userData = await getUserDataOnce();

        onValue(postsByUserId, async snapshot => {
            const postsArray = [];
            snapshot.forEach(postSnapshot => {
                const id = postSnapshot.key;
                const data = postSnapshot.val();
                const post = {
                    id,
                    ...data,
                    user: userData
                };
                postsArray.push(post);
            });
            setPosts(postsArray.reverse());
        });
    }

    useIonViewWillEnter(() => {
        listenOnChange();
    });

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Back" defaultHref="/posts"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{user.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <UserCard user={user} />
                    <IonListHeader>
                        <IonLabel>{posts.length ? "Users Posts" : "No posts yet"}</IonLabel>
                    </IonListHeader>
                    {posts.map(post => (
                        <PostListItem post={post} key={post.id} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}
