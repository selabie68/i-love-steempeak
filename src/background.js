global.browser = require('webextension-polyfill');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.sync.get(['aggressive'], function(result) {
    const parser = document.createElement('a');
    parser.href = tab.url;
    if (parser.host === 'steemit.com' || parser.host === 'busy.org') {
      if (result.aggressive) {
        chrome.tabs.update(tab.id, { url: 'https://steempeak.com' + parser.pathname + parser.search });
      } else {
        if (changeInfo.status === 'complete') {
          chrome.tabs.executeScript(tab.id, {
            file: 'modal/modal.js',
          });

          chrome.tabs.insertCSS(tab.id, {
            file: 'modal/modal.css',
          });
        }
      }
    }
  });
});
