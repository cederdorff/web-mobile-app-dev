import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonLoading } from "@ionic/react";
import { useHistory } from "react-router-dom";
import PostForm from "../components/PostForm";
import { Toast } from "@capacitor/toast";
import { postsRef } from "../firebase-config";
import { push, set } from "firebase/database";
import { storage } from "../firebase-config";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";

export default function AddPage() {
    const history = useHistory();
    const [showLoader, dismissLoader] = useIonLoading();

    async function handleSubmit(newPost) {
        showLoader();
        newPost.uid = "HYP5qsP3pYjrKppw5B7f"; // default user id added
        const newPostRef = push(postsRef); // push new to get reference and new id/key
        const newPostKey = newPostRef.key; // key from reference
        const imageUrl = await uploadImage(newPost.image, newPostKey);
        newPost.image = imageUrl;
        await set(newPostRef, newPost);

        history.replace("/posts");

        await Toast.show({
            text: "New post created!",
            position: "center"
        });
        dismissLoader();
    }

    async function uploadImage(imageFile, postKey) {
        const newImageRef = ref(storage, `${postKey}.${imageFile.format}`);
        await uploadString(newImageRef, imageFile.dataUrl, "data_url");
        const url = await getDownloadURL(newImageRef);
        return url;
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
