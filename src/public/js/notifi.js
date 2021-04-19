function notifyMe() {
  var isPushEnabled = false;
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    var notification = new Notification('Hi there!');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        var notification = new Notification('Hi there!');
      }
    });
  }
}