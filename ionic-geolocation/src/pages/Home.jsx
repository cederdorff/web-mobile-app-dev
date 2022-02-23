import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel } from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import { useEffect, useState } from "react";

const Home = () => {
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [location, setLocation] = useState("");

    async function getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log("Current position:", coordinates);
        setLat(coordinates.coords.latitude);
        setLong(coordinates.coords.longitude);
        getLocation(coordinates.coords.latitude, coordinates.coords.longitude);
    }

    async function getLocation(latitude, longitude) {
        const key = "14de60fd94d4d8753fe8a277ba88667a";
        const res = await fetch(
            `http://api.positionstack.com/v1/reverse?access_key=${key}&output=json&query=${latitude},${longitude}`
        );
        const result = await res.json();
        console.log(result);
        const loc = result.data[0];
        console.log(loc);
        setLocation(loc);
    }

    useEffect(() => {
        getCurrentPosition();
    }, []);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Geolocation</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Geolocation</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonItem>
                    <IonLabel>Latitude:</IonLabel>
                    {lat}
                </IonItem>
                <IonItem>
                    <IonLabel>Longitude:</IonLabel>
                    {long}
                </IonItem>
                <IonItem>
                    <IonLabel>Locality:</IonLabel>
                    {location.locality}
                </IonItem>
                <IonItem>
                    <IonLabel>Name:</IonLabel>
                    {location.name}
                </IonItem>
                <IonItem>
                    <IonLabel>Region:</IonLabel>
                    {location.region}
                </IonItem>
                <IonItem>
                    <IonLabel>Country:</IonLabel>
                    {location.country}
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Home;
