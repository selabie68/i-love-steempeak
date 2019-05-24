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

(function() {
  const modalMarkup = `
    <div id="ils-modal" class="ils-modal">
      <span id="ils-modal-close" class="close"
            onclick="(function() {document.getElementById('ils-modal').style.display ='none'})();">&times;</span>
      <h3>Not SteemPeak!</h3>
      <p>Do you want to go to SteemPeak now?</p>
      <button class="ils-button"
            onclick="(function() {window.location.href='https://steempeak.com'+window.location.pathname+window.location.search})();">Go to SteemPeak.</button> 
    </div>`;

  let div = document.createElement('div');
  div.innerHTML = modalMarkup;
  document.body.appendChild(div);
})();
