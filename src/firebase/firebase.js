import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA05WKbeDr-uLSfbB4FMLGE7UpK3_cCgKQ",
  authDomain: "teste-e4e82.firebaseapp.com",
  projectId: "teste-e4e82",
  storageBucket: "teste-e4e82.appspot.com",
  messagingSenderId: "786825763627",
  appId: "1:786825763627:web:37ff0f9a996d343242036e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, app };