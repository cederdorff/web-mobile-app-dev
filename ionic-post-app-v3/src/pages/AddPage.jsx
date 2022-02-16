import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonTextarea, IonImg, IonButton } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import postService from "../services/postsService";

export default function AddPage() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [url, setUrl] = useState("");
    const fallbackUrl =
        "https://media.istockphoto.com/photos/white-paper-texture-background-picture-id1293996796?b=1&k=20&m=1293996796&s=170667a&w=0&h=ot-Q4dcJynVUxQyjU5P7i4qPZxmoWmPC0M09R53D8j8=";
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();

        const newPost = {
            uid: 4,
            title: title,
            body: body,
            image: url
        };
        await postService.createPost(newPost);
        history.push("/posts");
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
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="stacked">Title</IonLabel>
                        <IonInput value={title} placeholder="Type the title of your image" onIonChange={e => setTitle(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Description</IonLabel>
                        <IonTextarea value={body} placeholder="Tell us about your image" onIonChange={e => setBody(e.target.value)}></IonTextarea>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Image URL</IonLabel>
                        <IonInput value={url} type="url" placeholder="Paste url to your image" onIonChange={e => setUrl(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Image Preview</IonLabel>
                        <IonImg src={url === "" ? fallbackUrl : url} />
                    </IonItem>
                    <IonButton type="submit" expand="block">
                        Create
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
}
