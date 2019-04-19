<template>
  <div id="app">
    <router-view/>
<<<<<<< HEAD
=======
    <loading v-show="$store.getters.showLoading"></loading>
>>>>>>> dev
  </div>
</template>
<script>

<<<<<<< HEAD
export default {
  name: 'memberCenter'
}
</script>
=======
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
>>>>>>> dev
