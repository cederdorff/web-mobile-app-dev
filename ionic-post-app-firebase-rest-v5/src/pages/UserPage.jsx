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
import PostListItem from "../components/PostListItem";
import UserCard from "../components/UserCard";

export default function UserPage() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const params = useParams();
    const userId = params.id;

    async function loadUserData() {
        const response = await fetch(`https://race-rest-default-rtdb.firebaseio.com/users/${userId}.json`);
        const data = await response.json();
        setUser(data);
    }

    async function loadUserPosts() {
        const response = await fetch(
            `https://race-rest-default-rtdb.firebaseio.com/posts.json?orderBy="uid"&startAt=${userId}&endAt=${userId}`
        );
        const data = await response.json();
        const postsArray = Object.keys(data).map(key => ({ id: key, ...data[key] })); // from object to array
        setPosts(postsArray.reverse());
    }

    useIonViewWillEnter(() => {
        loadUserData();
        loadUserPosts();
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
                        <PostListItem post={post} key={post.id} reload={loadUserPosts} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}
