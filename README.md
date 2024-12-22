# Smart Reloader

Smart Reloader is a browser extension that allows you to automatically reload tabs based on user-defined settings.

## Features

- Reload tabs based on a specified domain (using regex patterns).
- Set the reload interval in seconds.
- Insert the current URL of the active tab into the domain input box.
- View, edit, and delete existing reload settings.
- Countdown timer showing the time left until the next reload.

## Installation

1. Download the extension package (`firefox-tab-reloader.zip`).
2. Go to `about:addons` in Firefox.
3. Click on the gear icon and select "Install Add-on From File...".
4. Select the downloaded `firefox-tab-reloader.zip` file to install the extension.

## Usage

1. Click on the Firefox Tab Reloader icon in the toolbar to open the extension popup.
2. Enter the domain (using regex patterns) in the "Domain (Regex)" input box.
   - Example: To match any URL containing `vnexpress`, use `.*vnexpress.*`.
   - Example: To match any subdomain of `vnexpress.net`, use `.*vnexpress.net.*`.
3. Enter the reload interval in seconds in the "Interval (seconds)" input box.
4. (Optional) Click the "Insert Current URL" button to insert the URL of the active tab into the domain input box.
5. Click the "Start Reloading" button to start reloading tabs based on the specified settings.
6. The current settings will be displayed below, showing the domain, interval, and a countdown timer for the next reload.
7. You can edit or delete existing settings using the "Edit" and "Delete" buttons next to each setting.

## Examples

- To reload any page on `vnexpress.net` every 10 seconds:
  - Domain (Regex): `.*vnexpress.net.*`
  - Interval (seconds): `10`
- To reload any page containing `example` in the URL every 30 seconds:
  - Domain (Regex): `.*example.*`
  - Interval (seconds): `30`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.