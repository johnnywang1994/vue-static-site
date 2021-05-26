function fetchSettings() {
  return new Promise((resolve) => {
    const script = document.createElement('script');

    script.onload = function onSettingsLoad() {
      const settings = window.__md_settings__;
      if (settings.cache && 'serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/service-worker.js');
        });
      }
      resolve(window.__md_settings__);
    };

    script.src = '/settings.js';
    document.head.appendChild(script);
  });
}

export default fetchSettings;
