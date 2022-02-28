import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkrgquuXhFAgp67_qR6Ej2sBEQkocxXQ8",
    authDomain: "race-rest.firebaseapp.com",
    databaseURL: "https://race-rest-default-rtdb.firebaseio.com",
    projectId: "race-rest",
    storageBucket: "race-rest.appspot.com",
    messagingSenderId: "836529600088",
    appId: "1:836529600088:web:a7b2a4f07710f2458dfc2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create database reference
const database = getDatabase(app);
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
