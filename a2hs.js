// lottery/a2hs.js
(function(){
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/lottery/sw.js').catch(console.error);
  }

  // Create a lightweight install button
  let deferredPrompt = null;
  const btn = document.createElement('button');
  btn.id = 'installPWA';
  btn.textContent = 'Install app';
  btn.style.cssText = [
    'position:fixed','right:16px','bottom:16px','z-index:9999',
    'padding:10px 14px','border-radius:12px','border:1px solid rgba(255,255,255,.2)',
    'background:linear-gradient(180deg,#1a2742,#111a30)','color:#e7eefb','font:600 14px system-ui, -apple-system, Segoe UI, Roboto, Arial',
    'box-shadow:0 6px 18px rgba(0,0,0,.35)','cursor:pointer','display:none'
  ].join(';');

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar on mobile
    e.preventDefault();
    deferredPrompt = e;
    btn.style.display = 'inline-block';
  });

  btn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    btn.disabled = true;
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      // Hide after user acts
      deferredPrompt = null;
      btn.style.display = 'none';
      // Optional: analytics on outcome
      console.log('A2HS outcome:', outcome);
    } catch (err) {
      console.error(err);
      btn.disabled = false;
    }
  });

  // Add to DOM
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(btn);
  });
})();
