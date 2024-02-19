// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDHGlJaU8ogTpw15cZmEEwvKuzsnXrNicw",
  authDomain: "cerebrum-0.firebaseapp.com",
  databaseURL: "https://cerebrum-0.firebaseio.com/",
  projectId: "cerebrum-0",
  storageBucket: "cerebrum-0.appspot.com",
  messagingSenderId: "883336553629",
  appId: "1:883336553629:web:9b29185f3ac8325c67a074",
  measurementId: "G-YQWP4FD87J"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload
  // );
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/icons/cerebrum/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
