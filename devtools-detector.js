(function() {
  function detectDevTools(callback) {
    var isDevToolsOpen = false;
    var threshold = 200; // Increased threshold
    var interval = 300;   // Slightly longer interval

    function check() {
      var widthRatio = window.outerWidth / window.innerWidth;
      var heightRatio = window.outerHeight / window.innerHeight;
      var isLargeChange = Math.abs(widthRatio - 1) > 0.3 || Math.abs(heightRatio - 1) > 0.3;

      if (isLargeChange || (window.outerHeight - window.innerHeight) > threshold || (window.outerWidth - window.innerWidth) > threshold) {
        if (!isDevToolsOpen) {
          isDevToolsOpen = true;
          callback(true);
        }
      } else {
        if (isDevToolsOpen) {
          isDevToolsOpen = false;
          callback(false);
        }
      }
    }

    setInterval(check, interval);
  }

  var devToolsDetected = false; // Flag to prevent repeated closing

  detectDevTools(function(isOpen) {
    if (isOpen && !devToolsDetected) {
      devToolsDetected = true;
      window.close();
    }
  });

  // Consider removing or making these conditional based on detection
  document.addEventListener('contextmenu', function(e) {
    if (devToolsDetected) { // Only prevent if devtools were detected
      e.preventDefault();
    }
  });

  document.addEventListener('keydown', function(e) {
    var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    var blockedKeys = [123, (e.ctrlKey && e.shiftKey && 73), (e.metaKey && e.shiftKey && 73), (e.ctrlKey && 85), (e.metaKey && 85), (e.ctrlKey && 83), (e.metaKey && 83), (e.shiftKey && 121), (isMac ? (e.metaKey && e.altKey && 74) : (e.ctrlKey && e.shiftKey && 74))];
    if (blockedKeys.some(key => {
      if (typeof key === 'number') return e.keyCode === key;
      return key && e.keyCode === key[2]; // For combined keys
    }) && devToolsDetected) {
      e.preventDefault();
      return false;
    }
  });
})();
