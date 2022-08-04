import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

    const firebaseConfig = {
        apiKey: "AIzaSyB1fHdw6pH9zMNfyhsqtyWn0LSISHuIvqA",
        authDomain: "softeng-proj-84566.firebaseapp.com",
        databaseURL: "https://softeng-proj-84566-default-rtdb.firebaseio.com",
        projectId: "softeng-proj-84566",
        storageBucket: "softeng-proj-84566.appspot.com",
        messagingSenderId: "404069324337",
        appId: "1:404069324337:web:5f3282cc1f554285412710"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    // return db;

export default db;