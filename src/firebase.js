import { initializeApp } from 'firebase/app';
// import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
// import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAdcj8hi83dZeKsRvaX0lez0E8NvTO9zNA',
	authDomain: 'fastbuy-ea09e.firebaseapp.com',
	projectId: 'fastbuy-ea09e',
	storageBucket: 'fastbuy-ea09e.appspot.com',
	messagingSenderId: '302926938274',
	appId: '1:302926938274:web:213f4054218675ed89d7fb',
	measurementId: 'G-BC2H25CD4X',
};

function startFirebase() {
	initializeApp(firebaseConfig);
	// const functions = getFunctions(app);
	// const db = getFirestore();
	// connectFunctionsEmulator(functions, 'localhost', 5001);
	// connectFirestoreEmulator(db, 'localhost', 8080);
}

export default startFirebase;
