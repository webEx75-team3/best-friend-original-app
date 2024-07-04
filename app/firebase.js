import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDDQ5MoVTp45In9c2L3fXtty1k2qA5vgk",
  authDomain: "team-best-friends.firebaseapp.com",
  projectId: "team-best-friends",
  storageBucket: "team-best-friends.appspot.com",
  messagingSenderId: "950359025134",
  appId: "1:950359025134:web:ae49bd31f98701df96daff",
};

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig);
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app);
