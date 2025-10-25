/* public/firebase-messaging-sw.js */

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({

  apiKey: "AIzaSyBo5aIrMN58vYV9Q79uySr8lPSTRO1bjcM",

  authDomain: "focus-buddy-61b2b.firebaseapp.com",

  projectId: "focus-buddy-61b2b",

  storageBucket: "focus-buddy-61b2b.firebasestorage.app",

  messagingSenderId: "306856680889",

  appId: "1:306856680889:web:101a510353af94c283ea68"
  
});

const messaging = firebase.messaging();

// 🔥 Background notifications handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  const notificationTitle = payload.notification?.title || 'Check-in Reminder';
  const notificationOptions = {
    body: payload.notification?.body || 'Stay focused! 💪',
    icon: '/accountability-app/icons/icon-192x192.png',
    badge: '/accountability-app/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
