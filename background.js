let reloadInterval;

function startReloading() {
  browser.storage.local.get('settings', (data) => {
    const settings = data.settings || [];
    if (reloadInterval) {
      clearInterval(reloadInterval);
    }
    if (settings.length > 0) {
      reloadInterval = setInterval(() => {
        const now = Date.now();
        settings.forEach((setting, index) => {
          if (now >= setting.nextReload) {
            browser.tabs.query({}, (tabs) => {
              tabs.forEach((tab) => {
                if (new RegExp(setting.domain).test(tab.url)) {
                  browser.tabs.reload(tab.id);
                }
              });
            });
            setting.nextReload = now + setting.interval;
          }
        });
        browser.storage.local.set({ settings });
      }, 1000);
    }
  });
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'start') {
    startReloading();
  }
});

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.settings) {
    startReloading();
  }
});