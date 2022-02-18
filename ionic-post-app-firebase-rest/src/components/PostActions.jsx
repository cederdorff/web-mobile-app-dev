import { IonButton, IonIcon, useIonAlert, useIonActionSheet } from "@ionic/react";
import { ellipsisHorizontalOutline } from "ionicons/icons";

export default function PostActions({ post, reload }) {
    const [presentActionSheet] = useIonActionSheet();
    const [presentDeleteDialog] = useIonAlert();

    function showActionSheet(event) {
        event.preventDefault();
        presentActionSheet({
            buttons: [
                { text: "Edit", handler: goToUpdate },
                { text: "Delete", role: "destructive", handler: showDeleteDialog },
                { text: "Cancel", role: "cancel" }
            ]
        });
    }
    function goToUpdate() {
        console.log("Update post");
    }

    function showDeleteDialog() {
        presentDeleteDialog({
            header: "Delete Post",
            message: "Do you want do delete post?",
            buttons: [{ text: "No" }, { text: "Yes", role: "destructive", handler: deletePost }]
        });
    }
    async function deletePost() {
        const url = `https://race-rest-default-rtdb.firebaseio.com/posts/${post.id}.json`;
        const response = await fetch(url, {
            method: "DELETE"
        });
        console.log(response);
        reload();
    }
    return (
        <IonButton fill="clear" onClick={showActionSheet}>
            <IonIcon slot="icon-only" icon={ellipsisHorizontalOutline} />
        </IonButton>
    );
}
