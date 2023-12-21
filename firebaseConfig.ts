import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCAzKTjdrwb1wcXvuobeFfKe2BkcnCp6K4",
    authDomain: "pilvi-vite-b3a3b.firebaseapp.com",
    projectId: "pilvi-vite-b3a3b",
    storageBucket: "pilvi-vite-b3a3b.appspot.com",
    messagingSenderId: "1489562939",
    appId: "1:1489562939:web:dd16e2e7a3485d2f49db1e"
  };

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  
  export { firestore };
  export { firebaseConfig };