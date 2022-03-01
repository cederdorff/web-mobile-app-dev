import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import PostListItem from "../components/PostCard";
import { postsRef, usersRef } from "../firebase-config";
import { onValue, get } from "firebase/database";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);

    async function getUsers() {
        const snapshot = await get(usersRef);
        const usersArray = [];
        snapshot.forEach(postSnapshot => {
            const id = postSnapshot.key;
            const data = postSnapshot.val();
            const post = {
                id,
                ...data
            };
            usersArray.push(post);
        });

        return usersArray;
    }

    async function listenOnChange() {
        const users = await getUsers();
        onValue(postsRef, async snapshot => {
            const postsArray = [];
            snapshot.forEach(postSnapshot => {
                const id = postSnapshot.key;
                const data = postSnapshot.val();
                const post = {
                    id,
                    ...data,
                    user: users.find(user => user.id == data.uid)
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
        <IonPage className="posts-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Posts</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Posts</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    {posts.map(post => (
                        <PostListItem post={post} key={post.id} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}
