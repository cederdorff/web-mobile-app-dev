import { IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from "@ionic/react";
import PostForm from "./PostForm";

export default function PostUpdateModal({ post, dismiss }) {
    async function updatePost(postToUpdate) {
        const url = `https://race-rest-default-rtdb.firebaseio.com/posts/${post.id}.json`;
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify({ ...post, ...postToUpdate })
        });
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
