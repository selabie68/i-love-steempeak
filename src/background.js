global.browser = require('webextension-polyfill');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const parser = document.createElement('a');
  parser.href = tab.url;
  if (parser.host === 'steemit.com' || parser.host === 'busy.org') {
    chrome.tabs.update(tab.id, { url: 'https://steempeak.com' + parser.pathname + parser.search });
  }
});
