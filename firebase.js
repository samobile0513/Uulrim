import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIv-HeXK-CbmXZyqz7ARuG68RhX6bgEKQ",
  authDomain: "totaladmin-6228c.firebaseapp.com",
  projectId: "totaladmin-6228c",
  storageBucket: "totaladmin-6228c.firebasestorage.app",
  messagingSenderId: "292544643944",
  appId: "1:292544643944:web:126c12a19f4eee9fc38cdd",
  measurementId: "G-Q9SLY2G14J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
console.log("🔥 연결된 Firebase 프로젝트:", firebaseConfig.projectId); 

signInAnonymously(auth)
  .then(() => {
    console.log("익명 로그인 성공");
  })
  .catch((error) => {
    console.error("익명 로그인 실패:", error);
  });

export { db, auth, storage }; 