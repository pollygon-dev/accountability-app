/* public/firebase-messaging-sw.js */

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBo5aIrMN58vYV9Q79uySr8lPSTRO1bjcM",
  authDomain: "focus-buddy-61b2b.firebaseapp.com",
  projectId: "focus-buddy-61b2b",
  storageBucket: "focus-buddy-61b2b.appspot.com", // ✅ corrected domain
  messagingSenderId: "306856680889",
  appId: "1:306856680889:web:101a510353af94c283ea68",
});

const messaging = firebase.messaging();

// ✅ Background notification handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  const notificationTitle = payload.notification?.title || 'Check-in Reminder';
  const notificationOptions = {
    body: payload.notification?.body || 'Stay focused! 💪',
    icon: '/accountability-app/icons/icon-192x192.png',
    badge: '/accountability-app/icons/icon-192x192.png',
    data: {
      url: '/accountability-app/', // ✅ opens your app when tapped
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Handle click so notification actually opens your app
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Focus if already open
      for (const client of clientList) {
        if (client.url.includes('/accountability-app/') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow('/accountability-app/');
      }
    })
  );
});
