import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg } from "@ionic/react";
import UserListItem from "./UserListItem";

export default function PostListItem({ post }) {
    return (
        <IonCard>
            <UserListItem userId={post.uid} />
            <IonImg src={post.image} />
            <IonCardHeader>
                <IonCardTitle>
                    <h4>{post.title}</h4>
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{post.body}</IonCardContent>
        </IonCard>
    );
}
