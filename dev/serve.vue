<script>
import Vue from 'vue';
import OnlinePreview from '@/online-preview.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    OnlinePreview
  }
});
</script>

<template>
  <div id="app">
    <online-preview />
  </div>
</template>
