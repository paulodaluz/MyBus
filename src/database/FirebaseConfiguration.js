import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBOc87t9COzefoFfF56o1zI-l8fN4BZxUU",
    authDomain: "my-bus-ba542.firebaseapp.com",
    databaseURL: "https://my-bus-ba542-default-rtdb.firebaseio.com",
    projectId: "my-bus-ba542",
    storageBucket: "my-bus-ba542.appspot.com",
    messagingSenderId: "991552478352",
    appId: "1:991552478352:web:f472e5962e1613fa9e4c15"
};

const firebaseApp =
    firebase.app.length > 0
        ? firebase.initializeApp(firebaseConfig)
        : firebase.app();

const db = firebaseApp.firestore();
//export default db;
export { db, firebase };
