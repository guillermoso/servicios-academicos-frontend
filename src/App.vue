<template>
  <div id="app">
    <vue-extend-layouts />
    <alert-message ref="alertMessage"/>
  </div>
</template>

<script>
import VueExtendLayouts from 'vue-extend-layout'
import alertMessage from '@/components/global/alerta';
import Vue from 'vue';

export default {
  name: 'App',
  components: { VueExtendLayouts, alertMessage },
   mounted() {
    Vue.prototype.$message = this.$refs.alertMessage.show;
  }
}
</script>
