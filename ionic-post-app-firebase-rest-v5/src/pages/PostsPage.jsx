import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
    useIonLoading
} from "@ionic/react";
import { useState } from "react";
import PostListItem from "../components/PostListItem";
import "./PostsPage.css";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [showLoader, dismissLoader] = useIonLoading();

    async function loadPosts() {
        showLoader();
        const postsArray = await getPosts();
        const users = await getUsers();
        const postsWithUser = postsArray.map(post => {
            const user = users.find(user => user.id == post.uid);
            post = { ...post, user: user }; // combine objects with spread operator
            return post;
        });
        setPosts(postsWithUser.reverse());
        dismissLoader();
    }

    async function getPosts() {
        const response = await fetch("https://race-rest-default-rtdb.firebaseio.com/posts.json");
        const data = await response.json();
        // map object into an array with objects
        const postsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        return postsArray;
    }

    async function getUsers() {
        const response = await fetch("https://race-rest-default-rtdb.firebaseio.com/users.json");
        const data = await response.json();
        // mapp object into an array with objects
        const users = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        return users;
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
