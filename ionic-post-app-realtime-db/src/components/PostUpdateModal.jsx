import { IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from "@ionic/react";
import PostForm from "./PostForm";
import { getPostRef } from "../firebase-config";
import { update } from "firebase/database";

export default function PostUpdateModal({ post, dismiss }) {
    async function updatePost(postToUpdate) {
        await update(getPostRef(post.id), postToUpdate);
        dismiss();
    }

    return (
        <IonContent>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="secondary">
                        <IonButton onClick={() => dismiss()}>Cancel</IonButton>
                    </IonButtons>
                    <IonTitle>Edit Post</IonTitle>
                </IonToolbar>
            </IonHeader>
            <PostForm post={post} handleSubmit={updatePost} />
        </IonContent>
    );
}
