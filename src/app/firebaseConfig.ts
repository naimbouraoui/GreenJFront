// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { DataSnapshot } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
/*   apiKey: "AIzaSyC7-dZXQ7gDfcSegKtQB4q3-neBupFRVSI",
  authDomain: "greenjourney-ac5c3.firebaseapp.com",
  projectId: "greenjourney-ac5c3",
  storageBucket: "greenjourney-ac5c3.appspot.com",
  messagingSenderId: "155460735775",
  appId: "1:155460735775:web:f9088dffe02e8310aa162a" */

  apiKey: "AIzaSyAQvnx4sGISn-xqIxwDG8tFmtdQq86t6oI",
  authDomain: "greenj-4d68b.firebaseapp.com",
  projectId: "greenj-4d68b",
  storageBucket: "greenj-4d68b.appspot.com",
  messagingSenderId: "602167998432",
  appId: "1:602167998432:web:b561661166a5188f991d85"
};
export const snapshotToArray = (snapshot:DataSnapshot) => {
  const returnArray:any = [];
  snapshot.forEach((element:any) => {
    const item = element.val();
    item.key = element.key;
    returnArray.push(item);
  });
  return returnArray;
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);