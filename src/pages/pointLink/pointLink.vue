<template>
  <div id="app">
    <loading v-show="$store.getters.showLoading"></loading>
    <router-view/>
  </div>
</template>
<script>

import loading from '@/common/loading'
export default {
  name: 'pointLink',
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