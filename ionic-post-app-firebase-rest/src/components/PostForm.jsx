import { IonItem, IonLabel, IonInput, IonTextarea, IonImg, IonButton, IonIcon } from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";

export default function PostForm({ post, handleSubmit }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");

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

    async function takePicture() {
        const imageOptions = {
            quality: 80,
            width: 500,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        };
        const image = await Camera.getPhoto(imageOptions);
        const imageUrl = image.dataUrl;
        setImage(imageUrl);
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
            <IonItem onClick={takePicture} lines="none">
                <IonLabel>Choose Image</IonLabel>
                <IonButton>
                    <IonIcon slot="icon-only" icon={camera} />
                </IonButton>
            </IonItem>
            <IonImg
                className="ion-padding"
                src={
                    image
                        ? image
                        : "https://media.istockphoto.com/photos/white-paper-texture-background-picture-id1293996796?b=1&k=20&m=1293996796&s=170667a&w=0&h=ot-Q4dcJynVUxQyjU5P7i4qPZxmoWmPC0M09R53D8j8="
                }
                onClick={takePicture}
            />

            <IonButton type="submit" expand="block" className="ion-padding">
                Create
            </IonButton>
        </form>
    );
}
