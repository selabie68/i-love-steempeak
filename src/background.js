/*
 * Copyright (C) 2018  Michael Smith <selabie68@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

global.browser = require('webextension-polyfill');

chrome.storage.sync.get(['aggressive'], function(result) {
  if (result.aggressive) {
    chrome.webRequest.onBeforeRequest.addListener(
      function(info) {
        const parser = document.createElement('a');
        parser.href = info.url;
        if (parser.host === 'steemit.com' || parser.host === 'busy.org') {
          return { redirectUrl: 'https://steempeak.com' + parser.pathname + parser.search };
        }
      },
      {
        urls: ['*://steemit.com/*', '*://busy.org/*'],
      },
      ['blocking']
    );
  } else {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      const parser = document.createElement('a');
      parser.href = tab.url;
      if (parser.host === 'steemit.com' || parser.host === 'busy.org') {
        if (changeInfo.status === 'complete') {
          chrome.tabs.executeScript(tab.id, {
            file: 'modal/modal.js',
          });

          chrome.tabs.insertCSS(tab.id, {
            file: 'modal/modal.css',
          });
        }
      }
    });
  }
});
