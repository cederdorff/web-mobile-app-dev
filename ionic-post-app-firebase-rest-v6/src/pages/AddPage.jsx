import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import PostForm from "../components/PostForm";
import { Toast } from "@capacitor/toast";

export default function AddPage() {
    const history = useHistory();

    async function handleSubmit(newPost) {
        newPost.uid = "4"; // default user id added

        const url = "https://race-rest-default-rtdb.firebaseio.com/posts.json";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newPost)
        });
        if (response.ok) {
            history.replace("/posts");

            await Toast.show({
                text: "New post created!"
            });
        } else {
            await Toast.show({
                text: "Error. Try again!"
            });
        }
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
