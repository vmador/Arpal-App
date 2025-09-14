// OneSignalSDKWorker.js - Versión con manejo de errores

try {
  importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDKWorker.js');
} catch (error) {
  console.error('Error loading OneSignal Worker script:', error);
  
  // Fallback: Implementación básica de Service Worker para notificaciones
  self.addEventListener('push', function(event) {
    console.log('Push event received:', event);
    
    if (event.data) {
      const options = {
        body: event.data.text(),
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        vibrate: [200, 100, 200],
        actions: [
          {
            action: 'open',
            title: 'Abrir Arpal'
          }
        ]
      };
      
      event.waitUntil(
        self.registration.showNotification('Arpal Sounds', options)
      );
    }
  });
  
  self.addEventListener('notificationclick', function(event) {
    console.log('Notification clicked:', event);
    event.notification.close();
    
    event.waitUntil(
      clients.openWindow('https://arpaldsn.com/')
    );
  });
}
