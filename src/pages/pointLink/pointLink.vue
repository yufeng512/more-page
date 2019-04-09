<template>
  <div id="app">
    <loading v-show="$store.getters.showLoading"></loading>
    <router-view/>
  </div>
</template>
<script>

import loading from '@/components/loading'
export default {
  name: 'pointShop',
  data () {
    return {}
  },
  components: {
    loading
  },
  mounted() {
  }
}
</script>