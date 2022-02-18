import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg } from "@ionic/react";
import UserListItem from "./UserListItem";

const PostListItem = ({ post }) => {
    console.log(post.uid);
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
};

export default PostListItem;
