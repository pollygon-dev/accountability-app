// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Replace with your Firebase config (same as src/firebase.js)
firebase.initializeApp({
  apiKey: "AIzaSyBo5aIrMN58vYV9Q79uySr8lPSTRO1bjcM",

  authDomain: "focus-buddy-61b2b.firebaseapp.com",

  projectId: "focus-buddy-61b2b",

  storageBucket: "focus-buddy-61b2b.firebasestorage.app",

  messagingSenderId: "306856680889",

  appId: "1:306856680889:web:101a510353af94c283ea68"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('📩 Received background message: ', payload);

  const title = payload.notification?.title || 'Check-in Time!';
  const options = {
    body: payload.notification?.body || 'How’s your focus going?',
    icon: '/icons/icon-192x192.png',
    // optionally: data: payload.data
  };

  self.registration.showNotification(title, options);
});
