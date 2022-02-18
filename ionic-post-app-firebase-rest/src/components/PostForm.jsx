import { IonItem, IonLabel, IonInput, IonTextarea, IonImg, IonButton } from "@ionic/react";
import { useState, useEffect } from "react";

export default function PostForm({ post, handleSubmit }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const fallbackUrl =
        "https://media.istockphoto.com/photos/white-paper-texture-background-picture-id1293996796?b=1&k=20&m=1293996796&s=170667a&w=0&h=ot-Q4dcJynVUxQyjU5P7i4qPZxmoWmPC0M09R53D8j8=";

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);
        }
    }, [post]);

    function submitEvent(event) {
        event.preventDefault();
        const formData = { title: title, body: body, image: image };
        handleSubmit(formData);
    }
    return (
        <form onSubmit={submitEvent}>
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
                <IonInput value={image} type="url" placeholder="Paste url to your image" onIonChange={e => setImage(e.target.value)} />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Image Preview</IonLabel>
                <IonImg className="ion-padding" src={image === "" ? fallbackUrl : image} />
            </IonItem>
            <IonButton type="submit" expand="block">
                Create
            </IonButton>
        </form>
    );
}
