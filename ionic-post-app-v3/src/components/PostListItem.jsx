import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg } from "@ionic/react";
import UserListItem from "./UserListItem";

const PostListItem = ({ post }) => {
    return (
        <IonCard>
            {post.user && <UserListItem user={post.user} />}
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
