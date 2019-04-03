<template>
  <div id="app">
    <loading></loading>
    <router-view/>
  </div>
</template>
<script>

import loading from '@/components/loading'
export default {
  name: 'pointShop',
  components:{
    loading
  },
  computed: {
  },
  mounted() {
    // this.$store.dispatch("hideloader");
  }
}
</script>