import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import PostForm from "../components/PostForm";
import { Toast } from "@capacitor/toast";
import { postsRef } from "../firebase-config";
import { push, set } from "firebase/database";

export default function AddPage() {
    const history = useHistory();

    async function handleSubmit(newPost) {
        newPost.uid = 4; // default user id added

        const newPostRef = push(postsRef);
        await set(newPostRef, newPost);

        history.replace("/posts");

        await Toast.show({
            text: "New post created!",
            position: "center"
        });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create New Post</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Create New Post</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <PostForm handleSubmit={handleSubmit} />
            </IonContent>
        </IonPage>
    );
}
