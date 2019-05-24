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
  <div class="switch-button-control">
    <div class="switch-button" :class="{ enabled: isEnabled }" @click="toggle" :style="{ '--color': color }">
      <div class="button"></div>
    </div>
    <div class="switch-button-label">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Switch',
  model: {
    prop: 'isEnabled',
    event: 'toggle',
  },
  props: {
    isEnabled: Boolean,
    color: {
      type: String,
      required: false,
      default: '#4D4D4D',
    },
  },
  methods: {
    toggle: function() {
      this.$emit('toggle', !this.isEnabled);
    },
  },
};
</script>

<style lang="scss" scoped>
.switch-button-control {
  display: flex;
  flex-direction: row;
  align-items: center;

  .switch-button {
    $switch-button-height: 1.6em;
    $switch-button-color: var(--color);
    $switch-button-border-thickness: 2px;
    $switch-transition: all 0.3s ease-in-out;
    $switch-is-rounded: true;

    height: $switch-button-height;
    width: calc(#{$switch-button-height} * 2);
    border: $switch-button-border-thickness solid $switch-button-color;
    box-shadow: inset 0px 0px $switch-button-border-thickness 0px rgba(0, 0, 0, 0.33);
    border-radius: if($switch-is-rounded, $switch-button-height, 0);

    transition: $switch-transition;

    $button-side-length: calc(#{$switch-button-height} - (2 * #{$switch-button-border-thickness}));

    cursor: pointer;

    .button {
      height: $button-side-length;
      width: $button-side-length;
      border: $switch-button-border-thickness solid $switch-button-color;
      border-radius: if($switch-is-rounded, $button-side-length, 0);
      background: $switch-button-color;

      transition: $switch-transition;
    }

    &.enabled {
      background-color: $switch-button-color;
      box-shadow: none;

      .button {
        background: white;
        transform: translateX(calc(#{$button-side-length} + (2 * #{$switch-button-border-thickness})));
      }
    }
  }

  .switch-button-label {
    margin-left: 10px;
  }
}
</style>
