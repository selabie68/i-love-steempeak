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
    <button class="options-button" v-on:click="openOptions">{{ optionsText }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsText: 'Open Options',
    };
  },
  methods: {
    openOptions: function(e) {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}

.options-button {
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
