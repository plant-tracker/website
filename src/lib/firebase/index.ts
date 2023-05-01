import User from './User.svelte';
import Collection from './Collection.svelte';
import Doc from './Doc.svelte';
import FirebaseApp from './FirebaseApp.svelte';
import { docStore, userStore, collectionStore } from './stores';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

export { Doc, User, Collection, FirebaseApp, docStore, collectionStore, userStore };
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
