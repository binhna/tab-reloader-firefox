document.addEventListener('DOMContentLoaded', () => {
  loadSettings();

  document.getElementById('start').addEventListener('click', () => {
    const domain = document.getElementById('domain').value;
    const interval = parseInt(document.getElementById('interval').value, 10) * 1000;

    if (domain && interval) {
      browser.storage.local.get('settings', (data) => {
        const settings = data.settings || [];
        settings.push({ domain, interval });
        browser.storage.local.set({ settings }, loadSettings);
        browser.runtime.sendMessage({ action: 'start' });
      });
    }
  });
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
        <span>Domain: ${setting.domain}</span>
        <span>Interval: ${setting.interval / 1000} seconds</span>
        <button class="edit" data-index="${index}">Edit</button>
        <button class="delete" data-index="${index}">Delete</button>
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