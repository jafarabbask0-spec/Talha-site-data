import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-0HnHv6SF49HCrfFuURn8t442s_p59Ls",
  authDomain: "talha-admin-panel.firebaseapp.com",
  projectId: "talha-admin-panel",
  storageBucket: "talha-admin-panel.firebasestorage.app",
  messagingSenderId: "275384033991",
  appId: "1:275384033991:web:c10b0605d1755d6f9d14e2",
  measurementId: "G-PETP7JJGTV"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { id } = req.query;
  if (!id) return res.status(400).send("console.error('ID missing');");

  try {
    const dbRef = ref(db);
    // Yeh "users/ID" wale path se data uthayega
    const snapshot = await get(child(dbRef, `users/${id}`));

    if (snapshot.exists()) {
      const userData = snapshot.val();
      // Database mein "script" naam ka column hona chahiye jisme aapka code ho
      res.status(200).send(userData.script || "console.log('Script empty in DB');");
    } else {
      res.status(404).send("console.error('User not found in Firebase');");
    }
  } catch (error) {
    res.status(500).send("console.error('Server Error');");
  }
}