import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg } from "@ionic/react";

export const PostListItem = ({ post }: any) => {
    return (
        <IonCard>
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
