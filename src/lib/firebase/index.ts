import User from './components/User.svelte';
import Collection from './components/Collection.svelte';
import Doc from './components/Doc.svelte';
import FirebaseApp from './components/FirebaseApp.svelte';
import { docStore, userStore, collectionStore } from './stores';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';
import { getStorage } from 'firebase/storage';


export { Doc, User, Collection, FirebaseApp, docStore, collectionStore, userStore };
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
