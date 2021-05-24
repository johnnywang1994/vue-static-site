function fetchSettings() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.onload = function onSettingsLoad() {
      resolve(window.__md_settings__);
    };
    script.src = '/settings.js';
    document.head.appendChild(script);
  });
}

export default fetchSettings;
