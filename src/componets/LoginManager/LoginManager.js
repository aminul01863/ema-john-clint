import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Login/firebase.config";

export const initializeLoginFremwork = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
}
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const { displayName, photoURL, email } = res.user;
      const singedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      userToken();

      return singedInUser;
      // console.log(displayName, email, photoURL, )
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message)
    })
}
//google sign out
const userToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    sessionStorage.setItem('token', idToken)
  }).catch(function (error) {
    // Handle error
  });
}

export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        success: false,
        error: ''
      }
      return signedOutUser;
    })
    .catch((err) => {
    })
}

// facebook login
export const handleFbSingUp = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(fbProvider)
    .then(res => {
      //  @type {firebase.auth.OAuthCredential}
      var credential = res.credential.accessToken;
      var user = res.user;
      user.success = true;
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });

}


export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}
const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name,
  }).then(res => {
    // Update successful.\
    console.log('Updated successfully')
  }).catch(error => {
    // An error happened.
    console.log(error)
  });
}