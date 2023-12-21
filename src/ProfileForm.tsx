import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

function ProfileForm() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
    
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(""); // Muutettu "password" -> "date"
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lisää Firestore-tietokantaan uusi dokumentti
    try {
      const docRef = await addDoc(collection(db, "kokoelma"), {
        description: description,
        date: date, // Muutettu "password" -> "date"
      });
      console.log("Dokumentti lisätty ID:llä: ", docRef.id);
    } catch (error) {
      console.error("Virhe dokumentin lisäämisessä: ", error);
    }
  }

  return (
    <div>
      <h2>Tietojen muokkaus</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="description">Kuvaus:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label> {/* Muutettu "Salasana" -> "Date" */}
          <input
            type="text"
            id="date" // Muutettu "password" -> "date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Päivitä</button>
      </form>
    </div>
  );
}

export default ProfileForm;
