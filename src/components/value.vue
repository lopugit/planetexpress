<template lang='pug'>
  .value(
    ) {{ valueMutable }}
</template>

<script>
// import value from 'src/components/value'
import smarts from 'smarts'
export default {
  mixins: [smarts({
    vue: {
      reactiveSetter: true,
      vm: 'this'
    }
  })],
  data () {
    return {
      valueMutable: this.value
    }
  },
  sockets: {
    connect: function(){
      // console.error("socket connect vue side")
    }
  },
  created(){
  },
  mounted() {
  },
  methods: {
  },
  watch: {
  },
  props: {
    value: {}
  },
  computed: {
  },
  components: {
    // 'show inventory' : inventory
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
</style>
