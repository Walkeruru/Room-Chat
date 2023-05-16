import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpPh1hx1_9E6SfEu9Xc6M3H82qtKZ3nyM",
  authDomain: "whatchat-app-2299e.firebaseapp.com",
  projectId: "whatchat-app-2299e",
  storageBucket: "whatchat-app-2299e.appspot.com",
  messagingSenderId: "817534074974",
  appId: "1:817534074974:web:d58cada9815a2b7484b4cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
