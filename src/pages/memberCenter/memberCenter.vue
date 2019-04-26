<template>
  <div id="app">
    <router-view/>
    <loading v-show="$store.getters.showLoading"></loading>
  </div>
</template>
<script>

import loading from '@/common/loading'
import { mapState } from 'vuex'

export default {
  name: 'memberCenter',
  components: { loading }
}
</script>
<style>
#app,
body,
html{
  height: 100%;
}
</style>
