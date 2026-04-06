import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";

// Aapka Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA-0HnHv6SF49HCrfFuURn8t442s_p59Ls",
  authDomain: "talha-admin-panel.firebaseapp.com",
  projectId: "talha-admin-panel",
  storageBucket: "talha-admin-panel.firebasestorage.app",
  messagingSenderId: "275384033991",
  appId: "1:275384033991:web:c10b0605d1755d6f9d14e2",
  measurementId: "G-PETP7JJGTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default async function handler(req, res) {
  // CORS Headers taaki aapka script access kar sake
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // URL se ID nikalna (e.g., ?id=12345)
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("No ID provided");
  }

  try {
    // Firebase se data fetch karna
    // Maan lijiye aapne Firebase mein 'users/ID' ke andar data rakha hai
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `users/${id}`));

    if (snapshot.exists()) {
      const userData = snapshot.val();
      
      // Agar aap wahan se script bhejna chahte hain
      // To userData.script mein wo code hona chahiye
      res.status(200).send(userData.script || "console.log('No script found for this ID');");
    } else {
      res.status(404).send("console.error('ID not registered in Firebase');");
    }
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).send("console.error('Internal Server Error');");
  }
}