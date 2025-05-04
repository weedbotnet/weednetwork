(function() {
  'use strict';
  
  let devToolsDetected = false;
  const BAN_MESSAGE = "LOL";
  
  // F12 Key Detection
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) {
      handleViolation();
    }
  });
  
  // Right-Click Detection
  document.addEventListener('contextmenu', function(e) {
    handleViolation();
    e.preventDefault();
    return false;
  });

  // Nuclear Option - Make page unusable and attempt to close
  function handleViolation() {
    if (devToolsDetected) return;
    devToolsDetected = true;
    
    // 1. Immediately blank the page
    document.body.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        color: red;
        font-family: Arial;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        z-index: 99999;
      ">
        ${BAN_MESSAGE}
      </div>
    `;
    
    // 2. Attempt to close the tab
    setTimeout(() => {
      window.location.href = 'about:blank';
      window.close();
      
      // 3. Fallback: Infinite loop to crash if still open
      if (!window.closed) {
        while(true) { 
          console.clear(); 
        }
      }
    }, 500);
  }
})();