import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import PostListItem from "../components/PostListItem";
import "./PostsPage.css";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);

    async function loadPosts() {
        const url = "https://race-rest-default-rtdb.firebaseio.com/posts.json";
        const response = await fetch(url);
        const data = await response.json();
        const postsArray = Object.keys(data).map(key => ({ id: key, ...data[key] })); // from object to array
        setPosts(postsArray.reverse());
    }

    async function refresh(e) {
        await loadPosts();
        setTimeout(() => {
            e.detail.complete();
        }, 1000);
    }

    useIonViewWillEnter(() => {
        loadPosts();
    });

    return (
        <IonPage className="posts-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Posts</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Posts</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    {posts.map(post => (
                        <PostListItem post={post} key={post.id} reload={loadPosts} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}
