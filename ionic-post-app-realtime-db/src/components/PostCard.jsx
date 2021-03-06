import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonItem,
    IonButton,
    IonIcon,
    useIonAlert,
    useIonActionSheet,
    useIonModal,
    IonAvatar,
    IonLabel
} from "@ionic/react";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { Toast } from "@capacitor/toast";
import PostUpdateModal from "./PostUpdateModal";
import { remove } from "@firebase/database";
import { getPostRef } from "../firebase-config";

export default function PostListItem({ post }) {
    const [presentActionSheet] = useIonActionSheet();
    const [presentDeleteDialog] = useIonAlert();
    const [presentUpdateModal, dismissUpdateModal] = useIonModal(
        <PostUpdateModal post={post} dismiss={handleDismissUpdateModal} />
    );
    const history = useHistory();

    function showActionSheet(event) {
        event.preventDefault();
        presentActionSheet({
            buttons: [
                { text: "Edit", handler: presentUpdateModal },
                { text: "Delete", role: "destructive", handler: showDeleteDialog },
                { text: "Cancel", role: "cancel" }
            ]
        });
    }

    function showDeleteDialog() {
        presentDeleteDialog({
            header: "Delete Post",
            message: "Do you want to delete post?",
            buttons: [{ text: "No" }, { text: "Yes", role: "destructive", handler: deletePost }]
        });
    }

    function handleDismissUpdateModal() {
        dismissUpdateModal();
    }

    async function deletePost() {
        remove(getPostRef(post.id));

        await Toast.show({
            text: "New post deleted!",
            position: "center"
        });
    }

    function goToUserDetailView() {
        history.push(`users/${post.uid}`);
    }

    return (
        <IonCard>
            <IonItem lines="none">
                <IonAvatar slot="start" onClick={goToUserDetailView}>
                    <IonImg src={post.user.image} />
                </IonAvatar>
                <IonLabel onClick={goToUserDetailView}>
                    <h2>{post.user.name}</h2>
                    <p>{post.user.title}</p>
                </IonLabel>
                <IonButton fill="clear" onClick={showActionSheet}>
                    <IonIcon slot="icon-only" icon={ellipsisHorizontalOutline} />
                </IonButton>
            </IonItem>
            <IonImg className="post-img" src={post.image} />
            <IonCardHeader>
                <IonCardTitle>
                    <h4>{post.title}</h4>
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{post.body}</IonCardContent>
        </IonCard>
    );
}
