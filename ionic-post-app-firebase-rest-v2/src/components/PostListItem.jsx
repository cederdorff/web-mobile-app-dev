import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonImg,
    IonItem,
    useIonActionSheet,
    useIonAlert,
    useIonModal
} from "@ionic/react";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import "./PostListItem.css";
import PostUpdateModal from "./PostUpdateModal";
import UserDetail from "./UserDetail";

export default function PostListItem({ post, reload }) {
    const [presentActionSheet] = useIonActionSheet();
    const [presentDeleteDialog] = useIonAlert();
    const [presentUpdateModal, dismissUpdateModal] = useIonModal(<PostUpdateModal post={post} dismiss={closeUpdateModal} />);

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
        <IonCard>
            <IonItem>
                <UserDetail userId={post.uid} />
                <IonButton fill="clear" onClick={showActionSheet}>
                    <IonIcon slot="icon-only" icon={ellipsisHorizontalOutline} />
                </IonButton>{" "}
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
