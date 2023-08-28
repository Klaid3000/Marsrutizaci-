import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBpMuKbhihi9nU9nWIsMvNhJb7bfQP5Cp4',
	authDomain: 'todoproject-704d5.firebaseapp.com',
	projectId: 'todoproject-704d5',
	storageBucket: 'todoproject-704d5.appspot.com',
	messagingSenderId: '472305897959',
	appId: '1:472305897959:web:e54c7aff06e7cbb8b6ed42',
	databaseURL:
		'https://todoproject-704d5-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
