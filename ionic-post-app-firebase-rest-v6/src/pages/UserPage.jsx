import { IonBackButton, IonButtons, IonContent, IonHeader, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostListItem from "../components/PostCard";
import UserCard from "../components/UserCard";

export default function UserPage() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const params = useParams();
    const userId = params.id;

    async function loadData() {
        //fetch user data by userId prop
        const userRes = await fetch(`https://race-rest-default-rtdb.firebaseio.com/users/${userId}.json`);
        const userData = await userRes.json();
        setUser(userData);

        // fetch posts where uid is equal to userId prop
        const postsRes = await fetch(`https://race-rest-default-rtdb.firebaseio.com/posts.json?orderBy="uid"&equalTo="${userId}"`);
        const postsData = await postsRes.json();
        const postsArray = Object.keys(postsData).map(key => ({ id: key, ...postsData[key], user: userData })); // from object to array
        setPosts(postsArray.reverse());
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Back" defaultHref="/posts"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{user?.name ? user.name : "Unknown User Name"}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <UserCard user={user} />
                    <IonListHeader>
                        <IonLabel>{posts.length ? "Users Posts" : "No posts yet"}</IonLabel>
                    </IonListHeader>
                    {posts.map(post => (
                        <PostListItem post={post} key={post.id} reload={loadData} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}
