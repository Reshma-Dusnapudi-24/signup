const firebaseConfig = {
apiKey: "AIzaSyBWrxav01I6_ch0rao8OVi-M5NfMpQHL7Y",
  authDomain: "vamsi-s.firebaseapp.com",
  projectId: "vamsi-s",
  storageBucket: "vamsi-s.firebasestorage.app",
  messagingSenderId: "122259311230",
  appId: "1:122259311230:web:29d5e20e4e6f7f40c7a62f",
  measurementId: "G-JBL5PZBFFD"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); 