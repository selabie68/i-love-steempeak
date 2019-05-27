<!--
 Copyright (C) 2018  Michael Smith <selabie68@gmail.com>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <div>
    <p>I Love SteemPeak</p>
    <SwitchButton v-model="aggressive" color="#F5BF21">Aggressive Mode</SwitchButton>
    <button class="save-button" v-on:click="save" :disabled="saveDisabled">{{ saveText }}</button>
  </div>
</template>

<script>
import SwitchButton from '../../components/SwitchButton.vue';

export default {
  data() {
    return {
      aggressive: true,
      saveText: 'Save...',
      saveDisabled: false,
    };
  },
  components: {
    SwitchButton,
  },
  methods: {
    save: function(e) {
      this.saveDisabled = true;
      this.saveText = 'Saving...';
      let _this = this;
      chrome.storage.sync.set({ aggressive: this.aggressive }, function() {
        _this.saveText = 'Saved...';
        setTimeout(function() {
          _this.saveText = 'Save...';
          _this.saveDisabled = false;
          chrome.runtime.reload();
        }, 2000);
      });
      e.preventDefault();
    },
  },
  beforeCreate: function() {
    let _this = this;
    chrome.storage.sync.get(['aggressive'], function(result) {
      _this.aggressive = result.aggressive;
    });
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}

.save-button {
  background-color: #44c767;
  -moz-border-radius: 28px;
  -webkit-border-radius: 28px;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 17px;
  padding: 10px 15px;
  text-decoration: none;
  text-shadow: 0 1px 0 #2f6627;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #5cbf2a;
  }

  &:active {
    position: relative;
    top: 1px;
  }

  &:disabled {
    background-color: #cccccc;
  }
}
</style>
