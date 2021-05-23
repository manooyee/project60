import firebase from 'firebase'

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCY-Ds8VJ4_nBOEaKtUWiQBYiVHFOjaNJs",
    authDomain: "attendence-app-9734f.firebaseapp.com",
    databaseURL: "https://attendence-app-9734f-default-rtdb.firebaseio.com",
    projectId: "attendence-app-9734f",
    storageBucket: "attendence-app-9734f.appspot.com",
    messagingSenderId: "487594314661",
    appId: "1:487594314661:web:32105d00924be40b33764c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.database()
