import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export default function AddPage() {
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
            </IonContent>
        </IonPage>
    );
}
