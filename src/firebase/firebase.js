import firebase from 'firebase/app';

import 'firebase/database';

import { firebaseCredentions } from './credentions';

export const firebaseApp = firebase.initializeApp(firebaseCredentions);
export const firebaseDb = firebase.database();
