<template>
  <div id="app">
    <loading v-if="showLoading"></loading>
    <router-view/>
  </div>
</template>
<script>

import loading from '@/components/loading'
import store from '@/store'
export default {
  name: 'pointShop',
  data () {
    return {
    }
  },
  components:{
    loading
  },
  computed:{
    showLoading(){
      return store.state.showLoading
    }
  },
  mounted() {
  }
}
</script>