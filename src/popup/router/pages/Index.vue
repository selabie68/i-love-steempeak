<template>
  <div>
    <p>I Love SteemPeak</p>
    <SwitchButton v-model="aggressive" color="#F5BF21">Aggressive Mode</SwitchButton>
  </div>
</template>

<script>
import SwitchButton from '../../components/SwitchButton.vue';

export default {
  data() {
    return {
      aggressive: true,
    };
  },
  components: {
    SwitchButton,
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
