let reloadInterval;

function startReloading() {
  browser.storage.local.get('settings', (data) => {
    const settings = data.settings || [];
    if (reloadInterval) {
      clearInterval(reloadInterval);
    }
    if (settings.length > 0) {
      reloadInterval = setInterval(() => {
        browser.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => {
            settings.forEach((setting) => {
              if (new RegExp(setting.domain).test(tab.url)) {
                browser.tabs.reload(tab.id);
              }
            });
          });
        });
      }, Math.min(...settings.map(setting => setting.interval)));
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