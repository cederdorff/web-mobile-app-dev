import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg, IonItem } from "@ionic/react";
import UserDetail from "./UserDetail";
import "./PostListItem.css";
import PostActions from "./PostActions";

export default function PostListItem({ post, reload }) {
    return (
        <IonCard>
            <IonItem lines="none">
                <UserDetail userId={post.uid} />
                <PostActions post={post} reload={reload} />
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
