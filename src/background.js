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

chrome.storage.sync.get(['sites'], function (result) {
  if (result.sites) {
    // The sites set as aggressive
    const aggressiveSites = result.sites
      .filter(function (s) {
        return s.value === 'aggressive';
      })
      .flatMap(function (r) {
        return r.urls;
      });

    // The sites set as Passive
    const passiveSites = result.sites
      .filter(function (s) {
        return s.value === 'passive';
      })
      .flatMap(function (r) {
        return r.urls;
      });

    // Check if we have any aggressive sites (this prevents matching all urls)
    if (aggressiveSites.length > 0) {
      // Add listener to aggressive sites
      chrome.webRequest.onBeforeRequest.addListener(
        function (info) {
          const parser = document.createElement('a');
          parser.href = info.url;

          return { redirectUrl: 'https://steempeak.com' + parser.pathname + parser.search };
        },
        {
          urls: aggressiveSites,
        },
        ['blocking']
      );
    }

    // Add listener for passive sites
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      // Our URL Parser
      const parser = document.createElement('a');
      parser.href = tab.url;

      // Does the current URL match any passive sites?
      const matchedUrls = passiveSites.filter(function (site) {
        return matchUrl(tab.url, site);
      });

      // Wait for site to finish loading
      if (changeInfo.status === 'complete' && matchedUrls.length > 0) {
        chrome.tabs.executeScript(tab.id, {
          file: 'modal/modal.js',
        });

        chrome.tabs.insertCSS(tab.id, {
          file: 'modal/modal.css',
        });
      }
    });
  }

  /**
   * Matches a url with a wildcard rule as per Chrome
   * URL permissions standard e.g. *://steemit.com/*
   *
   * @param str - Url to check
   * @param rule - Wildcard rule
   * @returns {boolean}
   */
  function matchUrl(str, rule) {
    const escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
    return new RegExp('^' + rule.split('*').map(escapeRegex).join('.*') + '$').test(str);
  }
});
