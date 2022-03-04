import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUGWll95dZS_q7WSmo3ocAsJJ7m_NYvBY",
    authDomain: "ionic-post-app-race.firebaseapp.com",
    databaseURL: "https://ionic-post-app-race-default-rtdb.firebaseio.com",
    projectId: "ionic-post-app-race",
    storageBucket: "ionic-post-app-race.appspot.com",
    messagingSenderId: "984970303263",
    appId: "1:984970303263:web:97296e01974e02bd19022a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize auth
export const auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence
});
// Create database reference
export const database = getDatabase(app);
// Reference to posts in Realtime DB
export const postsRef = ref(database, "posts");
// Reference to users in Realtime DB
export const usersRef = ref(database, "users");
// Get reference to specific post using post id
export function getPostRef(postId) {
    return ref(database, "posts/" + postId);
}
// Get reference to specific user using user id
export function getUserRef(userId) {
    return ref(database, "users/" + userId);
}

// Reference to the storage service
export const storage = getStorage(app);
