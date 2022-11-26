importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging-compat.js');
const firebaseConfig = {
    apiKey: "AIzaSyBBt3RnqGIIE6mWs7gntpYFludfwPEtSlo",
    authDomain: "heineken-spms.firebaseapp.com",
    projectId: "heineken-spms",
    storageBucket: "heineken-spms.appspot.com",
    messagingSenderId: "559270768447",
    appId: "1:559270768447:web:c672cd7f61f2000941ed8a",
    measurementId: "G-Q11R1ZQKJC"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.png'
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});