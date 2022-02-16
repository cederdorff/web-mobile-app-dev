import { IonBackButton, IonButtons, IonContent, IonHeader, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import PostListItem from "../components/PostListItem";
import UserCard from "../components/UserCard";
import postService from "../services/postsService";
import userService from "../services/usersService";

export default function UserPage() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const params = useParams();
    const userId = parseInt(params.id);

    useIonViewWillEnter(async () => {
        const userData = await userService.getUser(userId);
        setUser(userData);
        const postsData = await postService.getPostsByUser(userId);
        setPosts(postsData);
    });

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Users" defaultHref="/users"></IonBackButton>
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
