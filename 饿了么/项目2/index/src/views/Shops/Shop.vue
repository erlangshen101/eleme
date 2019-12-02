<template>
  <div class="shop">

  </div>
</template>

<script>
export default {
  data () {
    return {
      shopInfo: null
    }
  },
  created () {
    this.getData ()
  },
  methods: {
    getData () {
      this.$axios("/api/profile/batch_shop").then (res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style>

</style>