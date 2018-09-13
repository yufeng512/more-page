<template>
  <div @click="go">goods</div>
</template>
<script>
export default {
  methods: {
    go () {
      this.$router.push('goodsDetail')
    }
  }
}
</script>

