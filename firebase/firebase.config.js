import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT9Z9XOEkk2N2t_6fyRa7ewM7JfMM9Pjw",
  authDomain: "playbook-ui.firebaseapp.com",
  projectId: "playbook-ui",
  storageBucket: "playbook-ui.firebasestorage.app",
  messagingSenderId: "148407688941",
  appId: "1:148407688941:web:d5147de1072edced3fb6e4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}
