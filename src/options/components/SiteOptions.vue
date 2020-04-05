<template>
  <div class="container">
    <div class="row middle-xs mb-0">
      <div class="col-xs">
        <h1>Steem Site Options</h1>
      </div>
      <div class="col-xs switch-field">
        <input type="radio" id="all-passive" name="all-sites" value="passive" v-on:change="optionChange" :checked="allPassive" />
        <label class="passive" for="all-passive">Passive</label>
        <input type="radio" id="all-disabled" name="all-sites" value="disabled" v-on:change="optionChange" :checked="allDisabled" />
        <label class="disabled" for="all-disabled">Disabled</label>
        <input type="radio" id="all-aggressive" name="all-sites" value="aggressive" v-on:change="optionChange" :checked="allAggressive" />
        <label class="aggressive" for="all-aggressive">Aggressive</label>
      </div>
    </div>
    <hr />
    <div class="row middle-xs" v-for="(site, index) in sites" :key="index">
      <div class="col-xs switch-label">{{ site.name }}</div>
      <div class="col-xs switch-field">
        <input type="radio" v-model="site.value" :id="site.name + '-passive'" :name="site.name" value="passive" />
        <label class="passive" :for="site.name + '-passive'">Passive</label>
        <input type="radio" v-model="site.value" :id="site.name + '-disabled'" :name="site.name" value="disabled" />
        <label class="disabled" :for="site.name + '-disabled'">Disabled</label>
        <input type="radio" v-model="site.value" :id="site.name + '-aggressive'" :name="site.name" value="aggressive" />
        <label class="aggressive" :for="site.name + '-aggressive'">Aggressive</label>
      </div>
    </div>
    <div class="row">
      <div class="col-xs">
        <button class="save-button" v-on:click="saveOptions" :disabled="saveDisabled">{{ saveText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteOptions',
  data: () => ({
    sites: [
      {
        name: 'Steemit.com',
        value: 'disabled',
        urls: ['*://steemit.com/*', '*://www.steemit.com/*'],
      },
      {
        name: 'Busy.org',
        value: 'disabled',
        urls: ['*://busy.org/*', '*://www.busy.org/*'],
      },
      {
        name: 'Steeve.app',
        value: 'disabled',
        urls: ['*://steeve.app/*', '*://www.steeve.app/*'],
      },
      {
        name: 'Partiko.app',
        value: 'disabled',
        urls: ['*://partiko.app/*', '*://www.partiko.app/*'],
      },
      {
        name: 'Palnet.io',
        value: 'disabled',
        urls: ['*://palnet.io/*', '*://www.palnet.io/*'],
      },
      {
        name: 'Splintertalk.io',
        value: 'disabled',
        urls: ['*://splintertalk.io/*', '*://www.splintertalk.io/*'],
      },
      {
        name: 'Weedcash.network',
        value: 'disabled',
        urls: ['*://weedcash.network/*', '*://www.weedcash.network/*'],
      },
    ],
    saveText: 'Save...',
    saveDisabled: false,
    allAggressive: false,
    allPassive: false,
    allDisabled: false,
  }),
  methods: {
    saveOptions: function (e) {
      e.preventDefault();
      this.saveDisabled = true;
      this.saveText = 'Saving...';
      let _this = this;
      // Saves site options into chrome sync storage
      chrome.storage.sync.set({ sites: this.sites }, function () {
        _this.saveText = 'Saved...';

        chrome.runtime.reload(); // Reload extension to apply changes

        setTimeout(function () {
          _this.saveText = 'Save...';
          _this.saveDisabled = false;
        }, 2000);
      });
    },
    optionChange: function (e) {
      this.sites.forEach(function (site) {
        site.value = e.target.value;
      });
    },
  },
  beforeCreate() {
    const _this = this;
    // Get existing settings
    chrome.storage.sync.get(['sites'], function (result) {
      if (result.sites) {
        _this.sites = result.sites;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2em;
}

.row {
  margin-bottom: 20px;
}

.switch-label {
  font-size: 1.5em;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.switch-field {
  display: flex;
  overflow: hidden;

  input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;
  }

  label {
    background-color: #e4e4e4;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    line-height: 1;
    text-align: center;
    padding: 8px 16px;
    margin-right: -1px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
    transition: all 0.1s ease-in-out;
    height: 16px;

    &:hover {
      cursor: pointer;
    }
  }

  input:checked + label {
    &.aggressive {
      background-color: #a5dc86;
      box-shadow: none;
    }

    &.passive {
      background-color: #fff3cd;
      box-shadow: none;
    }

    &.disabled {
      background-color: #f5c6cb;
      box-shadow: none;
    }
  }

  label {
    &:first-of-type {
      border-radius: 4px 0 0 4px;
    }

    &:last-of-type {
      border-radius: 0 4px 4px 0;
    }
  }
}

.save-button {
  background-color: #44c767;
  background-image: none;
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
    background-image: none;
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
