<template>
  <div>
    <SiteOptions />
  </div>
</template>

<script>
import SiteOptions from './components/SiteOptions';
import 'flexboxgrid/css/flexboxgrid.css';

export default {
  name: 'App',
  components: { SiteOptions },
};
</script>

<style>
html {
  min-width: 600px;
}
</style>
