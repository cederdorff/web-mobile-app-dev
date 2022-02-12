import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import PostListItem from "../components/PostListItem";
import postService from "../services/postsService";
import "./PostsPage.css";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);

    async function loadPosts() {
        const data = await postService.getPostsWithUserDetails();
        setPosts(data);
    }

    useEffect(() => {
        loadPosts();
    }, []);

    async function refresh(e) {
        await loadPosts();
        setTimeout(() => {
            e.detail.complete();
        }, 1000);
    }

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
                        <PostListItem post={post} key={post.id} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}
