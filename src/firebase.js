import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyCco9J2miIw7oU_ZPbGTJ-Rv5K5Iqo4jnE",

    authDomain: "portfolio-383aa.firebaseapp.com",

    databaseURL:
        "https://portfolio-383aa-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "portfolio-383aa",

    storageBucket: "portfolio-383aa.appspot.com",

    messagingSenderId: "594505165308",

    appId: "1:594505165308:web:5b32dcbad180e0711b6a79",

    measurementId: "G-38EJPEG4L6",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore(app)
