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