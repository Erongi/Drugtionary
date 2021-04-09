<template>
  <div>
    <h1>Login</h1>

  </div>
</template>

<script>
export default {
    created(){
        this.id = this.$route.params.id
    },
    data() {
      return {
          id:null,
      }
    }
  }
</script>

<style scoped>
</style>