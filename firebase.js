import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYfP66dL2AYciMdSHVaEcn8NTdUwyfxGo",
  authDomain: "baroshop-5a5af.firebaseapp.com",
  projectId: "baroshop-5a5af",
  storageBucket: "baroshop-5a5af.firebasestorage.app",
  messagingSenderId: "20212866650",
  appId: "1:20212866650:web:9b439890ecec1b319c8263"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

signInAnonymously(auth)
  .then(() => {
    console.log("익명 로그인 성공");
  })
  .catch((error) => {
    console.error("익명 로그인 실패:", error);
  });

export { db, auth, storage, collection, addDoc };