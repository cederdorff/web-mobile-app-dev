import { IonButton, IonIcon, useIonAlert, useIonActionSheet, useIonModal } from "@ionic/react";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import PostUpdateModal from "./PostUpdateModal";

export default function PostActions({ post, reload }) {
    const [presentActionSheet] = useIonActionSheet();
    const [presentDeleteDialog] = useIonAlert();
    const [presentUpdateModal, dismissUpdateModal] = useIonModal(
        <PostUpdateModal post={post} dismiss={closeUpdateModal} />
    );

    function showActionSheet(event) {
        event.preventDefault();
        presentActionSheet({
            buttons: [
                { text: "Edit", handler: showUpdateModal },
                { text: "Delete", role: "destructive", handler: showDeleteDialog },
                { text: "Cancel", role: "cancel" }
            ]
        });
    }
    function showUpdateModal() {
        console.log("Update post");
        presentUpdateModal();
    }

    function closeUpdateModal() {
        dismissUpdateModal();
        reload();
    }

    function showDeleteDialog() {
        presentDeleteDialog({
            header: "Delete Post",
            message: "Do you want to delete post?",
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
