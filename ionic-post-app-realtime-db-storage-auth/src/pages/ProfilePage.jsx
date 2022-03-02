import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButtons,
    IonButton,
    IonInput,
    IonIcon,
    IonImg,
    useIonLoading
} from "@ionic/react";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { get, update } from "@firebase/database";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../firebase-config";
import { Toast } from "@capacitor/toast";

export default function ProfilePage() {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState({});
    const [showLoader, dismissLoader] = useIonLoading();

    useEffect(() => {
        setUser(auth.currentUser);

        async function getUserDataFromDB() {
            const snapshot = await get(getUserRef(user.uid));
            const userData = snapshot.val();
            if (userData) {
                setName(userData.name);
                setTitle(userData.title);
                setImage(userData.image);
            }
        }

        if (user) getUserDataFromDB();
    }, [auth.currentUser, user]);

    function handleSignOut() {
        signOut(auth);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        showLoader();

        const userToUpdate = {
            name: name,
            title: title
        };

        if (imageFile.dataUrl) {
            const imageUrl = await uploadImage();
            userToUpdate.image = imageUrl;
        }

        await update(getUserRef(user.uid), userToUpdate);
        dismissLoader();
        await Toast.show({
            text: "User Profile saved!",
            position: "top"
        });
    }

    async function takePicture() {
        const imageOptions = {
            quality: 80,
            width: 500,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        };
        const image = await Camera.getPhoto(imageOptions);
        setImageFile(image);
        setImage(image.dataUrl);
    }

    async function uploadImage() {
        const newImageRef = ref(storage, `${user.uid}.${imageFile.format}`);
        await uploadString(newImageRef, imageFile.dataUrl, "data_url");
        const url = await getDownloadURL(newImageRef);
        return url;
    }

    return (
        <IonPage className="posts-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile Page</IonTitle>
                    <IonButtons slot="primary">
                        <IonButton onClick={handleSignOut}>Sign Out</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItem>
                    <IonLabel>Mail:</IonLabel>
                    {user?.email}
                </IonItem>
                <IonItem>
                    <IonLabel>uid:</IonLabel>
                    {user?.uid}
                </IonItem>
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput
                            value={name}
                            type="text"
                            placeholder="Type your name"
                            onIonChange={e => setName(e.target.value)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Title</IonLabel>
                        <IonInput
                            value={title}
                            type="text"
                            placeholder="Type your title"
                            onIonChange={e => setTitle(e.target.value)}
                        />
                    </IonItem>
                    <IonItem onClick={takePicture} lines="none">
                        <IonLabel>Choose Image</IonLabel>
                        <IonButton>
                            <IonIcon slot="icon-only" icon={camera} />
                        </IonButton>
                    </IonItem>
                    {image && <IonImg className="ion-padding" src={image} onClick={takePicture} />}
                    <div className="ion-padding">
                        <IonButton type="submit" expand="block">
                            Save User
                        </IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    );
}
