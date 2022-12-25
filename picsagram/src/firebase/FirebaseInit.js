import fb from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';


const firebaseApp = fb.initializeApp({
  apiKey: "AIzaSyBuDXoPgpP63PbbjAk34vtPQ4VH84nyUM0",
  authDomain: "ak-react-production.firebaseapp.com",
  databaseURL: "https://ak-react-production-default-rtdb.firebaseio.com",
  projectId: "ak-react-production",
  storageBucket: "ak-react-production.appspot.com",
  messagingSenderId: "950525205991",
  appId: "1:950525205991:web:81b9a67041aa866e86b142"
});

const db = firebaseApp.firestore();
const auth = fb.auth();
const storage = fb.storage();

export {db, auth, storage, fb};