import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg, IonItem } from "@ionic/react";
import "./PostListItem.css";
import UserDetail from "./UserDetail";

export default function PostListItem({ post }) {
    return (
        <IonCard className="post-list-item">
            <IonItem>
                <UserDetail userId={post.uid} />
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
