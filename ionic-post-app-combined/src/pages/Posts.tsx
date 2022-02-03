import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";
import { PostListItem } from "../components/PostListItem";
import postService from "../services/postsService";

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    async function loadPosts() {
        const data = await postService.getPosts();
        setPosts(data);
    }

    useEffect(() => {
        loadPosts();
    }, []);

    async function refresh(e: CustomEvent) {
        const data = await postService.fetchPosts();
        setPosts(data);
        setTimeout(() => {
            e.detail.complete();
        }, 1000);
    }

    return (
        <IonPage>
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
};

export default Posts;
