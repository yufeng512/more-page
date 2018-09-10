<template>
  <div @click="go">index</div>
</template>
<script>
export default {
  methods: {
    go () {
      this.$router.push('cellDetail')
    }
  }
}
</script>

