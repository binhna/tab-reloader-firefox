document.addEventListener('DOMContentLoaded', () => {
  loadSettings();

  document.getElementById('start').addEventListener('click', () => {
    const domain = document.getElementById('domain').value;
    const interval = parseInt(document.getElementById('interval').value, 10) * 1000;

    if (domain && interval) {
      browser.storage.local.get('settings', (data) => {
        const settings = data.settings || [];
        settings.push({ domain, interval, nextReload: Date.now() + interval });
        browser.storage.local.set({ settings }, loadSettings);
        browser.runtime.sendMessage({ action: 'start' });
      });
    }
  });

  document.getElementById('insert-url').addEventListener('click', () => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        document.getElementById('domain').value = tabs[0].url;
      }
    });
  });

  setInterval(updateCountdowns, 1000);
});

function loadSettings() {
  browser.storage.local.get('settings', (data) => {
    const settings = data.settings || [];
    const settingsDiv = document.getElementById('settings');
    settingsDiv.innerHTML = '';

    settings.forEach((setting, index) => {
      const settingDiv = document.createElement('div');
      settingDiv.className = 'setting';
      settingDiv.innerHTML = `
        <div class="setting-info">
          <span class="domain" title="${setting.domain}">${truncate(setting.domain, 30)}</span>
          <span class="interval">${setting.interval / 1000} seconds</span>
          <span class="countdown" data-index="${index}"></span>
        </div>
        <div class="setting-actions">
          <button class="edit" data-index="${index}">Edit</button>
          <button class="delete" data-index="${index}">Delete</button>
        </div>
      `;
      settingsDiv.appendChild(settingDiv);
    });

    document.querySelectorAll('.edit').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        const setting = settings[index];
        document.getElementById('domain').value = setting.domain;
        document.getElementById('interval').value = setting.interval / 1000;
        settings.splice(index, 1);
        browser.storage.local.set({ settings }, loadSettings);
      });
    });

    document.querySelectorAll('.delete').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        settings.splice(index, 1);
        browser.storage.local.set({ settings }, loadSettings);
      });
    });
  });
}

function updateCountdowns() {
  browser.storage.local.get('settings', (data) => {
    const settings = data.settings || [];
    const now = Date.now();

    settings.forEach((setting, index) => {
      const countdownElement = document.querySelector(`.countdown[data-index="${index}"]`);
      if (countdownElement) {
        const timeLeft = Math.max(0, Math.floor((setting.nextReload - now) / 1000));
        countdownElement.textContent = `Next reload in: ${timeLeft} seconds`;
      }
    });
  });
}

function truncate(str, n) {
  return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}